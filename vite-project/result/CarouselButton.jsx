import React from 'react';


export default function CarouselButton({ x, setX, width }) {
    const handleRightClick = () => {
      setX((prevX) => Math.max(prevX - 250, -width)); // Adjust 250 to the width of your cards
    };
  
    return (
      <button onClick={handleRightClick} className="toggle-button">
        GO RIGHT
      </button>
    );
  }