import axios from "axios";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AnalyzeButton.css";
import searchIcon from "./assets/search_icon.png";

export default function AnalyzeButton({ imgFile, geolocation, category }) {
  let [loading, setLoading] = useState(false);

  // Handles image upload
  const upload2Server = async (type, data) => {
    const serverEndPoint = import.meta.env.VITE_SERVER_END_POINT;
    const formData = new FormData();
    formData.append(type, data);
    formData.append("location", geolocation);
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
      if (response.status !== 200) {
        setLoading(false);
        location.href = "/result/";
      }

      setLoading(false);
      location.href = "/result/";
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        //Be sure to use error.response status because response.status is not defined
        alert(error.response.data);
      }
      console.log(error);
    }
  };

  const validation = async () => {
    if (geolocation) {
      let type;
      setLoading(true);
      if (!imgFile && !category) {
        alert("No Input Received");
        setLoading(false);
      } else if (imgFile && category) {
        alert("Search for food/cuisine OR Upload a photo");
        setLoading(false);
      } else if (category) {
        type = "search_q";
        upload2Server(type, category);
      } else if (imgFile) {
        type = "file";
        upload2Server(type, imgFile);
      }
    } else {
      alert("Location can not be empty.");
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
      <button type="button" onClick={validation}>
        <img src={searchIcon} alt="search icon" id="searchIcon" />
      </button>
      {loading && <BarLoader color="white" style={{ marginBottom: "1em" }} />}
    </div>
  );
}
