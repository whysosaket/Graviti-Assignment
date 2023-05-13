import React, { useRef, useContext } from "react";
import InputField from "./InputField";
import GlobalContext from "../context/globalContext.jsx";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsFillStopFill} from 'react-icons/bs';
import Distance from "./Distance";
import TransportToggle from "./TransportToggle";
import {IoEllipseOutline} from 'react-icons/io5';

const Selector = () => {
  const originRef = useRef(null);
  const stopRef = useRef(null);
  const destinationRef = useRef(null);
  const transportRef = useRef(null);

  const context = useContext(GlobalContext);
  const { isLoaded, addWaypoint, waypoints, clear, calculateRoute, distance, eta } = context;

  if(!isLoaded) {
    return <>Loading...</>
  }

  const handleClick = () => {
    let origin = originRef.current.value;
    let destination = destinationRef.current.value;
    let trans = transportRef.current.checked ? "WALKING" : "DRIVING";
    if(origin === "" || destination === "") return;
    calculateRoute(origin, destination, trans);
  }

  const handleAddStop = () => {
    if(stopRef.current.value === "") return;
    addWaypoint(stopRef.current.value);
    stopRef.current.value = "";
  }

  const handleClear = () => {
    clear();
    originRef.current.value = "";
    stopRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <>
      <div className="w-full md:px-20 lg:px-30 px-5">
        <div className="md:flex justify-between">
          <div className="md:w-1/2 w-full">
            <InputField title="Origin" val={originRef} />
            {waypoints.length > 0 &&
            <>
              <p className="text-[#2E2E2E] font-primary text-sm font-semibold">Stops</p>
              { waypoints.map((waypoint, index) => {
                  return (
                    <p key={index} className="text-sm text-gray-900 flex font-secondary"> <IoEllipseOutline className="my-auto" />&nbsp; {waypoint.location}</p>
                  )})}
            </>
            }
            <InputField title="Stop" val={stopRef}/>
            <p onClick={handleAddStop} className="-my-3 flex justify-end text-sm cursor-pointer select-none font-secondary"> <AiOutlinePlusCircle className="my-auto mr-2" /> {waypoints.length>0?'Add another stop':'Add stop'}</p>
            <InputField title="Destination" val={destinationRef}/>
            <div className="flex justify-center">
              <TransportToggle val={transportRef}/>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex my-6">
            <div className="mx-auto my-auto flex md:flex-col">
            <button onClick={handleClick} className="bg-[#1B31A8] font-semibold md:my-2 mx-1 py-3 px-6 text-white rounded-3xl">
              Calculate
            </button>
            {/* <button onClick={handleClear} className="bg-[#1B31A8] font-semibold md:my-2 mx-1 p-3 text-white rounded-3xl">
              Clear
            </button> */}
            </div>
          </div>
        </div>
        {distance && 
      <Distance eta={eta} distance={distance} origin={originRef.current.value.split(',')[0]} destination={destinationRef.current.value.split(',')[0]}/>
        }
      </div>
    </>
  );
};

export default Selector;
