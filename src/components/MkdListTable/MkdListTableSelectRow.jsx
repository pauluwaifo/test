import React, { Fragment } from "react";

const MkdListTableSelectRow = ({
  loading,
  columns = [],
  actions,
  currentTableData = [],
  areAllRowsSelected,
  handleSelectAll,
  handleSelectRow,
  actionId = "id",
  selectedIds,
}) => {
  return (
    <Fragment>
      {!loading && currentTableData?.length && columns.length ? (
        <>
          {[actions?.select?.show].includes(true) ||
          columns.find((item) => item?.accessor === "row") ? (
            <div className="">
              <div className="flex !h-[2.65rem] !max-h-[2.65rem] !min-h-[2.65rem] w-fit !bg-weak-100 ">
                {[actions?.select?.show].includes(true) ? (
                  <div
                    className={`!w-[2.65rem] !min-w-[2.65rem] !max-w-[2.65rem] cursor-pointer !bg-weak-100 px-[.75rem] py-[.5rem] text-sm font-[400] capitalize leading-[1.5rem] tracking-wider text-sub-500`}
                  >
                    {actions?.select?.multiple ? (
                      <input
                        type="checkbox"
                        disabled={!actions?.select?.multiple}
                        id="select_all_rows"
                        className={`focus:shadow-outline mr-1 !h-4 !w-4 cursor-pointer appearance-none rounded border leading-tight text-primary shadow focus:outline-none focus:ring-0`}
                        checked={areAllRowsSelected}
                        onChange={handleSelectAll}
                      />
                    ) : null}
                  </div>
                ) : null}
                {columns.find((item) => item.accessor === "row") ? (
                  <div
                    className={`flex !w-[2.65rem] !min-w-[2.65rem] !max-w-[2.65rem] cursor-pointer justify-center !bg-weak-100 py-[.5rem] text-sm font-[400] capitalize leading-[1.5rem] tracking-wider text-sub-500 `}
                  >
                    Row
                  </div>
                ) : null}
              </div>

              {currentTableData?.map((rowData, rowDataIndex) => {
                return (
                  <div
                    className=" flex !h-[3rem] !max-h-[3rem] !min-h-[3rem] border-b"
                    key={rowDataIndex}
                  >
                    {[actions?.select?.show].includes(true) && (
                      <div
                        className={` !h-full !max-h-full !min-h-full !w-[2.65rem] !min-w-[2.65rem] !max-w-[2.65rem] cursor-pointer px-[.75rem] py-[.5rem] text-sm font-[400] capitalize leading-[1.5rem] tracking-wider text-sub-500`}
                      >
                        <input
                          type="checkbox"
                          // disabled={!actions?.select?.multiple}
                          className={`focus:shadow-outline mr-1 !h-4 !w-4 cursor-pointer appearance-none rounded border leading-tight text-primary shadow focus:outline-none focus:ring-0`}
                          name="select_item"
                          checked={selectedIds.includes(rowData[actionId])}
                          onChange={() => handleSelectRow(rowData[actionId])}
                        />
                      </div>
                    )}
                    {columns.find((item) => item.accessor === "row") ? (
                      <div
                        className={`flex h-full !w-[2.65rem] !min-w-[2.65rem] !max-w-[2.65rem] items-center whitespace-nowrap px-[.75rem] py-[.5rem] text-sm`}
                      >
                        {rowDataIndex + 1}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      ) : null}
    </Fragment>
  );
};

export default MkdListTableSelectRow;
