import StartButton from "../src/StartButton";
import React, { useState } from "react";
import "./LocationFormResult.css";
import Autocomplete from "react-google-autocomplete";
import AnalyzeButton from "../src/AnalyzeButton";

export default function LocationFormResult() {
  /**
   Component which houses states, StartButton and Analyze Button
   */
  const [formData, setFormData] = useState({ geolocation: "", category: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
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
    setFormData((current) => {
      return { ...current, [selectedName]: newValue };
    });
  };

  const handleSubmit = async (e) => {
    // Prevent default behavior of submit
    e.preventDefault();
    console.log(formData.geolocation);
  };

  return (
    <section id="locationFormResult">
      <div style={{ display: "flex" }} id="formSubmit">
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input
            placeholder="Search any cuisine, food, and drinks "
            name="category"
            value={formData.category}
            className="inputBoxResult"
            onChange={updateForm}
          ></input>

          <Autocomplete
            id="autoComplete"
            name="geolocation"
            value={formData.geolocation}
            className="inputBoxResult"
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            types={["establishment"]}
            onChange={updateForm}
            onPlaceSelected={handlePlaceSelected}
          />
        </form>
        <AnalyzeButton
          // Passes these props to this comp to be sent to server
          imgFile={imageFile}
          geolocation={formData.geolocation}
          category={formData.category}
        />

        {/* <StartButton
          handleImageChange={handleImageChange}
          imageFile={imageFile}
          setImageFile={setImageFile}
        /> */}
      </div>
    </section>
  );
}
