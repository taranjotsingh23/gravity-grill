const router = require("express").Router();
const Menu = require("../model/Menu");

const multer = require("multer");
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const credentials =require("../key.json");

admin.initializeApp({
  credential:admin.credential.cert(credentials)
});


const db=admin.firestore();

const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyBcqhJyM6ofxQtW3NBU1fVuGtSGaOtioLQ",
    authDomain: "hackhound-8643c.firebaseapp.com",
    projectId: "hackhound-8643c",
    storageBucket: "hackhound-8643c.appspot.com",
    messagingSenderId: "371247253637",
    appId: "1:371247253637:web:57d03057523525eb2181ec"
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/storeMenu", upload.single("filename"), async (req, res) => {
    var dishName=req.body.dishName;
    var dishDesc=req.body.dishDesc;
    var dishPrice=req.body.dishPrice;

    const storageRef = ref(storage, `files/${req.file.originalname}`);

    //Create a new user
    const user = new Menu({
        dishId: "Null",
        dishName: dishName,
        dishDesc: dishDesc,
        dishPrice: dishPrice,
        dishImgLink: "Null"
    });

    var storingURL;
    
    const snap=await uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
        console.log("file uploaded");
        getDownloadURL(ref(storage, `files/${req.file.originalname}`)).then((url)=> {
          console.log("URL: "+url);
        
          try{
            const userJson={
                dishName: dishName,
                dishImgLink: url
            };
            const response=db.collection("users").doc(dishName).set(userJson);
            console.log(userJson);
        } catch(error) {
            console.log(error);
        }

        storingURL=url;
          console.log(user);
        });
    });

  var savedUser = await user.save();
    var dbObject = await Menu.findOne({ dishName: dishName });
      var newuserId=dbObject._id.toString();
      var dishId=newuserId.substring(0,24);
      var dbResponse=await Menu.updateOne(
        { dishName: dishName },
        { $set: { dishId: dishId } }
      );

      await Menu.updateOne(
        { dishName: dishName },
        { $set: { dishImgLink: storingURL } }
      );

    console.log(req.file);
    res.status(200).send({ resCode: 200, message: "File Uploaded Successfully" });
});


router.get("/menu", async (req, res) => {
    var menu = await Menu.find();
    console.log(menu);
    res.status(200).send({ resCode: 200, menu: menu });
});

module.exports = router;