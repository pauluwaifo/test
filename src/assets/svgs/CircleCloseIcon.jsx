import React from "react";

const CircleCloseIcon = ({ className = "", fill = "#0F1324" }) => {
  return (
    <svg
      className={`${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9987 13.6666C3.3167 13.6666 0.332031 10.6819 0.332031 6.99992C0.332031 3.31792 3.3167 0.333252 6.9987 0.333252C10.6807 0.333252 13.6654 3.31792 13.6654 6.99992C13.6654 10.6819 10.6807 13.6666 6.9987 13.6666ZM6.9987 6.05725L5.11336 4.17125L4.17003 5.11459L6.05603 6.99992L4.17003 8.88525L5.11336 9.82859L6.9987 7.94258L8.88403 9.82859L9.82736 8.88525L7.94136 6.99992L9.82736 5.11459L8.88403 4.17125L6.9987 6.05725Z"
        fill={fill}
        fillOpacity="0.6"
      />
    </svg>
  );
};

export default CircleCloseIcon;
