import React from "react";

export const CaretLeft = ({
  className = "",
  stroke = "black",
  fill = "none",
}) => {
  return (
    <svg
      className={`${className}`}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
