import React from "react";
import { StringCaser, optionTypes } from "Utils/utils";
import { AddButton } from "Components/AddButton";
import { ChevronRightIcon, ExCircleIcon } from "Assets/svgs";
import { MkdPopover } from "Components/MkdPopover";
import { DropdownOption } from "Components/DropdownOptions";

const OverlayTableActions = ({ actions, selectedItems }) => {
  return (
    <div className="fixed inset-x-0 bottom-5 m-auto flex !h-[3.25rem] !max-h-[3.25rem] w-fit items-center justify-start gap-2 rounded-[.875rem] bg-black px-[.75rem] pb-[.5rem] pt-[.5rem]">
      <div className="font-inter text-white">
        Selected: {selectedItems.length}
      </div>
      {Object.keys(actions).filter(
        (key) =>
          actions[key]?.show &&
          actions[key]?.locations &&
          actions[key]?.locations?.includes("overlay")
      )?.length ? (
        <>
          {Object.keys(actions)
            .filter(
              (key) =>
                actions[key]?.show &&
                actions[key]?.locations &&
                actions[key]?.locations?.includes("overlay")
            )
            .map((key, keyIndex) => {
              if (
                actions[key]?.type &&
                [optionTypes.DROPDOWN].includes(actions[key]?.type)
              ) {
                return (
                  <RenderButtonDropdownActions
                    action={actions[key]}
                    actionKey={key}
                    selectedItems={selectedItems}
                    key={keyIndex}
                  />
                );
              } else if (!actions[key]?.type) {
                return (
                  <RenderButtons
                    action={actions[key]}
                    actionKey={key}
                    selectedItems={selectedItems}
                    key={keyIndex}
                  />
                );
              }
            })
            .filter(Boolean)}
        </>
      ) : null}
    </div>
  );
};

export default OverlayTableActions;

const RenderButtonDropdownActions = ({ action, actionKey, selectedItems }) => {
  return (
    <MkdPopover
      display={
        <span
          className={`hover:text[#262626] relative flex h-[3rem] w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-[.625rem] border !border-white-200 border-primary !bg-white-100 bg-primary px-2  py-2 font-inter text-sm font-medium capitalize  leading-loose tracking-wide  text-white hover:bg-[#F4F4F4]`}
        >
          <span className="flex grow items-center justify-start gap-3 text-white">
            {action?.icon}
            {action?.children ?? actionKey}
          </span>
          <ChevronRightIcon className="-rotate-90" />
        </span>
      }
      zIndex={999}
      className={`w-full`}
      tooltipClasses="!rounded-[.5rem] !text-white w-full !min-w-[11rem] !px-0 !right-[3.25rem] !border"
      place={"top-start"}
      backgroundColor="#18181B"
    >
      {action?.options && Object.keys(action?.options).length
        ? Object.keys(action?.options).map((key, keyIndex) => {
            return (
              <RenderButtonActions
                key={keyIndex}
                action={action?.options[key]}
                selectedItems={selectedItems}
              />
            );
          })
        : null}
    </MkdPopover>
  );
};

const RenderButtonActions = ({ action, selectedItems }) => {
  return (
    <DropdownOption
      name={action?.children ?? key}
      // key={keyIndex}
      className="!text-white hover:!bg-white-100 "
      icon={action?.icon}
      onClick={() => {
        if (action?.action) {
          action?.action(selectedItems);
        }
      }}
    />
  );
};

const RenderButtons = ({ selectedItems, action, actionKey }) => {
  if (selectedItems && selectedItems?.length === 1 && !action?.multiple) {
    return (
      <AddButton
        showPlus={false}
        loading={action?.loading ?? false}
        disabled={action?.disabled ?? false}
        icon={action?.icon ?? null}
        className={`flex cursor-pointer gap-2 !border-white-200 !bg-white-100 px-2 py-2 text-lg  font-medium leading-loose tracking-wide ${
          actionKey === "view"
            ? "text-blue-500"
            : actionKey === "delete"
            ? "!text-red-500"
            : "text-[#292829fd]"
        } hover:underline`}
        onClick={() => {
          if (action?.action) {
            console.log("actionKey >>", actionKey);
            action.action(selectedItems);
          }
        }}
      >
        {actionKey === "delete" ? <ExCircleIcon /> : null}
        {action.children ? (
          action.children
        ) : (
          <>
            {StringCaser(actionKey === "delete" ? "Remove" : actionKey, {
              casetype: "capitalize",
              separator: " ",
            })}
          </>
        )}
      </AddButton>
    );
  }
  if (selectedItems && selectedItems?.length >= 1 && action?.multiple) {
    return (
      <AddButton
        actionKey={actionKey}
        showPlus={false}
        loading={action?.loading ?? false}
        disabled={action?.disabled ?? false}
        icon={action?.icon ?? null}
        className={`cursor-pointer gap-2 !border-white-200 !bg-white-100 px-2 py-2 text-lg  font-medium leading-loose tracking-wide ${
          actionKey === "view"
            ? "text-blue-500"
            : actionKey === "delete"
            ? "!text-red-500"
            : "text-[#292829fd]"
        } hover:underline`}
        onClick={() => {
          if (action?.action) {
            console.log("actionKey >>", actionKey);
            action.action(selectedItems);
          }
        }}
      >
        {actionKey === "delete" ? <ExCircleIcon /> : null}
        {action.children ? (
          action.children
        ) : (
          <>
            {StringCaser(actionKey === "delete" ? "Remove" : actionKey, {
              casetype: "capitalize",
              separator: " ",
            })}
          </>
        )}
      </AddButton>
    );
  }
};
