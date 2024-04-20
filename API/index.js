const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

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
    // Log the response
    // console.log(result.response.text());
    const jsonData = JSON.parse(cleanText)
    console.log(jsonData.food_name)
    console.log(jsonData.cuisine_type)
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

run();
