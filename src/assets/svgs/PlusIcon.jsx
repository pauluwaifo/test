import React from "react";

const PlusIcon = ({
  className = "",
  stroke = "black",
  fill = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.58301 5.25V0.75H6.08301V5.25H10.583V6.75H6.08301V11.25H4.58301V6.75H0.0830078V5.25H4.58301Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
