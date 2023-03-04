const router = require("express").Router();
const Reservation = require("../model/Reservation");
const Menu = require("../model/Menu");

router.post("/orderedFood", async (req, res) => {
    let userId=req.body.userId;
    let order=req.body.order;

    var objectFinding = await Reservation.findOne({ userId: userId });

    await Reservation.updateOne(
        { userId: userId },
        { $set: { order: order } }
    );

    var reservationObjectFinding = await Reservation.findOne({ userId: userId });

    let arr=[];
    let totalAmount=0;

    for(let i=0;i<order.length;i++)
    {
        var dishObjectFinding = await Menu.findOne({ dishId: order[i] });
        arr.push(dishObjectFinding);
        totalAmount=totalAmount+dishObjectFinding.dishPrice;
    }

    let x={
        ...reservationObjectFinding
    };
    let k=x._doc;

    delete k._id; 
    delete k.__v;
    k.dishInfo=arr;
    k.totalAmount=totalAmount;
    // console.log(k)

    res.status(200).send({ resCode: 200, details: k });
});

module.exports = router;