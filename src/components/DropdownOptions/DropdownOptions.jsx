import React from "react";
import { KebabIcon } from "Assets/svgs";

const DropdownOptions = ({
  icon,
  children,
  childrenWrapperClass = "",
  iconWrapperClass = "",
  className = "",
  style = {},
}) => {
  return (
    <div
      style={{ ...style }}
      className={`relative flex items-center justify-center ${className}`}
    >
      <button className={`peer relative ${iconWrapperClass}`}>
        {icon ? icon : <KebabIcon />}
      </button>
      <div
        className={`absolute right-0 top-[85%] z-[9999999999] m-auto hidden  whitespace-nowrap rounded-lg border border-[#a8a8a8] bg-white text-sm text-[#525252] shadow-md hover:block focus:block peer-focus:block peer-focus-visible:block ${childrenWrapperClass} `}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownOptions;
