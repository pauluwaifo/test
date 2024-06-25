import React from "react";
import { MkdPopover } from "Components/MkdPopover";
import { ChevronRightIcon } from "Assets/svgs";
import RenderActions from "./RenderActions";

const RenderDropdownActions = ({ action, actionKey, row, actionId }) => {
  return (
    <MkdPopover
      display={
        <span
          className={`flex  w-full cursor-pointer items-center justify-between gap-3 px-2 capitalize text-[#262626] hover:bg-[#F4F4F4]`}
        >
          <span className="flex grow gap-3">
            {action?.icon}
            {action?.children ?? actionKey}
          </span>
          <ChevronRightIcon />
        </span>
      }
      className={`w-full`}
      tooltipClasses="!rounded-[.5rem] w-full !min-w-[11rem] !px-0 !right-[3.25rem] !border bg-white"
      place={"left-start"}
      backgroundColor="#fff"
    >
      {action?.options && Object.keys(action?.options).length
        ? Object.keys(action?.options).map((key, keyIndex) => {
            return (
              <RenderActions
                key={keyIndex}
                action={action?.options[key]}
                actionId={actionId}
                row={row}
              />
            );
          })
        : null}
    </MkdPopover>
  );
};

export default RenderDropdownActions;
