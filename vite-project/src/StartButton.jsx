import "./StartButton.css";
import React, { useState } from "react";

export default function StartButton() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="cameraInput" style={{ marginRight: 20 }}>
          Take Photo:
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="cameraInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById("cameraInput").click()}
          >
            Camera
          </button>
        </label>

        <label htmlFor="libraryInput">
          Upload from Library:
          <input
            type="file"
            accept="image/*"
            id="libraryInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById("libraryInput").click()}
          >
            Library
          </button>
        </label>

        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </form>
    </div>
  );
}
