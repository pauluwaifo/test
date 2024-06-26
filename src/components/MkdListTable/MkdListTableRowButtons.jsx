import React from "react";
import { AddButton } from "Components/AddButton";
import { processBind } from "./MkdListTableBindOperations";

const MkdListTableRowDropdown = ({
  row,
  columns,
  actions,
  actionId = "id",
  setDeleteId = null,
}) => {
  return (
    <>
      <div className="z-3 relative flex h-fit w-fit items-center gap-2">
        {Object.keys(actions)
          .filter(
            (key) =>
              actions[key]?.locations &&
              actions[key]?.locations?.includes("buttons")
          )
          .map((key, keyIndex) => {
            if (actions[key]?.bind) {
              switch (actions[key]?.bind?.action) {
                case "hide":
                  if (!processBind(actions[key], row)) {
                    return (
                      <AddButton
                        key={keyIndex}
                        title={actions[key]?.children ?? key}
                        onClick={() => {
                          if (["delete"].includes(key)) {
                            if (setDeleteId) {
                              setDeleteId(row[actionId]);
                            }
                          } else if (actions[key]?.action) {
                            actions[key]?.action([row[actionId]]);
                          }
                        }}
                        className={`!h-[2rem] !w-[2.0713rem] !border-gray-200 !bg-white`}
                      >
                        {actions[key]?.icon
                          ? actions[key]?.icon
                          : actions[key]?.children ?? key}
                      </AddButton>
                    );
                  }
              }
            }
            if (!actions[key]?.bind) {
              return (
                <AddButton
                  key={keyIndex}
                  title={actions[key]?.children ?? key}
                  onClick={() => {
                    if (["delete"].includes(key) && !actions[key]?.action) {
                      if (setDeleteId) {
                        setDeleteId(row[actionId]);
                      }
                    } else if (actions[key]?.action) {
                      actions[key]?.action([row[actionId]]);
                    }
                    // if (actions[key]?.action) {
                    //   actions[key]?.action([row[actionId]]);
                    // }
                  }}
                  className={`!h-[2rem] !w-[2.0713rem] !border-gray-200 !bg-white`}
                >
                  {actions[key]?.icon
                    ? actions[key]?.icon
                    : actions[key]?.children ?? key}
                </AddButton>
              );
            }
          })}
      </div>
    </>
  );
};

export default MkdListTableRowDropdown;
