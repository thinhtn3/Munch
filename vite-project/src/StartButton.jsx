import React, { useState } from "react";
import "./StartButton.css";
import AnalyzeButton from "./AnalyzeButton";

export default function StartButton({ geolocation }) {
  const [imageFile, setImageFile] = useState(null);

  // Display image after uploading
  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div style={{ width: "100%", display: 'flex', justifyContent:'center'}}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            accept="image/*, image/jpeg, image/png, image/heic, image/heif, image/avif"
            id="libraryInput"
            style={{ display: "none" }}
            onChange={handleImageChange} // the moment the image changes, handleImageChange runs
          />
          <button
            type="button"
            className="takePhotoButton"
            onClick={() => document.getElementById("libraryInput").click()} //.click() triggers a click event over the input for libraryInput
          >
            Take Photo
          </button>
        </label>

        {imageFile && ( // if imageFile !null display analyze button
          <AnalyzeButton imgFile={imageFile} geolocation={geolocation} />
        )}
      </form>
    </div>
  );
}
