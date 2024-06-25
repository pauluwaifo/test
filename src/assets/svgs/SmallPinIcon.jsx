import React from "react";

const SmallPinIcon = ({
  className = "",
  stroke = "#F2AE40",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="8" fill="white" fill-opacity="0.1" />
      <path
        d="M11.5833 16.4167L14.5322 19.3655C14.8916 19.7249 15.5049 19.566 15.6446 19.0772L16.9254 14.5943C16.9732 14.427 17.0846 14.285 17.2357 14.1986L19.7422 12.7664C20.1238 12.5483 20.1936 12.027 19.8828 11.7161L16.2838 8.11717C15.973 7.80634 15.4517 7.87616 15.2336 8.25782L13.8013 10.7643C13.715 10.9154 13.573 11.0268 13.4056 11.0746L8.92274 12.3554C8.43397 12.495 8.27504 13.1084 8.63448 13.4678L11.5833 16.4167ZM11.5833 16.4167L11.5882 16.4118M11.5833 16.4167L8.49999 19.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SmallPinIcon;
