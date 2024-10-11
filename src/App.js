import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

// create custom icon marker
const customIcon = new Icon({
  iconUrl: require("./icons/marker.png"),
  iconSize: [24, 36] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// hard-coded markers
const markers = [
  {
    geocode: [49.2837, -123.1211],
    popUp: "Fairmont, Vancouver"
  },
  {
    geocode: [49.284530, -123.101880],
    popUp: "Waterfront, Vancouver"
  },
  {
    geocode: [49.278430, -123.112680],
    popUp: "Stadium-Chinatown"
  }
];

export default function App() {
  return (
    <MapContainer center={[49.2827, -123.1207]} zoom={15}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

      </MarkerClusterGroup>
    </MapContainer>
  );
}


/* Eventual Set up
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";

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