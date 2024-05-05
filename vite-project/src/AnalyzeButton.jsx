import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./AnalyzeButton.css";

export default function AnalyzeButton({ imgFile }) {
  let [loading, setLoading] = useState(false);
  let [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async () => {
    setLoading(true);
    setRedirect(false);
    setTimeout(() => {
      setLoading(false); // Set loading back to false after the delay
      setRedirect(true);
    }, 5600); // Adjust the duration as needed
    console.log("loading set to true");
    const formData = new FormData();
    formData.append("file", imgFile);

    try {
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
      <img
        src={URL.createObjectURL(imgFile)}
        alt="Preview"
        style={{ width: "200px", height: "auto" }}
      />

      {redirect ? (
        <button onClick={() => (location.href = "/result/")}>Take Me To My Options!</button>
      ) : (
        <button type="button" onClick={uploadImage}>
          Find Me Some Restaurants!
        </button>
      )}
      {loading && <PulseLoader color="#36d7b7" />}

      {/*  */}
    </div>
  );
}
