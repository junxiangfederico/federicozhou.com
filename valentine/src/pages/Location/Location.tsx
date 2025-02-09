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
  const [isEverythingVisible, setIsEverythingVisibile] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [visitedPlaces[0].coords[1], visitedPlaces[0].coords[0]] as [number, number],
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

  const openEverything = (markers: mapboxgl.Marker[], isEverythingVisible: boolean) => {
    if (isEverythingVisible) {
      markers.forEach((m) => {
        if (m.getPopup()?.isOpen() == false) {
          m.togglePopup();
        }
      });
    } else {
      markers.forEach((m) => {
        if (m.getPopup()?.isOpen() == true) {
          m.togglePopup();
        }
      });
    }
  }

  const goToLast = () => {
    const lastPointer = visitedPlaces.length - 1;
    setCurrentIndex(lastPointer);
    focusOnMarker(
      map!,
      markers[lastPointer],
      visitedPlaces[lastPointer].coords as [number, number],
      markers
    );
  }

  const goToFirst = () => {
    setCurrentIndex(0);
    focusOnMarker(
      map!,
      markers[0],
      visitedPlaces[0].coords as [number, number],
      markers
    );
  }

  const moveForward = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(0);
      focusOnMarker(
        map!,
        markers[0],
        visitedPlaces[0].coords as [number, number],
        markers
      );
    }

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

    if (currentIndex == visitedPlaces.length - 1) {
      if (isButtonVisible == false) {
        setIsButtonVisible(true);
      }
    }
  };
  
  const moveBackward = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(0);
      focusOnMarker(
        map!,
        markers[0],
        visitedPlaces[0].coords as [number, number],
        markers
      );
    }

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
        <button 
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={goToFirst}>
          Go to first
        </button>
        <button onClick={moveBackward}>
          Back
        </button>
        <button onClick={moveForward}>
          Forward
        </button>
        <button 
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={goToLast}>
          Go to last
        </button>
        <button
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={() => {
            setIsEverythingVisibile((prev) => {
              const newState = !prev;
              openEverything(markers, newState);
              return newState;
            });
          }}
        >
          Toggle everything
        </button>
      </div>
    </div>
  );
};

export default Location;