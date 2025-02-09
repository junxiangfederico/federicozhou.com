import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMarkers, focusOnMarker } from "./utils/LocationUtils";
import { visitedPlaces } from "./data/Locations";

const Location = () => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const googleToken = import.meta.env.VITE_GOOGLE_API_TOKEN;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: visitedPlaces[0].coords as [number, number],
      pitch: 30,
      zoom: 5,
    });
  
    const loadMarkers = async () => {
      const markersArray = await createMarkers(mapInstance, visitedPlaces, googleToken);
      setMarkers(markersArray);
    };
  
    loadMarkers();
    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [mapboxToken]);

  const moveForward = () => {
    if (currentIndex < visitedPlaces.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      focusOnMarker(
        map!,
        markers[newIndex],
        visitedPlaces[newIndex].coords as [number, number],
        markers
      );
    }
  };
  
  const moveBackward = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      focusOnMarker(
        map!,
        markers[newIndex],
        visitedPlaces[newIndex].coords as [number, number],
        markers
      );
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
      <div style={{ 
        position: "absolute", 
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        display: "flex",
        gap: "40px",
      }}>
        <button onClick={moveBackward}>
          Back
        </button>
        <button onClick={moveForward}>
          Forward
        </button>
      </div>
    </div>
  );
};

export default Location;