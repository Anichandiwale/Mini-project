const express = require('express');
const route = require('./routes/route.js');
const mongoose  = require('mongoose');
const multer = require('multer')
const app = express();

app.use(express.json());

app.use(multer().any())



mongoose.connect("mongodb+srv://Amaryadav7878:XW9jCVVJDRcwcBR4@cluster0.wpi75.mongodb.net/group45Database-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))

    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});