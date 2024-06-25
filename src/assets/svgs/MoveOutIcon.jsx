import React from "react";

const MoveOutIcon = ({
  className = "",
  stroke = "#717179",
  fill = "none",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.2915 4.45841V13.2084C1.2915 13.6687 1.6646 14.0417 2.12484 14.0417H15.0415M12.9582 1.54175L15.8748 4.45841M15.8748 4.45841L12.9582 7.37508M15.8748 4.45841H9.62484C7.32365 4.45841 5.45817 6.32389 5.45817 8.62508V9.45841"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoveOutIcon;
