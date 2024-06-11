//results.jsx
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./ResultsPage.css"; // Assuming you have CSS to style the results
import RestaurantCard from "./RestaurantCard";
import BackButton from "./BackButton";
import { motion } from "framer-motion";
import CarouselButton from "./CarouselButton";

function ResultsPage() {
  const [places, setPlaces] = useState([]);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const carousel = useRef();

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fetch");
      setPlaces(response.data); //update State with the array of information we .json in express server
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
        <div>
          <motion.h1 style={{ color: "white", margin: "0", padding: "1em" }}>
            Restaurant Results
          </motion.h1>
          <BackButton />
        </div>
        <motion.div
          ref={carousel}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          className="carousel"
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "1em",
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="innerCarousel"
            style={{
              display: "flex",
              maxWidth: "100%", // Ensure it doesn't overflow the viewport
            }}
          >
            {places.map((p) => {
              return (
                <motion.div>
                  <RestaurantCard
                    key={p.id}
                    {...p}
                    style={{ minWidth: "250px" }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
        {/* <CarouselButton x={x} setX={setX} width={width} /> */}
      </div>
    </>
  );
}

export default ResultsPage;
