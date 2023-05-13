import React, { useContext } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import GlobalContext from "../context/globalContext.jsx";

const MapView = () => {

  const center = {
    lat: 20.0760, lng: 78.8777
  };

  const context = useContext(GlobalContext);
  const { directionsResponse, isLoaded, origin, destination, waypointsCoordinates } = context;

  console.log(origin, destination);

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
        {origin && <Marker position={origin} icon='./OriginIcon.svg'/>}
        {destination && <Marker position={destination} icon='./DestinationIcon.svg'/>}
        {waypointsCoordinates.map((waypoint, index) => (
          <Marker key={index} position={waypoint} icon='./StopIcon.svg'/>
        ))}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: true }}/>
        )}
      </GoogleMap>
      </div>
    </div>
  );
};

export default MapView;
