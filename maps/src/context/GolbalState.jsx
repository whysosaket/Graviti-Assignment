import React, { useState } from "react";
import GlobalContext from "./globalContext.jsx";
import { useJsApiLoader } from "@react-google-maps/api";
import { toast } from 'react-toastify';

const GlobalState = (props) => {
  const [waypoints, setWaypoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [eta, setEta] = useState("");

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
    // clear previous route
    clear();

    // check if origin and destination are valid locations
    if (origin === "" || destination === "") return;

    // const isDestinationValid = await new Promise(resolve => {
    //     const geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({ address: destination }, (results, status) => {
    //         console.log(results);
    //       if (status !== "OK") {
    //         toast.error("Invalid destination");
    //         resolve(false);
    //       } else {
    //         resolve(true);
    //       }
    //     });
    //   });
    //   if (!isDestinationValid) return;

    //   const isOriginValid = await new Promise(resolve => {
    //     const geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({ address: origin }, (results, status) => {
    //         console.log(results);
    //         if (status !== "OK") {
    //             toast.error("Invalid origin");
    //             resolve(false);
    //             } else {
    //             resolve(true);
    //             }
    //         });
    //     });
    //     if (!isOriginValid) return;

    // eslint-disable-next-line no-undef
    try{
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      // eslint-disable-next-line no-undef
      travelMode:
        trans === "DRIVING"
          ? google.maps.TravelMode.DRIVING
          : google.maps.TravelMode.WALKING,
    });
    if(results.status !== "OK") {
        toast.error(results.message);
    }
       const distance = results.routes[0].legs[0].distance.text;
       const duration = results.routes[0].legs[0].duration.text;
   
       setDirectionsResponse(results);
       setDistance(distance);
       setEta(duration);
    } catch(err) {
        if(err.message === "DIRECTIONS_ROUTE: NOT_FOUND: At least one of the origin, destination, or waypoints could not be geocoded."){
            toast.error("At least one of the origin, destination, or waypoints could not be geocoded.");
            return;
        }
        else if(err.message === "DIRECTIONS_ROUTE: NOT_FOUND: There was an issue performing a Directions request."){
            toast.error("There was an issue performing a Directions request");
            return;
        }else if(err.message === "DIRECTIONS_ROUTE: ZERO_RESULTS: No route could be found between the origin and destination."){
            toast.error("No route could be found between the origin and destination");
            return;
        }else {
            toast.error("Something went wrong. Please try again later.");
            return;
        }
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoaded,
        addWaypoint,
        clear,
        calculateRoute,
        distance,
        directionsResponse,
        waypoints,
        eta
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
