import React, { useState } from "react";
import axios from "axios";
import "./StartButton.css";

export default function StartButton() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      console.log(e.target.files);
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
        window.location.href = "/result";

      console.log(response.data); // Handle the response from the server here
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            accept="image/*"
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
          <div>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
            <button type="button" onClick={uploadImage}>
              Analyze Photo
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
