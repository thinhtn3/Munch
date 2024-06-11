import React, { useEffect, useRef, useState } from "react";
import "./RestaurantCard.css";

export default function RestaurantCard({
  id,
  name,
  address1,
  city,
  state,
  zip_code,
  country,
  reviews,
  rating,
  url,
  phone_number,
  is_closed,
  image_url,
}) {
  const cardRef = useRef(null); // Reference to the card element
  const [isVisible, setIsVisible] = useState(false); // Visibility state

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our visibility state when observer callback fires
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // Default to the viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the card is in view
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current); // Start observing the card
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current); // Cleanup observer when the component is unmounted or ref changes
      }
    };
  }, [cardRef]); // Empty array ensures the effect is only run on mount and unmount

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className={`card ${isVisible ? "is-visible" : ""}`} ref={cardRef}>
          <div className="row-info">
            <div className="imageContainer">
              <img src={image_url} alt={name} />
            </div>

            <div className="textColumn">
              <h1>{name}</h1>
              <p>{address1},</p>
              <p>
                {city}, {state} {zip_code}
              </p>
              <p>{country}</p>
              <p style={{ textDecoration: "underline" }}>{phone_number}</p>
              <span>
                {rating}⭐ ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
