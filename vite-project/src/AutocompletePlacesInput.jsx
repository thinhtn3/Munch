import { usePlacesWidget } from "react-google-autocomplete";
import { SliderMark, TextField } from "@mui/material";
import "./AutocompletePlacesInput.css";

export default function AutocompletePlaces({
  formData,
  setFormData,
  updateForm,
}) {
  const handlePlaceSelected = (place) => {
    console.log(place);
    // Update formData.geolocation when a place is selected
    setFormData((current) => {
      return { ...current, geolocation: place.formatted_address };
    });
  };

  const { ref: materialRef } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: handlePlaceSelected,
  });

  return (
    <>
      <TextField
        name="geolocation"
        id="autoCompleteForm"
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
          "& .MuiOutlinedInput-root": {
            color: "#000",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey",
            borderWidth: "1px",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#ff9f1c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff9f1c",
            },
          },
        }}
        value={formData.geolocation}
        onChange={updateForm}
        label="Location"
        fullWidth
        variant="filled"
        inputRef={materialRef}
      />
    </>
  );
}
