const cors = require("cors");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { processImage } = require("./gemini");
const { yelpByPhoto, yelpByQuery } = require("./yelp");
const app = express();
app.use(express.json());
app.use(cors()); // This will allow all domains
let yelpResult;
let location;

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

const photoValidation = async (file, res) => {
  /*
  Error handling to validate if photo uploaded to gemini is a drink or food
  */

  const filePath = file.path;
  geminiData = await processImage(filePath);
  if (geminiData.is_food === false && geminiData.is_drink === false) {
    res.status(400).send("Please enter a valid food!");
  } else {
    return geminiData;
  }
};

const yelpSearch = async (res, func) => {
  /*
  Takes response and a function as parameter
  Depending on the type of request received (req.files or req.body.search_q), execute that function imported from yelp.js
  If error, send a response. Most of the time the error is due to user not entering a valid location
  */

  console.log("Post Request Made");
  try {
    yelpResult = await func;
    yelpResult && res.status(200).end(); // check if there is yelpResults
  } catch (e) {
    res
      .status(e.response.status)
      .send(
        "Something wrong while fetching Yelp, please ensure that you entered a valid location."
      );
  }
};

const checkFiles = async (validated, location, req, res) => {
  /**
   Checks type of files and run the appropriate functions depending on the file
   */

  if (!req.files && !req.body.search_q) {
    res.status(400).send("No input received");
  } else if (req.files[0]) {
    validated = await photoValidation(req.files[0], res);
    if (validated) {
      yelpSearch(res, yelpByPhoto(validated, location));
    }
  } else if (req.body.search_q) {
    yelpSearch(res, yelpByQuery(req.body.search_q, location));
  }
};

app.post("/api/upload", upload.any(), async (req, res) => {
  let validated = false;
  location = req.body.location;
  checkFiles(validated, location, req, res);
});

app.get("/fetch", async (req, res) => {
  res.json(yelpResult); //
});

/*
Starting server
*/
app.listen(process.env.PORT, () => {
  console.log("server started on 8080");
});
