const { number } = require('@hapi/joi');
const mongoose=require('mongoose');

const menuSchema= new mongoose.Schema({
    dishId: {
        type: String,
        default: "Null"
    },
    dishName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    dishDesc: {
        type: String,
        required: true
    },
    dishPrice: {
        type: Number,
        required: true
    },
    dishImgLink: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model('Menu',menuSchema);