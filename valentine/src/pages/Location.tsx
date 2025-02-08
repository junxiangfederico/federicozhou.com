import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

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
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeOnMove: true})
            .setHTML(`
              <div class="container" style="background-color: rgb(188, 220, 252); border-radius: 2px; padding: 10px; max-width: 150px;">
                <b class="text-center d-block" style="font-size: 13px; font-weight: 600;">${place.name}</b>
                <p class="text-center" style="font-size: 9px; line-height: 1.5;">${place.description}</p>
              </div>
            `)
        )
        .on('open', function () {
          // Ensure we cast to HTMLElement to access style property
          const popupContent = document.querySelector('.mapboxgl-popup-content') as HTMLElement;
          if (popupContent) {
            popupContent.style.backgroundColor = 'transparent';
          }
        })
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