const axios = require("axios");

const matchDay = (info) => {
  let currentDay = new Date().getDay();
  if (info?.day === currentDay) {
    return true;
  }
  return false;
};

const businessMap = (dataQuery, resp) => {
  /*
  Maps through results of get Request and returning a new array in businesses.restaurant
  */
  let businesses = { foodData: dataQuery, restaurant: [] };
  businesses.restaurant = resp.data.businesses.map((business) => {
    //this is chat's code
    const todayHours = business.business_hours[0]?.open?.find(matchDay); //optional chaining
    const openToday = business.business_hours[0]?.is_open_now ?? false; //nullish coalescing
    const openHour = todayHours ? parseInt(todayHours.start) : "N/A";

    console.log(openHour);
    const closeHour = todayHours ? parseInt(todayHours.end) : "N/A";
    //

    return {
      food_name: `${dataQuery[0].toUpperCase()}${dataQuery.slice(1)}`,
      id: business.id,
      name: business.name,
      price: business.price,
      open_hour: openHour,
      close_hour: closeHour,
      is_open: openToday,
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

const yelpByPhoto = async (jsonGoogle, location) => {
  /*
  Takes in jsonGoogle (obj literal) and location query
  Make get request to YelpAPI using jsonGoogle key:value
  */

  //Sending request with data from jsonGoogle and location
  const foodData = `${
    jsonGoogle.cuisine_type[0].toUpperCase() + jsonGoogle.cuisine_type.slice(1)
  } ${jsonGoogle.food_name[0].toUpperCase() + jsonGoogle.food_name.slice(1)}`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const resp = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${location
      .toLowerCase()
      .replace(" ", "%20")}&term=${
      jsonGoogle.cuisine_type
    }%20${jsonGoogle.food_name
      .toLowerCase()
      .replace(" ", "%20")}&sort_by=best_match`,
    config
  );
  return businessMap(foodData, resp);
};

const yelpByQuery = async (query, location) => {
  console.log(new Date().getDay());
  /**
    Takes in food query (string) and location query
    Make get request to YelpAPI using food query
   */

  //Sending request to Yelp API
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
  return businessMap(query, resp);
};

exports.yelpByPhoto = yelpByPhoto;
exports.yelpByQuery = yelpByQuery;
