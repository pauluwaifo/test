import React from "react";

const ExCircleIcon = ({
  className = "",
  stroke = "#E6483D",
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
        d="M11.5 6.49984L6.50002 11.4998M11.5 11.4998L6.50002 6.49984M16.7084 8.99984C16.7084 13.257 13.2572 16.7082 9.00002 16.7082C4.74283 16.7082 1.29169 13.257 1.29169 8.99984C1.29169 4.74264 4.74283 1.2915 9.00002 1.2915C13.2572 1.2915 16.7084 4.74264 16.7084 8.99984Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ExCircleIcon;
