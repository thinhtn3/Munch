const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const express = require("express");
const axios = require("axios");
const app = express();
let jsonData = "";
let location = "";

const run = async () => {
  try {
    const prompt =
      "return in JSON without markdown syntax, the food_name, and cuisine type, based on the image provided";

    // Read the image file and convert it to Base64
    const imageBuffer = fs.readFileSync("food.jpg");
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
    return jsonData;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

app.get("/findRestaurant", async (req, res) => {
  jsonData = await run();
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Replace 'YOUR_ACCESS_TOKEN' with your actual Yelp API token
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=westminsterCA&categories=${jsonData.cuisine_type.toLowerCase()}&sort_by=review_count`,
    config
  );
  const businesses = response.data.businesses.map((business) => {
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
  res.json(businesses);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
