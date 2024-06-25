import React from "react";

const XCloseIcon = ({
  className = "",
  stroke = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.1665 1.16699L12.8332 12.8337M12.8332 1.16699L1.1665 12.8337"
        stroke={stroke}
        strokewidth="2"
        strokelinecap="round"
      />
    </svg>
  );
};

export default XCloseIcon;
