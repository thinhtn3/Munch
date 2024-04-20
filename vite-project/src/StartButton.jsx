import "./StartButton.css";
import React, { useState } from 'react';


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
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
        />
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
