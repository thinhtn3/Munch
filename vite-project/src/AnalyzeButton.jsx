import axios from "axios";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile, geolocation }) {
  let [loading, setLoading] = useState(false);
  console.log(geolocation);

  // Handles image upload
  const uploadImage = async () => {
    const serverEndPoint = import.meta.env.VITE_SERVER_END_POINT;
    setLoading(true);

    // Create a new formData to be sent to server (includes a file and text)
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", geolocation);
    try {
      const response = await axios.post(
        `${serverEndPoint}/api/upload`,
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
      if (error.response.status === 400) {
        //Be sure to use error.response status because response.status is not defined
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
