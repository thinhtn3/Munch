import StartButton from "./UploadPhotoButton";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./LocationForm.css";
import { usePlacesWidget } from "react-google-autocomplete";
import AnalyzeButton from "./AnalyzeButton";

export default function LocationForm() {
  /**
   Component which houses states, StartButton and Analyze Button
   */
  const [formData, setFormData] = useState({ geolocation: "", category: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    //Change imageFile State
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handlePlaceSelected = (place) => {
    // Update formData.geolocation when a place is selected
    setFormData((current) => {
      return { ...current, geolocation: place.formatted_address };
    });
  };

  const updateForm = (e) => {
    // Updates formData.geolocation || formData.category when typed, changes the state.
    const selectedName = e.target.name;
    const newValue = e.target.value;
    console.log(newValue);
    setFormData((current) => {
      return { ...current, [selectedName]: newValue };
    });
  };

  const handleSubmit = async (e) => {
    // Prevent default behavior of submit
    e.preventDefault();
    console.log(formData.geolocation);
  };

  const { ref: materialRef } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  });

  return (
    <section id="locationForm">
      <div style={{ display: "flex" }} id="formSubmit">
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <TextField
              variant="outlined"
              label="Enter Food"
              name="category"
              value={formData.category}
              className="inputBox"
              placeholder="Search any cuisine, food, and drinks "
              onChange={updateForm}
            />
          </div>

          <TextField
            name="geolocation"
            sx={{ width: "200px" }}
            value={formData.geolocation}
            onChange={updateForm}
            onPlaceSelected={handlePlaceSelected}
            label="Location"
            fullWidth
            variant="outlined"
            inputRef={materialRef}
          />
        </form>

        <AnalyzeButton
          // Passes these props to this comp to be sent to server
          imgFile={imageFile}
          geolocation={formData.geolocation}
          category={formData.category}
        />
      </div>

      <StartButton
        //Pass these props to handle image change and update the state from the component
        handleImageChange={handleImageChange}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
    </section>
  );
}
