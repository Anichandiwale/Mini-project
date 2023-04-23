
const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')


const createIntern = async function (req, res) {

    try {
        res.header('Access-Control-Allow-Origin', '*')
        let data = req.body

        let { name, email, mobile, collegeName } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter Details" })
        }

        if (!(name)) {
            return res.status(400).send({ status: false, msg: "please enter Name" })
        }

        if (!(/^[a-zA-z]+([\s][a-zA-Z]+)+$/).test(name)) { return res.status(400).send({ status: false, msg: "Please enter valid name" }) }


        //------------------------------------email validation----------------------------------------------//

        if (!email) {
            return res.status(400).send({ status: false, msg: "Email should be mandatory" })
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "please provide valid email" })
        }

        let emailVerify = await internModel.findOne({ email: email })

        if (emailVerify) {
            return res.status(400).send({ status: false, msg: "this email already exists please provide another email" })
        }

        //----------------------------------------------- mobile validation------------------------------------//

        let regMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        if (!regMobile.test(mobile)) {

            return res.status(400).send({ message: "Please enter valid Mobile Number" })
        }

        let mobData = await internModel.findOne({ mobile: mobile })

        //Duplicate mobile

        if (mobData) return res.status(400).send({ status: false, msg: 'Duplicate mobile' })

        const collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!collegeData) {
            return res.status(400).send({ status: false, msg: " College Name not exist" })
        }

        let collegeId = collegeData._id

        let dataOfIntern = { name, email, mobile, collegeId }


        let savedData = await internModel.create(dataOfIntern)

        let dataInt = {

            isDeleted: savedData.isDeleted == false,
            name: savedData.name,
            email: savedData.email,
            mobile: savedData.mobile,
            collegeId: savedData.collegeId
        }
        return res.status(201).send({
            status: true,
            data: dataInt
        })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------------------GETCOLLEGEDETAILS-------------------------------------------------------//

let getCollegeDetails = async function (req, res) {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        let collegeName = req.query.collegeName

        if (!collegeName) { return res.status(400).send({ status: false, msg: " plz provide CollegeName " }) }


        let getCollegeName = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!getCollegeName) { return res.status(404).send({ status: false, msg: "CollegeName does not exist" }) }

        let data = { name: getCollegeName.name, fullName: getCollegeName.fullName, logoLink: getCollegeName.logoLink }

        let intern = await internModel.find({ collegeId: getCollegeName._id, isDeleted: false }).select('_id name email mobile')

        if (!intern) { return res.status(404).send({ status: false, msg: "No Intern Available in this College" }) }
        else {
            data.intern = intern
            return res.status(200).send({ status: true, data: data })
        }
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}



module.exports = { createIntern, getCollegeDetails }