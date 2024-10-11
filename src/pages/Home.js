import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ParkingList from "../components/ParkingList";

const Home = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  
  const handleSearch = (location) => {
    // TODO: Fetch parking data based on location
    // For now, let's simulate some data:
    setParkingSpots([
      { id: 1, name: "Parking Lot A", location: "Downtown", availableSpots: 5 },
      { id: 2, name: "Parking Lot B", location: "Uptown", availableSpots: 8 }
    ]);
  };

  return (
    <div>
      <h1>Find Parking</h1>
      <SearchBar onSearch={handleSearch} />
      <ParkingList parkingSpots={parkingSpots} />
    </div>
  );
};

export default Home;
