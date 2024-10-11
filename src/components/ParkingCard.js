import React from "react";
import { Link } from "react-router-dom";

const ParkingCard = ({ spot }) => {
  return (
    <div className="parking-card">
      <h3>{spot.name}</h3>
      <p>{spot.location}</p>
      <p>Available Spots: {spot.availableSpots}</p>
      <Link to={`/reservation/${spot.id}`}>Reserve</Link>
    </div>
  );
};

export default ParkingCard;
