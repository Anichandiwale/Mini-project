const express = require("express")
const router = express.Router()
const url = require("../controller/urlController")
const mid = require("../middleware/cacheMid")



router.post("/url/shorten", mid.getShortUrl, url.createShortUrl)

router.get("/:urlCode", mid.getLongUrl, url.getUrl)

// router.all("/**", function(req,res){
//     res.status(400).send("Invlaid endPoint")
// })

module.exports = router