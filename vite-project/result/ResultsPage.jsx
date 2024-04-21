//results.jsx
import React from 'react';
import './ResultsPage.css'; // Assuming you have CSS to style the results

function ResultsPage() {
  const places = [
    {
      id: "xv1zt3",
      name: "Giovanni's Pizzeria",
      location: "123 Pizza Street, New York, NY",
      reviews: 158,
      rating: 4.5,
      url: "https://www.yelp.com/biz/giovannis-pizzeria",
      is_closed: false,
      image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/v7yhzWjD3x5tipt5yzZrQw/o.jpg",
      phone_number: "(123) 456-7890",
    },
    {
      id: "n7v2s9",
      name: "Curry Bliss",
      location: "789 Spice Blvd, San Francisco, CA",
      reviews: 204,
      rating: 4.8,
      url: "https://www.yelp.com/biz/curry-bliss",
      is_closed: false,
      image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/g8m3rL6h2x8ijOAliM7-RQ/o.jpg",
      phone_number: "(987) 654-3210",
    }
  ];

  return (
    <div>
      <h1>Restaurant Results</h1>
      {places.map((place) => (
        <div key={place.id} className="restaurant-card">
          <h2>{place.name}</h2>
          <img src={place.image_url} alt={place.name} style={{ width: "100px", height: "100px" }} />
          <p>Address: {place.location}</p>
          <p>Reviews: {place.reviews}</p>
          <p>Rating: {place.rating} stars</p>
          <p>Phone: {place.phone_number}</p>
          <p>Status: {place.is_closed ? "Closed" : "Open"}</p>
          <a href={place.url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;