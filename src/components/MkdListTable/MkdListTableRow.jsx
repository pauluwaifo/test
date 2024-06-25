import React from "react";
import { MdPhoto } from "react-icons/md";
import { MkdPopover } from "Components/MkdPopover";
import { NotesIcon } from "Assets/svgs";

import { truncate, processList, mappingValues } from "Utils/utils";
import { GlobalContext } from "Context/Global";
import { AuthContext } from "Context/Auth";
import { SkeletonLoader } from "Components/Skeleton";

const statusNames = {
  status: "status",
  verify: "verify",
  receipt_status: "receipt_status",
};

const MkdListTableRow = ({
  column = null,
  actions,
  tableRole = "",
  actionPostion = [],
  actionId = "id",
  handleTableCellChange,
  selectedIds = [],
  handleSelectRow,
  columnIndex,
  allowEditing,
  onPopoverStateChange = null,
  columns = [],
  row,
  currentTableData = [],
  expandRow = false,
}) => {
  const { dispatch } = React.useContext(AuthContext);
  const {
    dispatch: globalDispatch,
    state: {},
  } = React.useContext(GlobalContext);

  const [listResult, setResult] = React.useState(null);

  const showWithLimit = (column) => {
    if (expandRow) {
      if (["string", "number"].includes(typeof listResult)) {
        return (
          <span
            className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
          >
            {listResult}
          </span>
        );
      }

      if (typeof listResult === "object" && Array.isArray(listResult)) {
        return (
          <>
            {listResult.map((item, itemKey) => {
              return (
                <span
                  className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
                  key={itemKey}
                >
                  {item}
                </span>
              );
            })}
          </>
        );
      }
    } else {
      if (["string", "number"].includes(typeof listResult)) {
        return (
          <span
            className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
          >
            {listResult}
          </span>
        );
      }
      if (typeof listResult === "object" && Array.isArray(listResult)) {
        const lengthToHide =
          listResult.length > column.limit
            ? `+${listResult.length - column?.limit}`
            : null;
        const itemsToShow = listResult
          .map((item, index) => {
            if (index + 1 <= column.limit) {
              return item;
            }
          })
          .filter(Boolean);

        if (lengthToHide) itemsToShow.push(lengthToHide);

        return (
          <>
            {itemsToShow.map((item, itemKey) => {
              return (
                <span
                  className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
                  key={itemKey}
                >
                  {item}
                </span>
              );
            })}
          </>
        );
      }
    }
  };

  const getColumnListData = async (value, column) => {
    // TO DO the processList function
    const result = await processList(value, column, globalDispatch, dispatch);
    if (["string", "number"].includes(typeof result)) {
      setResult(result);
    }

    if (typeof result === "object" && Array.isArray(result)) {
      setResult(() => [...result]);
    }
  };

  React.useEffect(() => {
    if (column?.list && !listResult) {
      getColumnListData(row[column?.accessor], column);
    }
  }, [column?.accessor]);

  return (
    <div
      className={`!h-[3rem] !max-h-[3rem] !min-h-[3rem] w-full min-w-full max-w-fit whitespace-nowrap !border-b  border-soft-200 bg-white px-[.75rem] py-[.5rem] ${
        columnIndex === 0 ? "border-l border-r" : "border-r"
      }`}
    >
      {column?.accessor?.indexOf("image") > -1 ||
      (column?.accessor?.indexOf("photo") > -1 && column?.selected_column) ? (
        <LazyLoad>
          <MkdPopover
            display={<MdPhoto className="peer " />}
            openOnClick={false}
            zIndex={999999999999999}
            onPopoverStateChange={onPopoverStateChange}
            place="left-end"
            tooltipClasses={`whitespace-nowrap h-fit min-h-[1rem] max-h-fit w-[18.75rem] !rounded-lg border border-[#a8a8a8] !bg-white p-2 text-sm text-[#525252] shadow-md`}
          >
            <LazyLoad
              className={`h-[18.75rem] w-[18.75rem] whitespace-nowrap !rounded-lg border border-[#a8a8a8] !bg-white p-2 text-sm text-[#525252] shadow-md`}
            >
              <img
                src={row[column?.accessor]}
                className="w-[18.75rem]"
                alt=""
              />
            </LazyLoad>
          </MkdPopover>
        </LazyLoad>
      ) : (column?.accessor?.indexOf("pdf") > -1 ||
          column?.accessor?.indexOf("doc") > -1 ||
          column?.accessor?.indexOf("file") > -1 ||
          column?.accessor?.indexOf("video") > -1) &&
        column?.selected_column ? (
        <a
          className="text-blue-500"
          target="_blank"
          href={row[column?.accessor]}
          rel="noreferrer"
        >
          {" "}
          View
        </a>
      ) : column?.join && column?.selected_column ? (
        <>
          {row[column?.join] && row[column?.join][column?.accessor]
            ? row[column?.join][column?.accessor]
            : null}
        </>
      ) : column?.mappingExist &&
        ["status", "role", "verify", "receipt_status"].includes(
          column?.accessor
        ) &&
        !["admin"].includes(tableRole) &&
        column?.selected_column ? (
        <span
          style={{
            backgroudColor: column?.mappings[row[column?.accessor]]?.bg,
            color: column?.mappings[row[column?.accessor]]?.color,
          }}
          className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
        >
          {mappingValues[
            column?.mappings[row[column?.accessor]]?.toLowerCase()
          ] ?? column?.mappings[row[column?.accessor]]}
        </span>
      ) : column?.mappingExist &&
        allowEditing &&
        ["admin"].includes(tableRole) &&
        column?.selected_column ? (
        <select
          // onChange={(e) =>
          //   handleTableCellChange(
          //     row[actionId],
          //     e.target.value,
          //     i,
          //     column?.accessor
          //   )
          // }
          value={row[column?.accessor]}
        >
          {Object.keys(column?.mappings).map((columnDataKey, index) => (
            <option
              key={index}
              value={columnDataKey}
              selected={columnDataKey === row[column?.accessor]}
            >
              {column?.mappings[columnDataKey]}
            </option>
          ))}
        </select>
      ) : column?.mappingExist &&
        !allowEditing &&
        ["admin"].includes(tableRole) &&
        column?.selected_column ? (
        <span
          style={{
            backgroundColor: column?.mappings[row[column?.accessor]]?.bg,
            color: column?.mappings[row[column?.accessor]]?.color,
          }}
          className={`flex w-fit items-center justify-normal gap-[.25rem] rounded-[.375rem] border border-soft-200  p-[.25rem_.5rem_.25rem_.25rem] capitalize`}
        >
          {mappingValues[
            column?.mappings[row[column?.accessor]]?.toLowerCase()
          ] ?? column?.mappings[row[column?.accessor]]}
        </span>
      ) : !column?.mappingExist &&
        column?.accessor !== "id" &&
        column?.accessor !== "create_at" &&
        column?.accessor !== "update_at" &&
        column?.accessor !== "user_id" &&
        column?.accessor !== "" &&
        allowEditing &&
        column?.selected_column ? (
        <input
          className="text-ellipsis border-0"
          type="text"
          value={row[column?.accessor]}
          //  onChange={(e) =>
          //    handleTableCellChange(
          //      row[actionId],
          //      e.target.value,
          //      i,
          //      column?.accessor
          //    )
          //  }
        />
      ) : column?.truncate && column?.selected_column ? (
        <>{truncate(row[column?.accessor], 50)}</>
      ) : column?.replace && column?.selected_column ? (
        <>{truncate(row[column?.accessor], 30)}</>
      ) : column?.list && column?.selected_column ? (
        <>
          {listResult ? (
            <div className="flex items-center gap-2">
              {showWithLimit(column)}
            </div>
          ) : (
            <SkeletonLoader
              count={1}
              counts={[2]}
              className={`!h-[2rem] !gap-0 rounded-[.625rem] !bg-[#ebebeb] !p-0`}
            />
          )}
        </>
      ) : column?.isCurrency && column?.selected_column ? (
        <>
          {column?.currency}
          {row[column?.accessor]}
        </>
      ) : ["notes"].includes(column?.accessor) && column?.selected_column ? (
        <button type="button" className="flex items-center gap-2 ">
          <NotesIcon className="h-[1.0313rem] w-[1.0313rem]" />
          View
        </button>
      ) : column?.accessor !== "" && column?.selected_column ? (
        <>
          {typeof row[column?.accessor] === "object"
            ? null
            : row[column?.accessor]}
        </>
      ) : null}
    </div>
  );
};

export default MkdListTableRow;
