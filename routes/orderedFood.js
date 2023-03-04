const router = require("express").Router();
const Reservation = require("../model/Reservation");

router.post("/orderedFood", async (req, res) => {
    let userId=req.body.userId;
    let order=req.body.order;

    var objectFinding = await Reservation.findOne({ userId: userId });

    await Reservation.updateOne(
        { userId: userId },
        { $set: { order: order } }
    );

    res.status(200).send({ resCode: 200, message: "Order Added Successfully!!" });
});

module.exports = router;