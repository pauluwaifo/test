import React from "react";

const ChevronRightIcon = ({
  className = "",
  fill = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // d="M3.79587 4.99932L0.083374 1.28682L1.14387 0.226318L5.91687 4.99932L1.14387 9.77232L0.083374 8.71182L3.79587 4.99932Z"
        d="M3.796 4.99932L0.0834961 1.28682L1.144 0.226318L5.917 4.99932L1.144 9.77232L0.0834961 8.71182L3.796 4.99932Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronRightIcon;
