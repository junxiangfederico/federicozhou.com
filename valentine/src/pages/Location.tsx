import { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken =  "a token here" // Replace with your token

const visitedPlaces = [
  { name: "Paris", coords: [2.3522, 48.8566] },
  { name: "Rome", coords: [12.4964, 41.9028] },
  { name: "London", coords: [-0.1276, 51.5074] }
];

const MapPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 4
    });

    // Add markers for visited places
    visitedPlaces.forEach((place) => {
      new mapboxgl.Marker()
        .setLngLat(place.coords as LngLatLike)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
        .addTo(map);
    });

    return () => map.remove(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Our Memories Together 💖</h1>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default MapPage;