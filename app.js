var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.port||8080
const path = require('path')
const Mean = require('./routes/usercontroller')
var mongoose = require('mongoose')
var cors = require('cors')

mongoose.connect('mongodb+srv://Soumyadip:20csu214@cluster0.jm2zckm.mongodb.net/MEAN?retryWrites=true&w=majority',(err)=>{
    if(err){
        console.log("Error In Database Connection")
    }
    else{
        console.log("Database Connected")
    }
})
app.use(cors())
app.use(bodyParser.json())
app.use('/mean',Mean)
app.listen(port,()=>{
    console.warn(`Server Running At Port: `+port)
})
