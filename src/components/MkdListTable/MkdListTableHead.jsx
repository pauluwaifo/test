import React from "react";
import { NarrowUpArrowIcon } from "Assets/svgs";
import { SkeletonLoader } from "Components/Skeleton";

const MkdListTableHead = ({ onSort, columns }) => {
  return (
    <>
      <tr className="flex !h-[2.25rem] !max-h-[2.25rem] !min-h-[2.25rem] overflow-hidden">
        {!columns?.length ? (
          <th scope="col" className={`!w-full !min-w-full !max-w-full `}>
            <SkeletonLoader
              count={1}
              counts={[1]}
              className="!m-0 !h-full !p-0"
            />
          </th>
        ) : null}
        {columns.map((column, i) => {
          if (column?.accessor !== "" && column?.selected_column) {
            return (
              <th
                key={i}
                scope="col"
                className={`flex !w-[6.25rem] !min-w-[6.25rem] max-w-[auto] shrink-0 grow cursor-pointer justify-start px-[.75rem] py-[.5rem] text-left text-sm font-[400] capitalize leading-[1.5rem] tracking-wider text-sub-500 ${
                  column.isSorted ? "cursor-pointer" : ""
                } `}
                onClick={column.isSorted ? () => onSort(i) : undefined}
              >
                <div className="flex !w-auto !min-w-fit max-w-[auto] shrink-0  items-center justify-start gap-2">
                  {column.header}
                  <span className="shrink-0">
                    {column.isSorted ? (
                      <NarrowUpArrowIcon
                        className={`h-2 w-2 ${
                          column.isSortedDesc ? "rotate-180" : ""
                        }`}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </th>
            );
          }
        })}
      </tr>
    </>
  );
};

export default MkdListTableHead;
