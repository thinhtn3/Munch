import axios from "axios";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile, geolocation }) {
  let [loading, setLoading] = useState(false);

  // Handles image upload
  const uploadImage = async () => {
    setLoading(true);

    // Create a new formData to be sent to server (includes a file and text)
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", geolocation);

    try {
      // Sends form data to endpoint /upload
      const response = await axios.post(
        "http://192.168.4.108:8080/upload", // changeback to localhost before push (use ipv4 if want to test on other local network device)
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        location.href = "/result/";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button type="button" onClick={uploadImage}>
        Find Restaurants with AI!
      </button>
      {loading && <BarLoader color='white' style={{ marginBottom: "1em"}} />}

      <div className="displayImage">
        <img
          src={URL.createObjectURL(imgFile)}
          alt="Preview"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    </div>
  );
}
