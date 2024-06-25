import React from "react";

const DownloadIcon = ({
  className = "",
  stroke = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect width="32" height="32" rx="8" fill="white" /> */}
      <path
        d="M22.875 18.2917V22.0417C22.875 22.5019 22.5019 22.875 22.0417 22.875H9.95833C9.4981 22.875 9.125 22.5019 9.125 22.0417V18.2917M16 18.5V9.125M16 18.5L13.0833 15.5833M16 18.5L18.9167 15.5833"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadIcon;
