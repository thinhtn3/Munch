//results.jsx
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./ResultsPage.css"; // Assuming you have CSS to style the results
import RestaurantCard from "./RestaurantCard";
import BackButton from "./BackButton";
import { motion } from "framer-motion";
import Nav from "./Nav"

function ResultsPage() {
  const [places, setPlaces] = useState([]);
  const [foodData, setFoodData] = useState({})
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const serverEndPoint = import.meta.env.VITE_SERVER_END_POINT;

  const getData = async () => {
    try {
      const response = await axios.get(
        `${serverEndPoint}/fetch`
      );
      if (response.data) { 
        setFoodData(response.data.foodData)
        setPlaces(response.data.restaurant); //update State with the array of information we .json in express server
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
    <Nav/>
      <div className="background">
        <motion.h1 style={{ color: "white", margin: "0", padding: "1em" }}>
          Restaurant Results
        </motion.h1>
        <motion.h1 style={{ color: "white", margin: "0", padding: "1em" }}>
          Displaying results for {foodData.cuisine_type} {foodData.food_name}
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
