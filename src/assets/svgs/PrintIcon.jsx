import React from "react";

const PrintIcon = ({
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
        d="M6.70866 7.95817H4.62533M4.62533 10.4582V15.8748C4.62533 16.3351 4.99842 16.7082 5.45866 16.7082H12.542C13.0022 16.7082 13.3753 16.3351 13.3753 15.8748V10.4582M4.62533 10.4582H13.3753M4.62533 10.4582V13.3748H2.12533C1.66509 13.3748 1.29199 13.0017 1.29199 12.5415V5.45817C1.29199 4.99793 1.66509 4.62484 2.12533 4.62484H15.8753C16.3356 4.62484 16.7087 4.99793 16.7087 5.45817V12.5415C16.7087 13.0017 16.3356 13.3748 15.8753 13.3748H13.3753V10.4582M5.45866 1.2915H12.542C13.0022 1.2915 13.3753 1.6646 13.3753 2.12484V4.62484H4.62533V2.12484C4.62533 1.6646 4.99842 1.2915 5.45866 1.2915Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PrintIcon;
