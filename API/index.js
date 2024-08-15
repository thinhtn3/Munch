const cors = require("cors");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { processImage } = require("./gemini")
const { getYelpData } = require("./yelp")
const app = express();
app.use(express.json());
app.use(cors()); // This will allow all domains

//Configure storage for multer (got from multer documentation )
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure the directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save with the original file name
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("There is no file");
  } else {
    console.log("post request made");
    const filePath = req.file.path;
    geminiData = await processImage(filePath)
    location = req.body.text;
    yelpResult = await getYelpData(geminiData, location);
    if (yelpResult) {
      res.status(200).end(); //make sure to include .json(), .send(), or .end() to complete the response process. .status alone does not actually send response to client
                            //sends status 200 to let clientside know they can redirect to /results
    } else {
      res.status(404).send("THIS SHIT IS NOT FOOD");
    }
  } 
});

app.get("/fetch", async (req, res) => {
  res.json(yelpResult); //
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`App listening on ${process.env.PORT} index.js`);
});
