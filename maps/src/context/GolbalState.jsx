
import React, {useState} from "react";
import GlobalContext from "./globalContext.jsx";
import { useJsApiLoader } from "@react-google-maps/api";


const GlobalState = (props) => {

    const [waypoints, setWaypoints] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    
    // Connecting to Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
        libraries: ["places"],
    });

    const addWaypoint = (val) => {
        setWaypoints([
          ...waypoints,
          {
            location: val,
            stopover: true,
          },
        ]);
      };

      const clear = () => {
        setWaypoints([]);
        setDistance("");
        setDirectionsResponse(null);
      };

      async function calculateRoute(origin, destination, trans) {    
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          // eslint-disable-next-line no-undef
          travelMode: trans === "DRIVING" ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
      }




    return (
        <GlobalContext.Provider value={{isLoaded, addWaypoint, clear, calculateRoute, distance, directionsResponse, waypoints}}>
            {props.children}
        </GlobalContext.Provider>
    )
};

export default GlobalState;