import StartButton from "./StartButton";
import React, { useState } from "react";
import "./LocationForm.css";
import Autocomplete from "react-google-autocomplete";

export default function LocationForm() {
  const [geolocation, setGeolocation] = useState("");

  // Function to set Geolocation (update state) when place is clicked on
  const handlePlaceSelected = (place) => {
    setGeolocation(place.formatted_address);
    console.log(place.formatted_address);
  };

  // Prevent default behavior of submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          style={{
            borderRadius: "50px",
            border: "0px",
            width: "300px",
            fontSize: "1.25em",
            textAlign: "center",
            width: '330px'
          }}
          className="inputBox"
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          types={["establishment"]}
          onPlaceSelected={handlePlaceSelected}
        />
      </form>

      <StartButton geolocation={geolocation} />
    </section>
  );
}
