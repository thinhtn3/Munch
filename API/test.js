const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); // gemini-pro-vision gemini-1.5-pro-latest or gemini-1.5-flash-latest free or gemini-pro-vision deprecated soon
const express = require("express");
const axios = require("axios");
const multer = require("multer");

let jsonData;
let location;
let businesses = [];

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

const run = async (filePath) => {
  try {
    const prompt =
      "return in JSON without markdown syntax, is_food, the food_name, and cuisine_type, based on the image provided"; // prompt to be sent to Gemini API

    // Read the image file and convert it to Base64
    const imageBuffer = fs.readFileSync(filePath);
    const imageData = imageBuffer.toString("base64");

    // Declaring an 'image' object
    const image = {
      inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
      },
    };

    // Generate content with the prompt and image
    const result = await model.generateContent([prompt, image]);
    const response = result.response;
    const text = response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();
    jsonGoogle = JSON.parse(cleanText);
    console.log(jsonGoogle);

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const resp = await axios.get(
      `https://api.yelp.com/v3/businesses/search?location=${location
        .toLowerCase()
        .replace(" ", "%20")}&term=${jsonGoogle.food_name
        .toLowerCase()
        .replace(" ", "%20")}%20${jsonGoogle.cuisine_type
        .toLowerCase()
        .replace(" ", "%20")}&sort_by=review_count`,
      config
    );
    console.log(resp.data.businesses[0])

    // Maps through response from Yelp and returns an array of objects with information we need
    businesses = resp.data.businesses.map((business) => {
      return {
        food_name: jsonGoogle.food_name,
        id: business.id,
        name: business.name,
        address1: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zip_code: business.location.zip_code,
        country: business.location.country,
        reviews: business.review_count,
        rating: business.rating,
        url: business.url,
        is_closed: business.is_closed,
        image_url: business.image_url,
        phone_number: business.display_phone,
      };
    });
    return businesses;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("This shit dont work");
  } else {
    console.log("post request made");
    const filePath = req.file.path;
    location = req.body.text;
    postResult = await run(filePath);
    if (postResult) {
      res.status(200).end(); //make sure to include .json(), .send(), or .end() to complete the response process. .status alone does not actually send response to client
                            //sends status 200 to let clientside know they can redirect to /results
    } else {
      res.status(404).send("THIS SHIT IS NOT FOOD");
    }
  } 
});

app.get("/fetch", async (req, res) => {
  res.json(businesses); //
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`App listening on ${process.env.PORT} test.js`);
});
