const { number } = require('@hapi/joi');
const mongoose=require('mongoose');

const feedbackSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    subject: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('Feedback',feedbackSchema);