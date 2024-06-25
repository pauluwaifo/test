import React from "react";

const NoFillCircleCheckMarkIcon = ({
  className = "",
  stroke = "#2D9F75",
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
        d="M11.5003 6.9165L7.75033 11.4998L6.08366 9.83317M16.7087 8.99984C16.7087 13.257 13.2575 16.7082 9.00033 16.7082C4.74313 16.7082 1.29199 13.257 1.29199 8.99984C1.29199 4.74264 4.74313 1.2915 9.00033 1.2915C13.2575 1.2915 16.7087 4.74264 16.7087 8.99984Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NoFillCircleCheckMarkIcon;
