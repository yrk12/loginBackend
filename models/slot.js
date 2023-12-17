const mongoose = require('mongoose')

const Schema = mongoose.Schema

const slot = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    time:{
        type:String,
        required:true,
    },
    monthYear:{
        type:String,
        required:true,
    }
})

const Slot = mongoose.model('Slot', slot)

module.exports = Slot;