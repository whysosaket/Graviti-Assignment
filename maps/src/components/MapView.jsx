import React, { useContext } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import GlobalContext from "../context/globalContext.jsx";

const MapView = () => {

  const center = {
    lat: 20.0760, lng: 78.8777
  };

  const context = useContext(GlobalContext);
  const { directionsResponse, isLoaded } = context;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
        <div className="mx-auto md:w-[32rem] md:h-[32rem] h-[20rem] w-full" >
      <GoogleMap
        center={center}
        zoom={6}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      </div>
    </div>
  );
};

export default MapView;
