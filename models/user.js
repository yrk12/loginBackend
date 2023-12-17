const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    }
})

const User = mongoose.model('User', user)

module.exports = User;