import React, { useEffect, useRef, useState } from "react";
import "./RestaurantCard.css";
import star5 from "./assets/ReviewRibbon_v2/Desktop/medium_20/5.png";
import star45 from "./assets/ReviewRibbon_v2/Desktop/medium_20/4.5.png";
import star4 from "./assets/ReviewRibbon_v2/Desktop/medium_20/4.png";
import star35 from "./assets/ReviewRibbon_v2/Desktop/medium_20/3.5.png";
import star3 from "./assets/ReviewRibbon_v2/Desktop/medium_20/3.png";
import yelpLogo from "./assets/yelpLogo.png"

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
        className="link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className={`card ${isVisible && "is-visible"}`} ref={cardRef}>
          <div className="row-info">
            <div className="imageContainer">
              <img src={image_url} alt={name} />
            </div>

            <div className="textColumn">
              <h1>{name}</h1>
              <div className="ratingStars">
                {(rating > 4.8 && <img src={star5} />) ||
                  (rating > 4.2 && <img src={star45} />) ||
                  (rating > 3.8 && <img src={star4} />) ||
                  (rating > 3.2 && <img src={star35} />) ||
                  (rating > 2.8 && <img src={star3} />)}
                <p>
                  {rating.toFixed(1)} ({reviews} reviews)
                </p>
                <img src={yelpLogo} alt="Yelp Logo" style={{width:"8em"}}/>
              </div>
              <p style={{ textDecoration: "underline" }}>{phone_number}</p>

              <p>{address1},</p>
              <p>
                {city}, {state} {zip_code} {country}
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
