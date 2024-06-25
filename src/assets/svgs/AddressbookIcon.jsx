import React from "react";

const AddressbookIcon = ({
  className = "",
  stroke = "black",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0404 16.7083H1.79036C1.33013 16.7083 0.957031 16.3352 0.957031 15.875V15.4583C0.957031 14.9981 1.33013 14.625 1.79036 14.625H13.0404V1.29163H1.79036C1.33013 1.29163 0.957031 1.66472 0.957031 2.12496V15.6666M6.58203 6.70829H7.41536M5.1237 10.4583C5.1237 10.4583 5.1237 9.20829 6.9987 9.20829C8.8737 9.20829 8.8737 10.4583 8.8737 10.4583H5.1237ZM7.83203 6.70829C7.83203 7.16853 7.45894 7.54163 6.9987 7.54163C6.53846 7.54163 6.16536 7.16853 6.16536 6.70829C6.16536 6.24806 6.53846 5.87496 6.9987 5.87496C7.45894 5.87496 7.83203 6.24806 7.83203 6.70829Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddressbookIcon;
