import axios from "axios";
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile, geolocation }) {
  let [loading, setLoading] = useState(false);

  // Handles image upload
  const uploadImage = async () => {
    //Everytime image is sent to server, loading is set to true and redirect is set to false
    setLoading(true);

    // Timeout set to account for API get requests
    setTimeout(() => {
      setLoading(false); // False to remove loading animation
      location.href = "/result/"; // Move redirection here
    }, 6000); // Adjust the duration as needed

    // Create a new formData to be sent to server (includes a file and text)
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", geolocation);

    try {
      // Sends form data to endpoint /upload
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Handle the response from the server here
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="displayImage">
      {/* Display Images */}
      <img
        src={URL.createObjectURL(imgFile)}
        alt="Preview"
        style={{ width: "200px", height: "auto" }}
      />

      {/* Use ternary operator (?) conditional where if redirect === false then upload button appears */}
      {/*  else redirect button appears */}

      <button type="button" onClick={uploadImage}>
        Find Restaurants with AI!
      </button>
      {loading && <PulseLoader color="#36d7b7" />}
    </div>
  );
}
