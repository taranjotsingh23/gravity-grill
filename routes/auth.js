const router = require("express").Router();
const User = require("../model/User");
const verify= require('./verifyToken');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const {readFileSync, promises: fsPromises} = require('fs');

// const cors = require("cors");
// router.use(cors({
//   'Access-Control-Allow-Origin':'*'
// }));

const {
  registerValidation,
  loginValidation
} = require("../validation");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

var otp = 0;
var expAt = "";

var SibApiV3Sdk = require("sib-api-v3-sdk");
const { db } = require("../model/User");
const { Collection } = require("mongoose");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.API_KEY;

function random() {
  otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}


//--------------------------------Signup--------------------------------------------------------------------------------
router.post("/signup", async (req, res) => {
  var isEmailinDb=false;
  
  //Lets validate the data before we make a user
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: error.details[0].message,
        name: "",
        email: ""
      });

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ userEmail: req.body.email });
    if(emailExist) {
      return res
        .status(400)
        .send({
          resCode: 400,
          message: "Email already exists",
          name: "",
          email: ""
        });
    }
  
    if(emailExist) {
      isEmailinDb=true;
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    //Create a new user
    const user = new User({
      userId: "Null",
      userName: req.body.name,
      userEmail: req.body.email,
      userMobileNumber: req.body.mobileNumber,
      password: hashedPassword,
      authToken: "No Token",
    });
  
    if(isEmailinDb==false) {
      var savedUser = await user.save();
      var dbObject = await User.findOne({ userEmail: req.body.email });
      var newuserId=dbObject._id.toString();
      var userId=newuserId.substring(0,24);
      var dbResponse=await db.collection("users").updateOne(
        { userEmail: req.body.email },
        { $set: { userId: userId } }
      );
    }

    var collection = db.collection("users");
    var email = req.body.email;
    //Create and assign a token
    const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    collection.updateOne({ userEmail: email }, { $set: { authToken: token } });
    var dbObject = await User.findOne({ userEmail: email });
    var newuserId=dbObject._id.toString();
    var userId=newuserId.substring(0,24);
    res
      .status(200)
      .send({
        resCode: 200,
        message: "User Successfully Registered",
        authToken: token,
        userId: userId
      });


      const accountSid = "AC817165cdb6b0e8b42ac59fd059d4574f";
      const authToken = "1e6dd8c3013685f68545021df958b0d5";
      
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .create({ body: "Greetings from Gravity Grill, you have been successfully registered on our website. We are eager to serve you.", from: "+15074185878", to: "+919667938525" })
        .then((res)=>(console.log('message has send')))
        .catch((err)=>{console.log(err);
      });
});


//Login
router.post("/login", async (req, res) => {
  //Lets validate the data before we make a user
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: error.details[0].message,
        name: "",
        email: "",
        authToken: "",
        userId: ""
      });

      //Checking if the email exists
      const user = await User.findOne({ userEmail: req.body.email });
      if (!user)
      {
          return res
          .status(400)
          .send({
            resCode: 400,
            message: "Email not found",
            name: "",
            email: "",
            authToken: "",
            userId: ""
          });
      }

      //Password is correct
      var validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass)
        return res
          .status(400)
          .send({
            resCode: 400,
            message: "Invalid Password",
            name: "",
            email: "",
            authToken: "",
            userId: ""
          });

        var dbObject = await User.findOne({ userEmail: req.body.email });
        var newuserId=dbObject._id.toString();
        var userId=newuserId.substring(0,24);

        User.find({ userEmail: req.body.email }, function (err, val) {
          const token = val[0].authToken;
          return res
            .status(200)
            .send({
              resCode: 200,
              message: "Logged in!",
              name: user.userName,
              email: user.userEmail,
              authToken: token,
              userId: userId
            });
        });
});



module.exports = router;
