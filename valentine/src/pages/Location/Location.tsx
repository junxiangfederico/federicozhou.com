import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMarkers, focusOnMarker } from "./utils/LocationUtils";
import { visitedPlaces } from "./data/Locations";
import { useNavigate } from "react-router-dom";

export const Location = () => {
  const navigate = useNavigate();
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const googleToken = import.meta.env.VITE_GOOGLE_API_TOKEN;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [isEverythingVisible, setIsEverythingVisibile] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
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

    {message && (
      <div
        style={{
          position: "absolute",
          bottom: "90px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          padding: "10px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
          maxWidth: "80%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {message}
      </div>
    )}
  
      {/* Buttons Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          gap: "20px",
          flexWrap: "nowrap",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <button 
           style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={() => { setMessage("Going to first place!"); goToFirst(); }}>
          Go to first
        </button>
        <button 
          onClick={() => { 
            if (currentIndex > 0) {
              setMessage("Moving back...");
              moveBackward();
            } else {
              setMessage("Nothing before this, sorry!");
            }
          }}>
          Previous One
        </button>

        <button  
          onClick={() => { 
            if (currentIndex < visitedPlaces.length - 1) {
              setMessage("Moving forward...");
              moveForward();
            } else {
              setIsButtonVisible(true);
              setMessage("Nothing more, sorry!");
            }
          }}>
          Next One
        </button>
        <button 
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={() => { setMessage("Going to last place!"); goToLast(); }}>
          Go To Last
        </button>
        <button 
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={() => {
          setIsEverythingVisibile((prev) => {
            const newState = !prev;
            setMessage("Toggling all popups !");
            openEverything(markers, isEverythingVisible);
            return newState;
          });
        }}>
          Toggle everything
        </button>
        <button 
          style={{ visibility: isButtonVisible ? "visible" : "hidden" }}
          onClick={() => navigate("/ending")}>
          Done !
        </button>
      </div>
    </div>
  );
};

export default Location;