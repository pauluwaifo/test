import React from "react";

const BigPinIcon = ({
  className = "",
  stroke = "#F2AE40",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="52"
      height="54"
      viewBox="0 0 52 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2433_85533)">
        <rect x="2" width="48" height="48" rx="24" fill="#18181B" />
        <path
          d="M22.375 27.625L26.7983 32.0483C27.3375 32.5874 28.2575 32.349 28.4669 31.6159L30.3882 24.8915C30.4599 24.6405 30.6269 24.4275 30.8536 24.298L34.6133 22.1496C35.1858 21.8224 35.2905 21.0405 34.8243 20.5742L29.4258 15.1758C28.9596 14.7095 28.1776 14.8142 27.8505 15.3867L25.7021 19.1465C25.5725 19.3731 25.3595 19.5401 25.1085 19.6119L18.3842 21.5331C17.651 21.7426 17.4126 22.6626 17.9518 23.2017L22.375 27.625ZM22.375 27.625L22.3824 27.6176M22.375 27.625L17.75 32.25"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2433_85533"
          x="0"
          y="0"
          width="52"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="8"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_2433_85533"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.345098 0 0 0 0 0.360784 0 0 0 0 0.372549 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2433_85533"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2433_85533"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default BigPinIcon;
