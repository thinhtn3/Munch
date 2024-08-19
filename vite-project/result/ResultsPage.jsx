//results.jsx
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./ResultsPage.css"; // Assuming you have CSS to style the results
import RestaurantCard from "./RestaurantCard";
import BackButton from "./BackButton";
import { motion } from "framer-motion";

function ResultsPage() {
  let i = 0;
  const [places, setPlaces] = useState([]);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const carousel = useRef();

  const getData = async () => {
    try {
      // const response = await axios.get("https://snapcuisine.onrender.com/fetch");
      // const response = await axios.get("http://localhost:8080/fetch");
      const response = await axios.get("http://munch.us-west-1.elasticbeanstalk.com//fetch");
      if (response.data) {
        console.log(response.data);
        setPlaces(response.data); //update State with the array of information we .json in express server
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [places]);

  return (
    <>
      <div className="background">
        <motion.h1 style={{ color: "white", margin: "0", padding: "1em" }}>
          Restaurant Results
        </motion.h1>
        <nav className="backNav">
          <BackButton />
        </nav>
        <motion.div
          ref={carousel}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          className="carousel"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "1em",
            maxHeight: "100%",
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="innerCarousel"
            style={{
              display: "flex",
              maxWidth: "100%", // Ensure it doesn't overflow the viewport
              height: "70vh",
            }}
          >
            {places.map((p) => {
              //maps through places after places state is updated from fetch request
              return (
                <motion.div key={p.id}>
                  <RestaurantCard {...p} style={{ minWidth: "250px" }} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default ResultsPage;
