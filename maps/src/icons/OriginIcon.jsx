import React from "react";

const OriginIcon = (props) => {
  return (
    <>
      <svg
        className={props.className}
        width="15"
        height="15"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6.00002"
          cy="6"
          r="4.67647"
          fill="#32CD32"
          stroke="#32CD32"
        />
        <circle
          cx="6.00002"
          cy="6"
          r="4.67647"
          fill="#32CD32"
          stroke="#000000"
        />
      </svg>
    </>
  );
};

export default OriginIcon;
