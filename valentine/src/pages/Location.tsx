import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 

const visitedPlaces = [
  { name: "London", description: "Where it all started", coords: [-0.1276, 51.5074] },
  { name: "Milan", description: "So little time, so many memories", coords: [9.1824, 45.4685] },
  { name: "Florence", description: "Sunsets and sunrise, they don't compare to your smile",  coords: [11.2558, 43.7696] },
  { name: "Tallinn", description: "Where it all just made sense", coords: [24.7536, 59.437] },
];

const Location = () => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [11.2558, 43.7696],
      pitch: 30,
      zoom: 3,
    });

    visitedPlaces.forEach((place) => {
      console.log(`Adding marker for: ${place.name}`);
      new mapboxgl.Marker()
        .setLngLat(place.coords as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        `))
        .addTo(map);
    });

    map.on('style.load', () => {
      map.setConfigProperty('basemap', 'show3dObjects', true);
    })
    return () => map.remove();
  }, [mapboxToken]);

  return <div id="map" style={{ height: "100vh", width: "100vw" }}></div>;
};

export default Location;