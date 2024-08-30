import StartButton from "./StartButton";
import React, { useState } from "react";
import "./LocationForm.css";
import Autocomplete from "react-google-autocomplete";
import AnalyzeButton from "./AnalyzeButton";
import Button from "@mui/material/Button";

export default function LocationForm() {
  // const [geolocation, setGeolocation] = useState("");
  const [formData, setFormData] = useState({ geolocation: "", category: "" });
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Function to set Geolocation (update state) when place is clicked on
  const handlePlaceSelected = (place) => {
    setFormData((current) => {
      return { ...current, geolocation: place.formatted_address };
    });
  };

  const updateForm = (e) => {
    const selectedName = e.target.name;
    const newValue = e.target.value;
    setFormData((current) => {
      return { ...current, [selectedName]: newValue };
    });
  };

  // Prevent default behavior of submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.geolocation);
  };

  return (
    <section id="locationForm">
      <div style={{ display: "flex" }} id="formSubmit">
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input
            placeholder="Search any cuisine, food, and drinks "
            name="category"
            value={formData.category}
            className="inputBox"
            onChange={updateForm}
          ></input>

          <Autocomplete
            name="geolocation"
            value={formData.geolocation}
            className="inputBox"
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            types={["establishment"]}
            onChange={updateForm}
            onPlaceSelected={handlePlaceSelected}
          />
        </form>
        <AnalyzeButton
          imgFile={imageFile}
          geolocation={formData.geolocation}
          category={formData.category}
        />
      </div>
      <h4>
        Unsure of what the food is? Upload a photo and let AI find you
        restaurants
      </h4>
      <StartButton
        handleImageChange={handleImageChange}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
    </section>
  );
}
