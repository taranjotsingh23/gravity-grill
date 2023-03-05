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

    const accountSid = "ACa0ea0a4af30028a39bfad4a9c79682cd";
    const authToken = "cb9542b6111ec7d5ba45db3ba57b0e79";
    
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({ body: "Thank you for choosing Gravity Grill. Your Order has been confirmed. Hope you have an amazing experience with us.", from: "+15075225207", to: "+919667938525" })
      .then((res)=>(console.log('message has send')))
      .catch((err)=>{console.log(err);
    });

    res.status(200).send({ resCode: 200, details: k });
});

module.exports = router;