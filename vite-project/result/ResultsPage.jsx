//results.jsx
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./ResultsPage.css"; // Assuming you have CSS to style the results
import RestaurantCard from "./RestaurantCard";
import { motion } from "framer-motion";
import NavResult from "./NavResult";

function ResultsPage() {
  const [places, setPlaces] = useState([]);
  const [foodData, setFoodData] = useState("");
  const serverEndPoint = import.meta.env.VITE_SERVER_END_POINT;

  const getData = async () => {
    try {
      const response = await axios.get(`${serverEndPoint}/fetch`);
      if (response.data) {
        setFoodData(response.data.foodData);
        setPlaces(response.data.restaurant); //update State with the array of information we .json in express server
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <section id="resultPage">
      <NavResult />
      <div className="background">
        <motion.h1 style={{ color: "black", margin: "0", padding: "1em" }}>
          Displaying results for {foodData}
        </motion.h1>
        <motion.div>
          {places.map((p) => {
            //maps through places after places state is updated from fetch request
            return (
              <motion.div key={p.id}>
                <RestaurantCard {...p} style={{ minWidth: "250px" }} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ResultsPage;
