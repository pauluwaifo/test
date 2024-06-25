import React from "react";

const CircleDollarIcon = ({
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
        d="M9.00033 5.14567V4.28919M9.00033 12.854V13.7105M10.8551 6.43039C10.4849 5.91839 9.79287 5.57391 9.00033 5.57391H8.76241C7.71125 5.57391 6.85912 6.25562 6.85912 7.09655V7.16192C6.85912 7.76341 7.28392 8.31327 7.95641 8.58227L10.0442 9.41741C10.7167 9.6864 11.1415 10.2363 11.1415 10.8378C11.1415 11.7148 10.2528 12.4258 9.15652 12.4258H9.00033C8.20778 12.4258 7.5158 12.0813 7.14558 11.5693M16.7087 8.99984C16.7087 13.257 13.2575 16.7082 9.00033 16.7082C4.74313 16.7082 1.29199 13.257 1.29199 8.99984C1.29199 4.74264 4.74313 1.2915 9.00033 1.2915C13.2575 1.2915 16.7087 4.74264 16.7087 8.99984Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleDollarIcon;
