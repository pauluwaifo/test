import React from "react";

const DropdownOption = ({
  icon,
  onClick = () => {},
  name,
  style = {},
  className = "",
}) => {
  return (
    <div
      style={{ ...style }}
      className={`flex h-[2.25rem] max-h-[2.25rem] min-h-[2.25rem] w-full cursor-pointer items-center gap-3 px-2 capitalize text-[#262626] hover:bg-[#F4F4F4] hover:text-[#262626] ${className}`}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {icon && <span className=""> {icon}</span>}
      {name && <span className="grow"> {name}</span>}
    </div>
  );
};

export default DropdownOption;
