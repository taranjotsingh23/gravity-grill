const router = require("express").Router();
const Reservation = require("../model/Reservation");
const Menu = require("../model/Menu");

router.post("/reservation", async (req, res) => {
        let userId=req.body.userId;
        let userName=req.body.userName;
        let userEmail=req.body.userEmail;
        let numberOfPeople=req.body.numberOfPeople;
        let date=req.body.date;
        let contactNumber=req.body.contactNumber;
        let specialRequest=req.body.specialRequest;

    //Create a new user
    const user = new Reservation({
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        numberOfPeople: numberOfPeople,
        date: date,
        contactNumber: contactNumber,
        specialRequest: specialRequest
    });
    var savedUser = await user.save();

    var menu = await Menu.find();
    res.status(200).send({ resCode: 200, menu: menu });
});

module.exports = router;