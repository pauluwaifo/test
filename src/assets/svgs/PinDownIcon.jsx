import React from "react";

const PinDownIcon = ({
  className = "",
  stroke = "black",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12.7082H3.95834V10.4165L4.27211 10.1027C5.40515 8.9697 6.04168 7.43298 6.04168 5.83063V3.12484C6.04168 2.6646 6.41477 2.2915 6.87501 2.2915H13.125C13.5852 2.2915 13.9583 2.6646 13.9583 3.12484V5.83063C13.9583 7.43298 14.5949 8.9697 15.7279 10.1027L16.0417 10.4165V12.7082H10ZM10 12.7082V17.7082"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PinDownIcon;
