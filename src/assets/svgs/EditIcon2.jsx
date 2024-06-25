import React from "react";

const EditIcon2 = ({
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
        d="M10.042 4.20853L12.5777 1.67279C12.9032 1.34735 13.4308 1.34735 13.7562 1.67279L16.3277 4.24428C16.6532 4.56971 16.6532 5.09735 16.3277 5.42279L13.792 7.95853M10.042 4.20853L1.53607 12.7145C1.37979 12.8707 1.29199 13.0827 1.29199 13.3037V16.7085H4.69681C4.91783 16.7085 5.12979 16.6207 5.28607 16.4645L13.792 7.95853M10.042 4.20853L13.792 7.95853"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon2;
