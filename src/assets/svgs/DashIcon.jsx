import React from "react";

const DashIcon = ({
  className = "",
  stroke = "black",
  fill = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.75 0.25H11.25V1.75H0.75V0.25Z" fill={fill} />
    </svg>
  );
};

export default DashIcon;
