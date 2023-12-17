const express = require('express')
const User = require('../models/user')
const Slot = require('../models/slot')
const bodyParser = require('body-parser');
const BASE_URL = process.env.BASE_URL
const router = express.Router()

router.post('/register', (req, res)=>{
    const {username, name, age, password} = req.body
    User.findOne({username: username})
    .then(user => {
        if(user){
            res.send({success: false, message: "Username Already exists"})
        }
        else{
            const user = new User({
                username,
                name,
                password,
                age,
            })
            user.save()
            .then(r => {
                if(r){
                    res.send({success: true, message: "Succesfully Registerd"});
                }
                else{
                    res.send({success: false,  message: "Error connecting db"});
                }
            })
        }
    })
});

router.post('/', (req, res)=>{
    const {username, password} = req.body
    User.findOne({username: username})
    .then(user => {
        if(user){
            if(user.password!=password){
                res.send({success: false, message: "Invalid Password"})
            }
            else{
                res.send({success: true, message: "successfull", user: user})
            }
        }
        else{
            res.send({success: false, message: "Username does not exist"})
        }
    })
});

router.post('/enroll', (req, res)=>{
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    
    const monthYearString = `${month.toString().padStart(2, '0')}/${year}`;
    Slot.findOne({username: req.body.username, monthYear: monthYearString})
    .then(slot => {
        if(slot){
            res.send({success: false, message: "Already registered for the month", slot: slot})
        }
        else{
            const slot = new Slot({
                username: req.body.username,
                monthYear: monthYearString,
                time: req.body.time
            })
            slot.save()
            .then(r => {
                if(r){
                    res.send({success: true, message: "Succesfully Enrolled"});
                }
                else{
                    res.send({success: false,  message: "Error connecting db"});
                }
            })
        }
    })
});

module.exports = router