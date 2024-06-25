import React from "react";

const RotateIcon = ({
  className = "",
  stroke = "white",
  fill = "none",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5515 14.875V11.9583C14.5515 11.7282 14.365 11.5417 14.1349 11.5417H11.2182M2.45833 1.125L2.45833 4.04167C2.45833 4.27179 2.64488 4.45833 2.875 4.45833H5.79167M1.67819 7.14063C1.64308 7.42215 1.625 7.70896 1.625 8C1.625 11.797 4.70304 14.875 8.5 14.875C10.7305 14.875 12.7593 13.8128 14.0268 12.1667M15.3218 8.85938C15.3569 8.57785 15.375 8.29104 15.375 8C15.375 4.20304 12.297 1.125 8.5 1.125C6.26951 1.125 4.24073 2.18719 2.9732 3.83333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RotateIcon;
