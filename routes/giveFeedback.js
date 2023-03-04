const router = require("express").Router();
const Feedback = require("../model/Feedback");

router.post("/giveFeedback", async (req, res) => {
    let name=req.body.name;
    let email=req.body.email;
    let subject=req.body.subject;
    let feedback=req.body.feedback;
    let stars=req.body.stars;

    //Create a new user
    const user = new Feedback({
        name: name,
        email: email,
        subject: subject,
        feedback: feedback,
        stars: stars
    });
    var savedUser = await user.save();

    res.status(200).send({ resCode: 200, message: "Feedback Sent Successfully!" });
});

module.exports = router;