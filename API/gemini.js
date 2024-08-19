const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const processImage = async (filePath) => {
  try {
    const prompt =
      "return in JSON without markdown syntax, is_food, the food_name, and cuisine_type, based on the image provided"; // prompt to be sent to Gemini API
    // Read the image file and convert it to Base64
    //Read up Gemini Documentation (example of code is there)
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
    return jsonGoogle
  } catch (e) {
    console.log(e);
  }
};

exports.processImage = processImage
