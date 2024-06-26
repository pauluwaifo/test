import React, { memo, useId } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import classes from "./InteractiveButton.module.css";

const InteractiveButton = ({
  loading = false,
  disabled,
  children,
  type = "button",
  className,
  loaderclasses,
  onClick,
  color = "#ffffff",
}) => {
  const override = {
    borderColor: "#ffffff",
  };
  const id = useId();
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${classes.button} relative flex h-[3rem] cursor-pointer items-center justify-center gap-5 overflow-hidden rounded-[.625rem] border border-[#4F46E5]  bg-[#4F46E5] px-[.625rem] py-[.5625rem] text-sm font-medium leading-none text-white ${className}`}
      onClick={onClick}
    >
      <>
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={14}
          className={loaderclasses}
          // aria-label="Loading Spinner"
          data-testid={id}
        />

        {children ? <span>{children}</span> : null}
      </>
    </button>
  );
};

export default memo(InteractiveButton);
