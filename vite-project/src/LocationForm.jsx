import React, { useState } from "react";
import "./LocationForm.css";
import UploadPhotoButton from "./UploadPhotoButton";
import AutocompletePlacesInput from "./AutocompletePlacesInput";
import SearchQueryInput from "./SearchQueryInput";
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

  const updateForm = (e) => {
    // Updates formData.geolocation || formData.category when typed, changes the state.
    const selectedName = e.target.name;
    const newValue = e.target.value;
    setFormData((current) => {
      return { ...current, [selectedName]: newValue };
    });
  };

  return (
    <section id="locationForm">
      <div style={{ display: "flex" }} id="formSubmit">
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex" }}>
          <SearchQueryInput formData={formData} updateForm={updateForm} />

          <AutocompletePlacesInput
            setFormData={setFormData}
            formData={formData}
            updateForm={updateForm}
          />
        </form>

        <AnalyzeButton
          // Passes these props to this comp to be sent to server
          imgFile={imageFile}
          geolocation={formData.geolocation}
          category={formData.category}
        />
      </div>

      <UploadPhotoButton
        //Pass these props to handle image change and update the state from the component
        handleImageChange={handleImageChange}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
    </section>
  );
}
