import React from "react";

const HoldIcon = ({
  className = "",
  fill = "#18181B",
  stroke = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.125 3.20833V1.95833C1.125 1.4981 1.4981 1.125 1.95833 1.125H3.20833M12.7917 1.125H14.0417C14.5019 1.125 14.875 1.4981 14.875 1.95833V3.20833M14.875 12.7917V14.0417C14.875 14.5019 14.5019 14.875 14.0417 14.875H12.7917M3.20833 14.875H1.95833C1.4981 14.875 1.125 14.5019 1.125 14.0417V12.7917M1.125 9.45833V6.54167M6.54167 1.125H9.45833M14.875 6.54167V9.45833M9.45833 14.875H6.54167"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HoldIcon;
