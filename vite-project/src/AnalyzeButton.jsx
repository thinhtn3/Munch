import axios from "axios";
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile, geolocation }) {
  let [loading, setLoading] = useState(false);
  let [redirect, setRedirect] = useState(false);

  // Handles image upload
  const uploadImage = async () => {
    //Everytime image is sent to server, loading is set to true and redirect is set to false
    setLoading(true);
    setRedirect(false);

    // Timeout set to account for API get requests
    setTimeout(() => {
      setLoading(false); // False to remove loading animation
      setRedirect(true); // True to display redirect button
    }, 5600); // Adjust the duration as needed

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
    } finally {
      console.log("Finally block reached");
      setLoading(false);
      console.log("Loading set to false");
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
      {redirect ? (
        <button onClick={() => (location.href = "/result/")}>
          Take Me To My Options!
        </button>
      ) : (
        <button type="button" onClick={uploadImage}>
          Find Me Some Restaurants!
        </button>
      )}
      {loading && <PulseLoader color="#36d7b7" />}
    </div>
  );
}
