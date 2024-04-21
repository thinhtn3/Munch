import "./RestaurantCard.css";

export default function RestaurantCard({
  id,
  name,
  location,
  reviews,
  rating,
  url,
  phone_number,
  is_closed,
  image_url,
}) {
  return (
    <div className="card">
      <div className="row-info">
        <img
          src={image_url}
          alt=""
        />
        <div className="text-column">
          <h1>{name}</h1>
          <p>{location}</p>
          <p>{phone_number}</p>
        </div>
      </div>

      <span>
        {rating} ({reviews})
      </span>
    </div>
  );
}
