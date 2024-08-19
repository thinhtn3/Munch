import axios from "axios";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile, geolocation }) {
  let [loading, setLoading] = useState(false);
  console.log(geolocation)
  // Handles image upload
  const uploadImage = async () => {
    setLoading(true);

    // Create a new formData to be sent to server (includes a file and text)
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", geolocation);
    try {
      const response = await axios.post(
        // "http://localhost:8080/api/upload",
        "http://munch.us-west-1.elasticbeanstalk.com/",
        // "https://snapcuisine.onrender.com/api/upload", // changeback to localhost before push (use ipv4 if want to test on other local network device)
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Sends form data to endpoint /upload
      if (response.status === 200) {
        setLoading(false);
        location.href = "/result/";
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) { //Be sure to use error.response status because response.status is not defined
        alert(error.response.data);
      }
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
      {loading && <BarLoader color="white" style={{ marginBottom: "1em" }} />}

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
