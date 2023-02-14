const express = require("express");
const router = express.Router();
require("../DB/conn");
const authenticate = require("../Middleware/Authenticate");

router.get("/home", authenticate, async (req, res) => {
  return res.json(req.rootUser);
});

module.exports = router;
