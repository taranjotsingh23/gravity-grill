const { number } = require('@hapi/joi');
const mongoose=require('mongoose');

const reservationSchema= new mongoose.Schema({
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
    numberOfPeople: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        max: 10,
        min: 10
    },
    specialRequest: {
        type: String,
        default: "Null"
    },
    order: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

module.exports=mongoose.model('Reservation',reservationSchema);