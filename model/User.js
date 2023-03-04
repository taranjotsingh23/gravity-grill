const { number } = require('@hapi/joi');
const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    userId: {
        type: String,
        default: "Null"
    },
    userName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    userEmail: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    userMobileNumber: {
        type: String,
        required: true,
        max: 10,
        min: 10
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    authToken: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('User',userSchema);