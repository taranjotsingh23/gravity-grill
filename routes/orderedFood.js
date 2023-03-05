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

    const accountSid = "AC6ce261e0d623713a24ef3d2bc802f9cd";
    const authToken = "6bda8535d7d02ab5f1d580d33443fe92";
    
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({ body: "Thank you for choosing Gravity Grill. Your Order has been confirmed. Hope you have an amazing experience with us.", from: "+15677042215", to: "+919667938525" })
      .then((res)=>(console.log('message has send')))
      .catch((err)=>{console.log(err);
    });

    res.status(200).send({ resCode: 200, details: k });
});

module.exports = router;