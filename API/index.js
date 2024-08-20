const cors = require("cors");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { processImage } = require("./gemini");
const { getYelpData } = require("./yelp");
const app = express();
app.use(express.json());
app.use(cors()); // This will allow all domains
let yelpResult;

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
    geminiData = await processImage(filePath);
    location = req.body.text;

    if (geminiData.is_food === false) { // checks to see if item is food
      res.status(400).send("Please enter a valid food!");
    } else {
      if (location) { // check if the location input is filled
        try {
          yelpResult = await getYelpData(geminiData, location);
          yelpResult && res.status(200).end();  // check if there is yelpResults
          
          //make sure to include .json(), .send(), or .end() to complete the response process. .status alone does not actually send response to client
            //sends status 200 to let clientside know they can redirect to /results
        } catch (e) {
          res.status(e.response.status).send("Something wrong while fetching Yelp, please ensure that you entered a valid location.");
        }
      } else {
        res.status(400).send("Location input can not be empty!");
      }
    }
  }
});

app.get("/fetch", async (req, res) => {
  res.json(yelpResult); //
});

app.get("/test", (req,res) => {
  res.send("yes")
})

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`App listening on ${process.env.PORT} index.js`);
});
