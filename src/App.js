import "./styles.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import React, { useEffect, useState } from 'react';


import { Icon, divIcon, point } from "leaflet";

// create custom icon marker
const customIcon = new Icon({
  iconUrl: require("./icons/disabilitymarker.png"),
  //iconSize: [24, 36] // size of the marker icon
  iconSize: [24, 28] // size of the disability marker icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

//hard-coded markers
// const markers = [
//   {
//     geocode: [49.2837, -123.1211],
//     popUp: "Fairmont, Vancouver"
//   },
//   {
//     geocode: [49.284530, -123.101880],
//     popUp: "Waterfront, Vancouver"
//   },
//   {
//     geocode: [49.278430, -123.112680],
//     popUp: "Stadium-Chinatown"
//   }
// ];


const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisabilityParking = async () => {
      try {
        const response = await fetch('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/disability-parking@vancouver/records?limit=50');
        if (!response.ok) {
          throw new Error('Unable to fetch disability parking');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data

        // Extract coordinates from the results
        const coords = data.results.map(record => ({
          lat: record.geom.geometry.coordinates[1], // Latitude
          lon: record.geom.geometry.coordinates[0], // Longitude
          name: record.location || "Unamed location",
        }));

        setCoordinates(coords);
      } catch (error) {
        console.error('Error fetching disability parking data:', error);
        setError(error.message);
      } 
    };

    fetchDisabilityParking();
  }, []);


  return (
    <>
      <MapContainer center={[49.2827, -123.1207]} zoom={15}>
        {/* OPEN STREET MAPS TILES */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {/* Mapping through the markers */}
          {coordinates.map((coord, index) => (
            <Marker key ={index} position={[coord.lat,coord.lon]} icon={customIcon}>
              <Popup>{coord.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>

  );
};

export default App;


/* Eventual Set up
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import descriptions from '../node_modules/jest-config/build/Descriptions.d';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchResults} />
          <Route path="/profile" component={Profile} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
*/