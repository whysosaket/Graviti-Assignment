import React from "react";

const Distance = (props) => {

  return (
    <>
      <div className="w-full border border-gray-50 my-6">
        <div className="bg-white">
          <div className="flex justify-between p-6">
            <p className="text-[#1E2A32] font-bold">Distance</p>
            <p className="font-bold text-[#0079FF]">{props.distance}</p>
          </div>
        </div>
        <div className="bg-transparent p-4">
          <p>
            The distance between <span className="font-semibold">{props.origin}</span>{" "}
            and <span className="font-semibold">{props.destination}</span> via the seleted
            route is <span className="font-semibold">{props.distance}</span>
          </p>
          <div className="flex justify-end">
            <p className="text-[#0079FF]"><span className="font-semibold text-black">ETA: </span>{props.eta?props.eta:"N/A"}</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Distance;
