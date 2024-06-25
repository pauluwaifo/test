import React from "react";

const ChecklistIcon = ({
  className = "",
  stroke = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.79167 10.5417H14.875M7.79167 3.45833H14.875M1.125 4.1875L2.51389 5.125L5.29167 1.375M1.125 11.6875L2.51389 12.625L5.29167 8.875"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChecklistIcon;
