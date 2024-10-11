import React from "react";
import ParkingCard from "./ParkingCard";

const ParkingList = ({ parkingSpots }) => {
  return (
    <div className="parking-list">
      {parkingSpots.map((spot) => (
        <ParkingCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
};

export default ParkingList;
