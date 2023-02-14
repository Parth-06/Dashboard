const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fastCsv = require("fast-csv");
const bodyParser = require("body-parser");
const app = express();
const uploadcsv = require("../Model/uploadShema");
const Authenticate = require("../Middleware/Authenticate");
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + ".csv");
  },
});

var upload = multer({ storage: storage });

router.post(
  "/upload",
  Authenticate,
  upload.single("streamfile"),
  async (req, res) => {
    return new Promise((resolve, reject) => {
      let csvData = [];
      let invalidEntries = [];

      const stream = fs.createReadStream(req.file.path);

      fastCsv
        .parseStream(stream, { headers: true, delimiter: "," })

        .on("data", async (data) => {
          if (
            !data.FirstName ||
            !data.LastName ||
            !data.Email ||
            !data.Age ||
            !data.Gender
          ) {
            invalidEntries.push(data);
            return;
          }

          if (!/^\d+$/.test(data.Age)) {
            invalidEntries.push(data);
            return;
          }

          if (
            !["male", "female", "FEMALE", "MALE", "Female", "Male"].includes(
              data.Gender
            )
          ) {
            invalidEntries.push(data);
            return;
          }
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.Email)) {
            invalidEntries.push(data);
            return;
          }

          csvData.push(data);
        })
        .on("end", async () => {
          let tempcsv = csvData;
          for (let i = 0; i < csvData.length; i++) {
            const emailExists = await uploadcsv.findOne({
              Email: csvData[i].Email,
            });
            if (emailExists) {
              invalidEntries.push(csvData[i]);
              tempcsv = tempcsv.filter((val) => {
                return val.Email !== csvData[i].Email;
              });
            }
          }
          const finalcsv = tempcsv.map((val) => {
            const newVal = { ...val, Owner: req.rootUser.email };
            return newVal;
          });
          const users = await uploadcsv.insertMany(finalcsv);
          res.send({
            message: "Failed Entries",
            data: invalidEntries,
          });
          resolve({ csvData, invalidEntries });
        });
    });
  }
);

module.exports = router;
