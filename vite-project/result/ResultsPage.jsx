//results.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResultsPage.css"; // Assuming you have CSS to style the results
import RestaurantCard from "./RestaurantCard";


function ResultsPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetch");
        setPlaces(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"90vw"}}>
      <h1 style={{color:'white'}}>Restaurant Results</h1>
      {places.map((p) => {
        return <RestaurantCard key={p.id} {...p}/>
      })}
    </div>
  );
}

export default ResultsPage;
