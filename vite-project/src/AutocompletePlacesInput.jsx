import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";
import "./AutocompletePlacesInput.css";
import React, { useState } from "react";

export default function AutocompletePlaces({
  formData,
  setFormData,
  updateForm,
}) {
  const [empty, setEmpty] = useState(true);

  const handlePlaceSelected = (place) => {
    // Update formData.geolocation when a place is selected
    setFormData((current) => {
      return { ...current, geolocation: place.formatted_address };
    });
  };

  const { ref: materialRef } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: handlePlaceSelected,
  });

  const formValidate = (textfield) => {
    textfield ? setEmpty(false) : setEmpty(true);
  };

  const onChangeAndValidate = (e) => {
    updateForm(e);
    formValidate(e.target.value);
  };

  return (
    <>
      <TextField
        name="geolocation"
        error={empty}
        helperText={empty && "Location can not be empty!"}
        id="autoCompleteForm"
        color="success"
        sx={{
          width: { xs: 350, sm: 300, md: 300, lg: 300 },
          marginY: { xs: 1, sm: 0 },
          marginX: 0.5,
          backgroundColor: "#EEEEE",
          "& .MuiInputBase-root": {
            height: 50, // Set height of the entire input component
          },
          "& label": {
            color: "grey",
          },
          "& label.Mui-focused": {
            color: "#ff9f1c",
          },
        }}
        value={formData.geolocation}
        onChange={onChangeAndValidate}
        label="Location"
        variant="filled"
        inputRef={materialRef}
      />
    </>
  );
}
