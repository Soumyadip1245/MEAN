const router = require('express').Router()
const User = require('../models/user')
var ObjectId = require('mongoose').Types.ObjectId;
router.post('/addUser',(req,res)=>{
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(()=>{
        res.json({success: true, message: "Data Added"})
    }).catch(()=>{
        res.json({success: false, message: "All Fields Are Required And To Be Unique"})
    })
})
router.get('/getAll',(req,res)=>{
    User.find().then((value)=>{
        res.json({success: true, message: "User Finded",data: value})
    }).catch(()=>{
        res.json({success: false, message: "User Cannot Be Fetched"})
    })
})
router.put('/editUser/:id', (req,res)=>{
    var ser = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    User.findByIdAndUpdate(req.params.id, {$set: ser}).then(()=>{
        res.json({success: true, message: "Data Edited"})
    }).catch(()=>{
        res.json({success: false, message: "Data Cannot Be Edited"})
    })
})
router.delete('/deleteUser/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id).then(()=>{
        res.json({success: true, message: "User Deleted"})
    }).catch(()=>{
        res.json({success: false, message: "User Cannot Be Deleted"})
    })
})
router.get('/getDataById/:id',(req,res)=>{
    User.findById(req.params.id).then((value)=>{
        res.json({success: true, message: "User Found", data: value})
    }).catch(()=>{
        res.json({success: false, message: "User Cannot Be Found"})
    })
})
router.post('/findByEmail',(req,res)=>{
    var ob = {
        "email": req.body.email
    }
    User.find(ob).then((value)=>{
        var datavalue = value
        if(datavalue < 1){
            res.json({success: false, message: "User Not Found For Email"})
        }
        else{
            res.json({success: true, message: "User Found For Email", data: datavalue})
        }
    })
})
router.post('/multipleCondition',(req,res)=>{
    var ob = {
        "email": req.body.email
    }
    var ob11 = {
        "name": req.body.name
    }
    User.find({
        $or: [
            ob, ob11
        ]
    }).then((value)=>{
        if(value.length < 1){
            res.json({success: false, message: "Data Not Got For Conditions"})
        }
        else{
            res.json({success: true, message: "Data Got For Conditions", data: value})
        }
    })
})
module.exports = router