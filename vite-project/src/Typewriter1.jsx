import React, { useState, useEffect } from "react";
import "./Typewriter.css";

const Typewriter = ({
  text1 = "Hungry?",
  text2 = "Let's get started.",
  speed = 150,
}) => {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index1 < text1.length) {
      // Type out the first text
      const timeoutId = setTimeout(() => {
        setIndex1((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (index2 < text2.length) {
      // Start the second text
      setShowCursor(true); // Ensure cursor is visible for the second text
      const timeoutId = setTimeout(() => {
        setIndex2((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      // Hide the cursor when all typing is done
      setShowCursor(false);
    }
  }, [index1, text1.length, index2, text2.length, speed]);

  return (
    <div className="Text">
      <div id="headingContainer">
        <h2>
          {text1.substring(0, index1)}
          {showCursor && index1 < text1.length && (
            <span className="cursor">|</span>
          )}
        </h2>
        {/* The h3 element now exists from the start with transparent text to maintain layout */}
        <h3>
          {
            index1 === text1.length
              ? text2.substring(0, index2)
              : "\u00A0" /* Non-breaking space */
          }
          {showCursor && index2 < text2.length && (
            <span className="cursor">|</span>
          )}
        </h3>

        {/* <p>
          Simply enter a location, upload a photo of your favorite dish and get
          a curated list of nearby restaurants that serve that delicious dish.
        </p> */}
      </div>
    </div>
  );
};

export default Typewriter;
