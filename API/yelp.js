const axios = require("axios");

const getYelpData = async (jsonGoogle, location) => {
  
  let businesses = [];
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const resp = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${location
      .toLowerCase()
      .replace(" ", "%20")}&term=${jsonGoogle.food_name
      .toLowerCase()
      .replace(" ", "%20")}%20${jsonGoogle.cuisine_type
      .toLowerCase()
      .replace(" ", "%20")}&sort_by=best_match`,
    config
  );

  // Maps through response from Yelp and returns an array of objects with information we need
  businesses = resp.data.businesses.map((business) => {
    return {
      food_name: jsonGoogle.food_name,
      id: business.id,
      name: business.name,
      address1: business.location.address1,
      city: business.location.city,
      state: business.location.state,
      zip_code: business.location.zip_code,
      country: business.location.country,
      reviews: business.review_count,
      rating: business.rating,
      url: business.url,
      is_closed: business.is_closed,
      image_url: business.image_url,
      phone_number: business.display_phone,
    };
  });
  return businesses;
};

exports.getYelpData = getYelpData;
