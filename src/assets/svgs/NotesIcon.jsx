import React from "react";

const NotesIcon = ({
  className = "",
  fill = "#18181B",
  stroke = "black",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 17.25V13.25C12.25 12.6977 12.6977 12.25 13.25 12.25H17.25M5.75 5.75H12.25M5.75 9.75H8.25M17.25 12.5858V1.75C17.25 1.19772 16.8023 0.75 16.25 0.75H1.75C1.19772 0.75 0.75 1.19772 0.75 1.75V16.25C0.75 16.8023 1.19772 17.25 1.75 17.25H12.5858C12.851 17.25 13.1054 17.1446 13.2929 16.9571L16.9571 13.2929C17.1446 13.1054 17.25 12.851 17.25 12.5858Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotesIcon;
