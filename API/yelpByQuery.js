const axios = require("axios");

const yelpByQuery = async (query, location) => {
  /**
    Takes in food query (string) and location query
    Make get request to YelpAPI using food query
    Maps through results of get Request and returning a new array in businesses.restaurant
   */

  //Sending request to Yelp API
  let businesses = { foodData: query, restaurant: [] };
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const resp = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${location
      .toLowerCase()
      .replace(" ", "%20")}&term=${query.toLowerCase().replace(" ", "%20")}
      &sort_by=best_match`,
    config
  );

  // Maps through response from Yelp and returns an array of objects with information we need
  businesses.restaurant = resp.data.businesses.map((business) => {
    return {
      food_name: `${query[0].toUpperCase()}${query.slice(1)}`,
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
  // console.log(businesses.foodData)
  return businesses;
};

exports.yelpByQuery = yelpByQuery;
