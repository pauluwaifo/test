import React from "react";

const DuplicateIcon = ({
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
        d="M6.2915 6.29175V1.70841C6.2915 1.4783 6.47805 1.29175 6.70817 1.29175H16.2915C16.5216 1.29175 16.7082 1.4783 16.7082 1.70841V11.2917C16.7082 11.5219 16.5216 11.7084 16.2915 11.7084H11.7082M11.2915 6.29175H1.70817C1.47805 6.29175 1.2915 6.4783 1.2915 6.70841V16.2917C1.2915 16.5219 1.47805 16.7084 1.70817 16.7084H11.2915C11.5216 16.7084 11.7082 16.5219 11.7082 16.2917V6.70841C11.7082 6.4783 11.5216 6.29175 11.2915 6.29175Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DuplicateIcon;
