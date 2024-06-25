import React, { useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./MkdPopover.css";

const MkdPopover = ({
  display,
  className,
  children,
  tooltipClasses,
  place = "bottom",
  openOnClick = true,
  zIndex = 99999,
  onPopoverStateChange,
  backgroundColor = "#fff",
  textColor = "#000",
}) => {
  const tooltipId = useId();
  const handleTooltipShow = () => {
    if (onPopoverStateChange) {
      onPopoverStateChange(true);
    }
  };

  const handleTooltipHide = () => {
    if (onPopoverStateChange) {
      onPopoverStateChange(false);
    }
  };

  return (
    <>
      <div className="App">
        <button
          type="button"
          data-tooltip-id={tooltipId}
          className={`${className}`}
        >
          {display ? display : null}
          {/* <AlertCircle className="rotate-180" /> */}
        </button>
      </div>
      <ReactTooltip
        // globalCloseEvents={{ scroll: true }}
        id={tooltipId}
        openOnClick={openOnClick}
        style={{ backgroundColor, color: textColor, zIndex: zIndex }}
        className={`z-[${zIndex}] ${tooltipClasses} !shadow-md`}
        clickable
        place={place}
        effect="solid"
        afterShow={handleTooltipShow}
        afterHide={handleTooltipHide}
        // getTextColor={() => textColor}
      >
        {children}
      </ReactTooltip>
    </>
  );
};

export default MkdPopover;
