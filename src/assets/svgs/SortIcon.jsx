import React from "react";

const SortIcon = ({
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
      height="16"
      viewBox="0 0 18 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.70703 4.25L4.59842 1.35861C4.8425 1.11453 5.23823 1.11453 5.48231 1.35861L8.3737 4.25M9.6237 11.75L12.5151 14.6414C12.7592 14.8855 13.1549 14.8855 13.399 14.6414L16.2904 11.75M5.04036 2.16667L5.04036 14.875M12.957 1.125L12.957 14.0417"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SortIcon;
