import React from "react";

const WarningIcon = ({
  className = "",
  stroke = "black",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00053 7.12508V10.0417M9.00053 12.1251V12.1167M8.28147 1.68609L1.19365 13.7872C0.868261 14.3428 1.2689 15.0417 1.91272 15.0417H16.0884C16.7322 15.0417 17.1328 14.3428 16.8074 13.7872L9.71961 1.68609C9.39772 1.13654 8.60335 1.13654 8.28147 1.68609ZM9.20887 12.1251C9.20887 12.2401 9.11559 12.3334 9.00053 12.3334C8.88548 12.3334 8.7922 12.2401 8.7922 12.1251C8.7922 12.01 8.88548 11.9167 9.00053 11.9167C9.11559 11.9167 9.20887 12.01 9.20887 12.1251Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WarningIcon;
