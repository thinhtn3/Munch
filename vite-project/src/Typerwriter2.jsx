import React, { useState, useEffect } from 'react';
import './Typewriter.css';  // Import the CSS for styling

const Typewriter2 = ({ text, speed = 150  }) => {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      // Hide the cursor when typing is done
      setShowCursor(false);
    }
  }, [index, text.length, speed]);

  return (
    <h3>
      {text.substring(0, index)}
      {showCursor && <span className="cursor">|</span>}
    </h3>
  );
};

export default Typewriter2;