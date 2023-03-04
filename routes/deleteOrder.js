const router = require("express").Router();
const Reservation = require("../model/Reservation");

router.post("/deleteOrder", async (req, res) => {
    let orderId=req.body.orderId;

    let userOrderFinding= await Reservation.deleteOne({ _id: orderId });
 
    res.status(200).send({ resCode: 200, message: "Order Deleted Successfully!!" });
});

module.exports = router;