const router = require("express").Router();
const Reservation = require("../model/Reservation");

router.post("/userOrders", async (req, res) => {
    let userId=req.body.userId;

    let userOrdersFinding= await Reservation.find({ userId: userId });
 
    res.status(200).send({ resCode: 200, userReservations: userOrdersFinding });
});

module.exports = router;