const cors = require("cors");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { processImage } = require("./gemini");
const { yelpByPhoto } = require("./yelpByPhoto");
const { yelpByQuery } = require("./yelpByQuery");
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
  const filePath = file.path;
  geminiData = await processImage(filePath);
  if (geminiData.is_food === false && geminiData.is_drink === false) {
    // checks to see if item is food
    res.status(400).send("Please enter a valid food!");
  } else {
    console.log(geminiData);
    return geminiData;
  }
};
const yelpSearch = async (res, func) => {
  console.log("post request made");

  // check if the location input is filled
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
  //  else {
  //   res.status(400).send("Location input can not be empty!");
  // }
};

app.post("/api/upload", upload.any(), async (req, res) => {
  let validated = false;
  location = req.body.location;

  if (!req.files && !req.body.search_q) {
    res.status(400).send("No input received");
  } else if (req.files[0]) {
    validated = await photoValidation(req.files[0], res);
    if (validated) {
      yelpSearch(res, yelpByPhoto(validated, location));
    }
  } else if (req.body.search_q) {
    yelpSearch(res, yelpByQuery(req.body.search_q, location))
  }
});

app.get("/fetch", async (req, res) => {
  res.json(yelpResult); //
});

app.get("/test", (req, res) => {
  res.send("yes");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
});
