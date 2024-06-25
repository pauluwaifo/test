import React from "react";

const CombineIcon = ({
  className = "",
  stroke = "white",
  fill = "none",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.49694 8L1.75611 9.86137C1.13664 10.1696 1.13664 11.0593 1.75611 11.3676L8.63042 14.7881C8.86326 14.904 9.13641 14.904 9.36926 14.7881L16.2436 11.3676C16.863 11.0593 16.863 10.1696 16.2436 9.86138L12.5027 8M5.49694 8L1.75611 6.13862C1.13664 5.83039 1.13664 4.94067 1.7561 4.63243L8.63041 1.2119C8.86326 1.09603 9.13641 1.09603 9.36926 1.2119L16.2436 4.63243C16.863 4.94067 16.863 5.83039 16.2436 6.13862L12.5027 8M5.49694 8L8.63041 9.55916C8.86326 9.67502 9.13641 9.67502 9.36926 9.55916L12.5027 8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CombineIcon;
