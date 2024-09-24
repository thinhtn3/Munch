import React, { useEffect, useRef, useState } from "react";
import "./RestaurantCard.css";
import star5 from "./assets/ReviewRibbon_v2/Desktop/medium_20/5.png";
import star45 from "./assets/ReviewRibbon_v2/Desktop/medium_20/4.5.png";
import star4 from "./assets/ReviewRibbon_v2/Desktop/medium_20/4.png";
import star35 from "./assets/ReviewRibbon_v2/Desktop/medium_20/3.5.png";
import star3 from "./assets/ReviewRibbon_v2/Desktop/medium_20/3.png";
import yelpLogo from "./assets/yelpLogo.png";

export default function RestaurantCard({
  id,
  name,
  price,
  is_open,
  open_hour,
  close_hour,
  address1,
  city,
  state,
  zip_code,
  country,
  reviews,
  rating,
  url,
  phone_number,
  image_url,
}) {
  const cardRef = useRef(null); // Reference to the card element
  const [isVisible, setIsVisible] = useState(false); // Visibility state

  const formatOpenHour = (open_hour) => {
    let open;
    if (open_hour > 1200) {
      open = `${Math.floor(open_hour - 1200) / 100}:${open_hour
        .toString()
        .slice(-2)} PM`;
    } else if (open_hour === 1200) {
      open = `${Math.floor(open_hour / 100)}:${open_hour
        .toString()
        .slice(-1)} PM`;
    } else {
      open = `${Math.floor(open_hour / 100)}:${open_hour
        .toString()
        .slice(-2)} AM `;
    }
    return open;
  };

  const formatCloseHour = (close_hour) => {
    let close;
    if (close_hour > 1200) {
      close = `${Math.floor((close_hour - 1200) / 100)}:${close_hour
        .toString()
        .slice(-2)} PM`;
    } else if (close_hour === 1200) {
      close = `${Math.floor(close_hour / 100)}:${close_hour
        .toString()
        .slice(-2)} PM`;
    } else if (close_hour < 1) {
      close = `12:00 AM (Next Day)`;
    } else {
      close = `${Math.floor(close_hour / 100)}:${close_hour
        .toString()
        .slice(-2)} AM (Next Day)`;
    }
    return close;
  };

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
                {(rating > 4.8 && <img src={star5} alt="5 stars" />) ||
                  (rating > 4.2 && <img src={star45} alt="4.5 stars" />) ||
                  (rating > 3.8 && <img src={star4} alt="4 stars" />) ||
                  (rating > 3.2 && <img src={star35} alt="3.5 stars" />) ||
                  (rating > 2.8 && <img src={star3} alt="3 stars" />)}
                <p>
                  {rating.toFixed(1)} ({reviews} reviews)
                </p>
                <img src={yelpLogo} alt="Yelp Logo" style={{ width: "8em" }} />
              </div>
              <p>{price ? price : "Price Unavailable"}</p>
              <p>{phone_number ? phone_number : "No Phone Number Found"}</p>

              <p>{address1},</p>
              <p>
                {city}, {state} {zip_code} {country}
              </p>
              <p style={{ color: "black" }}>
                {is_open ? (
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "green", fontWeight: "800" }}>
                      CURRENTLY OPEN
                    </p>
                    <p style={{ marginLeft: "10px" }}>
                      {open_hour !== "N/A" || close_hour !== "N/A"
                        ? `${formatOpenHour(open_hour)} - ${formatCloseHour(
                            close_hour
                          )}`
                        : "Check Yelp For Opening Hours"}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "red", fontWeight: "800" }}>CLOSED</p>
                    <p style={{ marginLeft: "10px" }}>
                      {open_hour !== "N/A" || close_hour !== "N/A"
                        ? `${formatOpenHour(open_hour)} - ${formatCloseHour(
                            close_hour
                          )}`
                        : "Closed All Day (Check Yelp for Hours)"}
                    </p>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
