import React from "react";

const VoidIcon = ({
  className = "",
  stroke = "#717179",
  fill = "none",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7082 9.00008C16.7082 13.2573 13.257 16.7084 8.99984 16.7084C4.74264 16.7084 1.2915 13.2573 1.2915 9.00008C1.2915 4.74289 4.74264 1.29175 8.99984 1.29175C13.257 1.29175 16.7082 4.74289 16.7082 9.00008Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
    </svg>
  );
};

export default VoidIcon;
