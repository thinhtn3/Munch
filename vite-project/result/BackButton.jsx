import React from "react";
import "./BackButton.css";

export default function BackButton() {
  const handleClick = (e) => {
    e.preventDefault();
    location.href = "/";
  };

  return (
    <div>
      <button
        className="backButton"
        onClick={handleClick}
        style={{
          width: "200px",
          height: "50px",
          borderRadius: "8px",
          border: "0px",
          cursor: "pointer",
          marginLeft: "2.5em",
          marginBottom: "2.5em",
          color: "white",
          fontSize:"1.2em",
          fontWeight: "100",
        }}
      >
        Press to go back
      </button>
    </div>
  );
}
