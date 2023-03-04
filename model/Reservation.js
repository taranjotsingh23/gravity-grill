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
    order: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

module.exports=mongoose.model('Reservation',reservationSchema);