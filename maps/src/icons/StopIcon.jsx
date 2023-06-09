import React from "react";

const StopIcon = (props) => {
  return (
    <>
      <svg
        className={props.className}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="7"
          cy="7"
          r="4.5"
          fill="white"
          stroke="#2E2E2E"
          strokeWidth="5"
        />
      </svg>
    </>
  );
};

export default StopIcon;
