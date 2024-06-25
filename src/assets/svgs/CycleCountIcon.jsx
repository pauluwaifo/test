import React from "react";

const CycleCountIcon = ({
  className = "",
  fill = "#18181B",
  stroke = "white",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.7915 1.5C5.17222 1.5 6.2915 2.61929 6.2915 4C6.2915 5.38071 5.17222 6.5 3.7915 6.5C2.41079 6.5 1.2915 5.38071 1.2915 4C1.2915 2.61929 2.41079 1.5 3.7915 1.5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M14.2082 1.5C15.5889 1.5 16.7082 2.61929 16.7082 4C16.7082 5.38071 15.5889 6.5 14.2082 6.5C12.8275 6.5 11.7082 5.38071 11.7082 4C11.7082 2.61929 12.8275 1.5 14.2082 1.5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M11.4998 9.20833C11.4998 10.589 10.3805 11.7083 8.99984 11.7083C7.61913 11.7083 6.49984 10.589 6.49984 9.20833C6.49984 7.82762 7.61913 6.70833 8.99984 6.70833C10.3805 6.70833 11.4998 7.82762 11.4998 9.20833Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default CycleCountIcon;
