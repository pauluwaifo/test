import React, { useId, useState } from "react";
import classes from "./AddButton.module.css";
import MoonLoader from "react-spinners/MoonLoader";

const AddButton = ({
  onClick,
  children = "Add New",
  showPlus = true,
  className,
  showChildren = true,
  loaderclasses,
  color = "#ffffff",
  loading = false,
  disabled = false,
  icon = null,
  title,
}) => {
  const override = {
    borderColor: "#ffffff",
  };
  const id = useId();
  const [animate, setAnimate] = useState(false);

  const onClickHandle = () => {
    if (onClick) {
      onClick();
    }
    setAnimate(true);
  };
  // const classes = ` after:bg-[#90EE90] after:block after:absolute after:pt-[300%] after:pl-[350%] after:!ml-[-1.25rem] after:mt-[-120%] after:opacity-0 after:transition-all active:after:p-0 active:after:m-0 active:after:opacity-100 `;
  return (
    <button
      title={title}
      disabled={disabled}
      type="button"
      onAnimationEnd={() => setAnimate(false)}
      onClick={onClickHandle}
      className={`${animate && "animate-wiggle"} ${
        classes.button
      } relative flex h-[3rem] cursor-pointer  items-center justify-center gap-2 overflow-hidden rounded-[.625rem] border border-[#4F46E5] bg-[#4F46E5] px-[.625rem] py-2 font-inter text-sm font-medium leading-loose tracking-wide text-white ${className}`}
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
        {!loading && icon ? icon : null}
        {/* {showPlus ? "+" : null} */}
        {showChildren ? children : null}
      </>
    </button>
  );
};

export default AddButton;
