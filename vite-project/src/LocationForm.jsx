import StartButton from "./StartButton";
import React, { useState, useEffect } from "react";
import "./LocationForm.css";
import Autocomplete from "react-google-autocomplete";

export default function LocationForm() {
  // const [geolocation, setGeolocation] = useState("");
  const [formData, setFormData] = useState({ geolocation: "", category: "" });

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
    console.log(formData);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // Prevent default behavior of submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.geolocation);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
      <StartButton geolocation={formData.geolocation} />
    </section>
  );
}
