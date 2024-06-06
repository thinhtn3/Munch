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
      console.log(e.target.files);
      setImageFile(file);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            accept="image/*, image/jpeg, image/png, image/heic, image/heif, image/avif" //avif might not be accepted
            id="libraryInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="takePhotoButton"
            onClick={() => document.getElementById("libraryInput").click()}
          >
            Take Photo
          </button>
        </label>

        {imageFile && (
          <AnalyzeButton imgFile={imageFile} geolocation={geolocation} />
        )}
      </form>
    </div>
  );
}
