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
    <div className="Text"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: " center",
        alignItems: "center",
        width: "97.5vw",
        // padding: "0em 1.5em"
      }}
    >
      <h2
        style={{
          fontWeight: "400",
        }}
      >
        {text1.substring(0, index1)}
        {showCursor && index1 < text1.length && (
          <span className="cursor">|</span>
        )}
      </h2>
      {/* The h3 element now exists from the start with transparent text to maintain layout */}
      <h3 style={{ fontWeight: "400", marginBottom: "0px" }}>
        {
          index1 === text1.length
            ? text2.substring(0, index2)
            : "\u00A0" /* Non-breaking space */
        }
        {showCursor && index2 < text2.length && (
          <span className="cursor">|</span>
        )}
      </h3>

      <p
        style={{
          fontWeight: "100",
          fontSize: "1.3em",
          paddingBottom: "1em",
          width: "",
        }}
      >
        Simply upload a photo of your favorite dish and get a curated list of
        nearby restaurants that serve that delicious dish.
      </p>
    </div>
  );
};

export default Typewriter;
