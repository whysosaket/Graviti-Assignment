import React from "react";

const Distance = (props) => {

  return (
    <>
      <div className="w-full border border-gray-50 my-6 rounded-md">
        <div className="bg-white">
          <div className="flex justify-between p-3 font-primary">
            <p className="text-[#1E2A32] my-auto font-bold">Distance</p>
            <p className="font-bold text-[#0079FF] text-2xl">{props.distance}</p>
          </div>
        </div>
        <div className="bg-transparent p-4 font-primary font-light">
          <p>
            The distance between <span className="font-bold">{props.origin}</span>{" "}
            and <span className="font-bold">{props.destination}</span> via the seleted
            route is <span className="font-bold">{props.distance}</span>
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
