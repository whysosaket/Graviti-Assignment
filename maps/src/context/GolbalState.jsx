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
      let distance = 0;
      let duration = 0;
      for(let i = 0; i < results.routes[0].legs.length; i++) {
          distance += results.routes[0].legs[i].distance.value/1000;
          duration += results.routes[0].legs[i].duration.value;
      }

      distance = distance.toFixed(2)+" kms";

      let years = Math.floor(duration / (365 * 24 * 60 * 60));
      duration %= 365 * 24 * 60 * 60;
      let months = Math.floor(duration / (30 * 24 * 60 * 60));
      duration %= 30 * 24 * 60 * 60;
      let days = Math.floor(duration / (24 * 60 * 60));
      duration %= 24 * 60 * 60;
      let hours = Math.floor(duration / (60 * 60));
      duration %= 60 * 60;
      let minutes = Math.floor(duration / 60);
      duration %= 60;

      let eta = "";
      if(years > 0) {
          eta += years + " years ";
      }
      if(months > 0) {
          eta += months + " months ";
      }
      if(days > 0) {
          eta += days + " days ";
      }
      if(hours > 0) {
          eta += hours + " hours ";
      }
      if(minutes > 0) {
          eta += minutes + " minutes";
      }
       duration = eta;
       setDirectionsResponse(results);
       setDistance(distance);
       setEta(duration);
    } catch(err) {
        if(err.message) {
            let message = err.message.split(":")[2].trim();
            toast.error(message);
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
