const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); // gemini-pro-vision gemini-1.5-pro-latest
const express = require("express");
const axios = require("axios");
const app = express();
const multer = require("multer");
let jsonData = "";
let location = "";
let businesses = [];

app.use(cors()); // This will allow all domains

// Configure storage for multer
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
      "return in JSON without markdown syntax, the food_name, and cuisine type, based on the image provided";

    // Read the image file and convert it to Base64
    const imageBuffer = fs.readFileSync(filePath);
    const imageData = imageBuffer.toString("base64");

    // Construct the image object
    const image = {
      inlineData: {
        data: imageData,
        mimeType: "image/jpeg",
      },
    };

    // Generate content with the prompt and image
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = await response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();
    jsonData = JSON.parse(cleanText);
    console.log(jsonData);
    console.log(jsonData.cuisine_type.toLowerCase().replace(" ", "%20")); // if category === 2 letter words, might pass back boof responses

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Replace 'YOUR_ACCESS_TOKEN' with your actual Yelp API token
        "Content-Type": "application/json",
      },
    };
    const resp = await axios.get(
      `https://api.yelp.com/v3/businesses/search?location=westminsterCA&categories=${jsonData.cuisine_type
        .toLowerCase()
        .replace(" ", "%20")}&sort_by=review_count`,
      config
    );

    businesses = resp.data.businesses.map((business) => {
      return {
        id: business.id,
        name: business.name,
        location: business.location.address1,
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

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log("Uploaded file:", req.file.path);
  const filePath = req.file.path;
  jsonData = await run(filePath);
  console.log(businesses, "91");
  // res.json(businesses)
});

app.get("/fetch", async (req, res) => {
  res.json(businesses);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
