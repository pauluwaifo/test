import React from "react";

const DiagonalArrowIcon = ({
  className = "",
  stroke = "#A1A1A9",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 10V1H5M2.25 12.75L13 2"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default DiagonalArrowIcon;
