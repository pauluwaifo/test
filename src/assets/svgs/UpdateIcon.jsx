import React from "react";

const UpdateIcon = ({
  className = "",
  stroke = "#717179",
  fill = "none",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5834 1.29163L14.7888 3.497C14.9515 3.65972 14.9515 3.92354 14.7888 4.08625L12.5834 6.29163M3.41677 16.7083L1.21139 14.5029C1.04868 14.3402 1.04868 14.0764 1.21139 13.9137L3.41677 11.7083M2.3751 14.2083H14.0418C14.502 14.2083 14.8751 13.8352 14.8751 13.375V10.0416M1.1251 7.54163V4.62496C1.1251 4.16472 1.4982 3.79163 1.95843 3.79163H13.6251"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpdateIcon;
