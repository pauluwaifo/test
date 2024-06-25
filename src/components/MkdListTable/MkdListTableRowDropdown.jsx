import React from "react";
import { AiFillEye } from "react-icons/ai";
import { MkdPopover } from "Components/MkdPopover";
import { DropdownOption } from "Components/DropdownOptions";
import { KebabIcon, TrashIcon, EditIcon2, UpdateIcon } from "Assets/svgs";
import { optionTypes } from "Utils/utils";
import RenderDropdownActions from "./RenderDropdownActions";
import RenderActions from "./RenderActions";

const MkdListTableRowDropdown = ({
  row,
  columns,
  actions,
  actionId = "id",
  setDeleteId,
  onPopoverStateChange = null,
}) => {
  return (
    <>
      <div className="items center z-3 relative flex h-fit w-fit">
        <MkdPopover
          display={<KebabIcon className="rotate-90" />}
          tooltipClasses="!rounded-[.5rem] !min-w-[11rem] !px-0 !right-[3.25rem] !border bg-white"
          place={"left-end"}
          onPopoverStateChange={onPopoverStateChange}
        >
          {actions?.edit?.show && (
            <DropdownOption
              className="bg-white"
              icon={<EditIcon2 />}
              name={"Edit"}
              onClick={() => {
                if (actions?.edit?.action) {
                  actions?.edit?.action([row[actionId]]);
                }
              }}
            />
          )}

          {actions?.view?.show && (
            <DropdownOption
              icon={<AiFillEye className="text-gray-400" />}
              name={"View"}
              onClick={() => {
                if (actions?.view?.action) {
                  actions?.view?.action([row[actionId]]);
                }
              }}
            />
          )}

          {actions?.status?.show && (
            <DropdownOption
              icon={<UpdateIcon />}
              name={getStatusMap(statusRow, statusCol, row)}
              onClick={() => {
                if (actions?.status?.action) {
                  actions?.status?.action([row[actionId]]);
                }
              }}
            />
          )}

          {actions?.delete?.show && (
            <DropdownOption
              icon={<TrashIcon />}
              name={"Delete"}
              onClick={() => {
                if (!actions[key]?.action) {
                  if (setDeleteId) {
                    setDeleteId(row[actionId]);
                  }
                } else if (actions[key]?.action) {
                  actions[key]?.action([row[actionId]]);
                }
                // setDeleteId(row[actionId]);
              }}
            />
          )}

          {Object.keys(actions)
            .filter(
              (key) =>
                actions[key]?.show &&
                actions[key]?.locations &&
                actions[key]?.locations?.includes("dropdown")
            )
            .map((key, keyIndex) => {
              if (
                actions[key]?.type &&
                [optionTypes.DROPDOWN].includes(actions[key]?.type)
              ) {
                return (
                  <RenderDropdownActions
                    row={row}
                    key={keyIndex}
                    actionKey={key}
                    actionId={actionId}
                    action={actions[key]}
                  />
                );
              } else if (!actions[key]?.type) {
                return (
                  <RenderActions
                    row={row}
                    key={keyIndex}
                    actionId={actionId}
                    action={actions[key]}
                  />
                );
              }
            })}
        </MkdPopover>
      </div>
    </>
  );
};

export default MkdListTableRowDropdown;
