const express = require("express");
const router = express.Router();
require("../DB/conn");
const authenticate = require("../Middleware/Authenticate");
const uploadcsv = require("../Model/uploadShema");

router.get("/fetchuserdata", authenticate, async (req, res) => {
  const listOne = await uploadcsv.find({ Owner: req.rootUser.email });
  if (listOne) {
    try {
      return res.json(listOne);
      //   res.status(210).json({ message: "Registration Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("notfound");
  }
});

module.exports = router;
