import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { DotIcon, KebabIcon, NarrowUpArrowIcon, Spinner } from "Assets/svgs";
import { SkeletonLoader } from "Components/Skeleton";
import { NoDataFoundImg } from "Assets/images";
import MkdListTableSelectRow from "./MkdListTableSelectRow";
import MkdListTableRightActionPanel from "./MkdListTableRightActionPanel";
import MkdListTableRow from "./MkdListTableRow";

const MkdListTable = ({
  table,
  tableTitle,
  onSort,
  loading,
  columns = [],
  actions,
  actionPostion = [],
  tableRole,
  deleteItem,
  deleteLoading,
  actionId = "id",
  showDeleteModal,
  currentTableData = [],
  setShowDeleteModal,
  handleTableCellChange,
  setSelectedItems,
  allowEditing,
  useImage = true,
  columnData = null,
  setColumns = null,
  setColumnData = null,
  allowSortColumns = true,
  onPopoverStateChange = null,
  popoverShown = false,
}) => {
  const [deleteId, setIdToDelete] = React.useState(null);
  const [isOneOrMoreRowSelected, setIsOneOrMoreRowSelected] =
    React.useState(false);
  const [areAllRowsSelected, setAreAllRowsSelected] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [fromKey, setFromKey] = React.useState(null);
  const [toKey, setToKey] = React.useState(null);

  function handleSelectRow(id) {
    setIsOneOrMoreRowSelected(true);
    const tempIds = selectedIds;

    if (actions?.select?.multiple) {
      if (tempIds.includes(id)) {
        const newIds = tempIds.filter((selectedId) => selectedId !== id);
        setSelectedIds(() => [...newIds]);
        setSelectedItems(newIds);
      } else {
        const newIds = [...tempIds, id];
        setSelectedIds(() => [...newIds]);
        setSelectedItems(newIds);
      }
    } else {
      if (tempIds.includes(id)) {
        const newIds = tempIds.filter((selectedId) => selectedId !== id);
        setSelectedIds(() => [...newIds]);
        setSelectedItems(newIds);
      } else {
        const newIds = [id];
        setSelectedIds(() => [...newIds]);
        setSelectedItems(newIds);
      }
    }
    console.log(id);
  }

  const handleSelectAll = () => {
    setAreAllRowsSelected((prevSelectAll) => !prevSelectAll);
    if (!areAllRowsSelected) {
      const allIds = currentTableData.map((item) => item[actionId]);
      setSelectedIds(allIds);
      setSelectedItems(allIds);
    } else {
      setSelectedIds([]);
      setSelectedItems([]);
    }
  };

  const handleDeleteAll = async (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  const navigate = useNavigate();

  const setDeleteId = async (id) => {
    console.log("id >>", id);
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  const onDragStart = (e, key) => {
    if (!allowSortColumns) return;
    // e.preventDefault();
    // console.log("onDragStart");
    setFromKey(key);
    setDragging(true);
  };
  const onDrop = (e) => {
    if (!allowSortColumns) return;
    e.preventDefault();
    if (fromKey && toKey && fromKey != toKey) {
      const tempColumns = [...columns];
      const fromColumn = tempColumns[fromKey];
      const toColumn = tempColumns[toKey];

      tempColumns.splice(fromKey, 1);
      tempColumns.splice(toKey, 0, fromColumn);
      if (setColumns) {
        setColumns(() => tempColumns);
      }
    }
    setToKey(null);
    setFromKey(null);
    setDragging(false);
  };
  const onDragOver = (e, key) => {
    if (!allowSortColumns) return;
    e.preventDefault();

    setToKey(key);
    // if (fromKey != key) {
    // }
  };
  const onDragEnter = (e) => {
    if (!allowSortColumns) return;
    e.preventDefault();
  };
  const onDragEnd = (e) => {
    if (!allowSortColumns) return;
    e.preventDefault();
    setToKey(null);
    setFromKey(null);
    // console.log("onDragEnd");

    setDragging(false);
  };
  const onDragLeave = (e) => {
    if (!allowSortColumns) return;
    e.preventDefault();
    setToKey(null);
    // setFromKey(null);
  };

  React.useEffect(() => {
    if (selectedIds.length <= 0) {
      setIsOneOrMoreRowSelected(false);
      setAreAllRowsSelected(false);
    }
    if (selectedIds.length === currentTableData?.length) {
      setAreAllRowsSelected(true);
      setIsOneOrMoreRowSelected(true);
    }
    if (
      selectedIds.length < currentTableData?.length &&
      selectedIds.length > 0
    ) {
      setAreAllRowsSelected(false);
    }
  }, [selectedIds, currentTableData]);
  // console.log("currentTableData");
  // console.log(currentTableData);
  //  console.log(columns)
  return (
    <>
      <div
        className={`${
          loading || !currentTableData?.length
            ? "grid-cols-1"
            : "grid-cols-[auto_1fr_auto]"
        } relative grid !max-h-fit !min-h-fit !w-full justify-center !rounded-[.625rem] border border-soft-200 bg-white`}
      >
        <MkdListTableSelectRow
          actions={actions}
          loading={loading}
          columns={columns}
          currentTableData={currentTableData}
          handleSelectAll={handleSelectAll}
          areAllRowsSelected={areAllRowsSelected}
          handleSelectRow={handleSelectRow}
          selectedIds={selectedIds}
          actionId={actionId}
        />

        {/* BR */}
        <div
          className={`${
            loading ? "" : ""
          } relative flex max-h-fit !min-h-fit w-full justify-start overflow-y-clip  bg-white ${
            !popoverShown ? "overflow-x-auto" : ""
          } `}
        >
          {(loading && useImage) ||
          (loading && !columns?.length) ||
          (loading && !currentTableData?.length) ? (
            <div
              className={`max-h-fit min-h-fit w-full min-w-full max-w-full items-center justify-center`}
            >
              <SkeletonLoader />
            </div>
          ) : columns?.length && currentTableData?.length ? (
            <>
              {columns?.map((cell, cellIndex) => {
                if (
                  !["row", ""].includes(cell?.accessor) &&
                  cell?.selected_column
                ) {
                  return (
                    <div key={cellIndex} className="h-full grow">
                      <div
                        draggable={allowSortColumns}
                        onDragStart={(e) => onDragStart(e, cellIndex)}
                        onDragEnd={onDragEnd}
                        onDragOver={(e) => onDragOver(e, cellIndex)}
                        onDragLeave={(e) => onDragLeave(e)}
                        onDrop={(e) => onDrop(e)}
                        className={`flex !h-[2.65rem] !max-h-[2.65rem] !min-h-[2.65rem] w-full !min-w-full max-w-fit items-center justify-start gap-2 px-[.75rem] py-[.5rem] ${
                          allowSortColumns && dragging
                            ? "cursor-grabbing"
                            : cell?.isSorted
                            ? "cursor-pointer"
                            : ""
                        } ${
                          toKey == cellIndex
                            ? "bg-primary-light"
                            : "bg-weak-100"
                        } `}
                      >
                        <div
                          className="flex grow items-center justify-between gap-5"
                          onClick={
                            cell?.isSorted ? () => onSort(cellIndex) : undefined
                          }
                        >
                          <div className="w-auto grow whitespace-nowrap capitalize">
                            {cell.header}
                          </div>
                          <span className="w-fit">
                            {cell.isSorted ? (
                              <NarrowUpArrowIcon
                                className={`h-2 w-2 ${
                                  cell.isSortedDesc ? "rotate-180" : ""
                                }`}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        {allowSortColumns ? (
                          <DotIcon className="h-2 w-2 cursor-grab" />
                        ) : null}
                      </div>

                      {currentTableData?.map((row, rowIndex) => {
                        return (
                          <MkdListTableRow
                            key={rowIndex}
                            columnIndex={cellIndex}
                            row={row}
                            columns={columns}
                            column={cell}
                            currentTableData={currentTableData}
                            actions={actions}
                            allowEditing={allowEditing}
                            handleSelectRow={handleSelectRow}
                            handleTableCellChange={handleTableCellChange}
                            actionPostion={actionPostion}
                            onPopoverStateChange={onPopoverStateChange}
                            selectedIds={selectedIds}
                            actionId={actionId}
                            tableRole={tableRole}
                            className={`!h-[3rem] !max-h-[3rem] !min-h-[3rem] w-full min-w-full max-w-fit whitespace-nowrap !border-b  border-soft-200 bg-white px-[.75rem] py-[.5rem] ${
                              cellIndex === 0 ? "border-l border-r" : "border-r"
                            }`}
                          />
                        );
                      })}
                    </div>
                  );
                }
              })}
            </>
          ) : !loading && !currentTableData?.length ? (
            <div className="relative w-full">
              <div
                className={`relative max-h-fit min-h-fit w-full min-w-fit max-w-full items-center justify-center `}
              >
                <div
                  className={`relative ${
                    useImage
                      ? "h-[31.25rem]"
                      : "flex h-[6.25rem] items-center justify-center"
                  } w-full`}
                >
                  {useImage ? (
                    <img
                      src={NoDataFoundImg}
                      className={`no-data-found absolute inset-x-0 m-auto h-full w-[50%] grayscale-[10%]`}
                    />
                  ) : (
                    <>No Data</>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <MkdListTableRightActionPanel
          table={table}
          tableTitle={tableTitle}
          onSort={onSort}
          loading={loading}
          columns={columns}
          actions={actions}
          actionPostion={actionPostion}
          tableRole={tableRole}
          deleteItem={deleteItem}
          deleteLoading={deleteLoading}
          actionId={actionId}
          showDeleteModal={showDeleteModal}
          currentTableData={currentTableData}
          setShowDeleteModal={setShowDeleteModal}
          handleTableCellChange={handleTableCellChange}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </>
  );
};

export default MkdListTable;
