import React from "react";

const DoubleChevronRightIcon = ({
  className = "",
  fill = "#18181B",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.97517 5.00069L5.66468 0.690186L4.6826 1.67228L8.011 5.00069L4.6826 8.32909L5.66468 9.31118L9.97517 5.00069ZM6.05162 5.00069L1.74112 0.690186L0.759033 1.67228L4.08746 5.00069L0.759033 8.32909L1.74112 9.31118L6.05162 5.00069Z"
        fill={fill}
      />
    </svg>
  );
};

export default DoubleChevronRightIcon;
