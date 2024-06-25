import React from "react";
import { DropdownOption } from "Components/DropdownOptions";
import { processBind } from "./MkdListTableBindOperations";

const RenderActions = ({ action, row, actionId, key }) => {
  if (action?.bind) {
    switch (action?.bind?.action) {
      case "hide":
        if (!processBind(action, row)) {
          return (
            <DropdownOption
              name={action?.children ?? key}
              // key={keyIndex}
              className="hover:!bg-white-100 "
              icon={action?.icon}
              onClick={() => {
                if (action?.action) {
                  action?.action([row[actionId]]);
                }
              }}
            />
          );
        }
    }
  }
  if (!action?.bind) {
    return (
      <DropdownOption
        name={action?.children ?? key}
        // key={keyIndex}
        className="hover:!bg-white-100 "
        icon={action?.icon}
        onClick={() => {
          if (action?.action) {
            action?.action([row[actionId]]);
          }
        }}
      />
    );
  }
};

export default RenderActions;
