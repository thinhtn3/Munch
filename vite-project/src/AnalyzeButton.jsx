import axios from "axios";
import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "./AnalyzeButton.css";
import searchIcon from "./assets/search_icon.png";
import Alert from "@mui/material/Alert";

export default function AnalyzeButton({ imgFile, geolocation, category }) {
  /*
   Component button to receive and send input to the server.
   */
  const [loading, setLoading] = useState(false);
  const serverEndPoint = import.meta.env.VITE_SERVER_END_POINT;

  const upload2Server = async (type, data) => {
    /*
    type refers to whether formData type is 'search_q' (search by string) or 'file' (search by image)
    data refers to the actual data to be interpreted
    function creates a new formData and appending the type
    sends post request to our nodejs server at the endpoint /api/upload
    if server sends back status code 200, redirects to /result
    else catches and alert client with pre-defined error message.
    */

    //Create and append data to newFormData
    const formData = new FormData();
    formData.append(type, data);
    formData.append("location", geolocation);

    try {
      // Sends form data to endpoint /upload
      const response = await axios.post(
        `${serverEndPoint}/api/upload`,
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
      setLoading(false);
      if (error.response.status === 400) {
        //Be sure to use error.response status because response.status is not defined
        alert(error.response.data);
      }
    }
  };

  const validation = async () => {
    /*
    Validate input and ensure that there can't be both an image and a query uploaded. 
    Check which file is uploaded and execute upload2Server accordingly
    */
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
    <div>
      <button id="analyzeButton" type="button" onClick={validation}>
        <img src={searchIcon} alt="search icon" id="searchIcon" />
      </button>
      {loading && <BarLoader color="#FF9F1C" style={{ marginBottom: "1em" }} />}
    </div>
  );
}
