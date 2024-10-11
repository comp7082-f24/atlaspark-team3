import React from "react";
import ParkingList from "../components/ParkingList";

const SearchResults = () => {
  const parkingSpots = []; // Fetch or pass data here

  return (
    <div>
      <h1>Search Results</h1>
      <ParkingList parkingSpots={parkingSpots} />
    </div>
  );
};

export default SearchResults;
