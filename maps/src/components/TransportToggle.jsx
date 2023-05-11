import React from "react";

const TransportToggle = (props) => {
  return (
    <>
      <label
        for="Toggle3"
        className="inline-flex items-center p-2 rounded-md cursor-pointer font-semibold text-white"
      >
        <input
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          ref={props.val}
        />
        <span className="px-4 py-2 rounded-l-md bg-[#1B31A8] peer-checked:bg-gray-400">
          Driving
        </span>
        <span className="px-4 py-2 rounded-r-md bg-gray-400 peer-checked:bg-[#1B31A8]">
          Walking
        </span>
      </label>
    </>
  );
};

export default TransportToggle;
