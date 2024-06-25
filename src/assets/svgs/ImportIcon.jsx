import React from "react";

const ImportIcon = ({
  className = "",
  fill = "#18181B",
  stroke = "#717179",
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
        d="M7.99999 1.125V10.5M7.99999 1.125L11.75 4.875M7.99999 1.125L4.25 4.875M14.875 8.625V14.0417C14.875 14.5019 14.5019 14.875 14.0417 14.875H1.95833C1.4981 14.875 1.125 14.5019 1.125 14.0417V8.625"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ImportIcon;
