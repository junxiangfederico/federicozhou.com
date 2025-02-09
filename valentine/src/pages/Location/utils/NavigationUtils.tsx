import { useState } from "react";
import { focusOnMarker } from "./LocationUtils";

interface UseNavigationProps {
  markers: mapboxgl.Marker[];
  visitedPlaces: { coords: [number, number] }[];
  map: mapboxgl.Map | null;
}

const useNavigation = ({ markers, visitedPlaces, map }: UseNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveForward = () => {
    if (currentIndex == 0) {
      setCurrentIndex(0);
      focusOnMarker(map!, markers[currentIndex], visitedPlaces[currentIndex].coords, markers);
    }

    if (currentIndex < visitedPlaces.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      focusOnMarker(map!, markers[newIndex], visitedPlaces[newIndex].coords, markers);
    }

    console.log("Reached the end");
  };

  const moveBackward = () => {
    if (currentIndex == 0) {
      console.log("Nothing before this, sorry");
    }

    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      focusOnMarker(map!, markers[newIndex], visitedPlaces[newIndex].coords, markers);
    }
  };

  return { currentIndex, moveForward, moveBackward };
};

export default useNavigation;