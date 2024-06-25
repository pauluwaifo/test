import React, { Fragment } from "react";
import MkdListTableRowDropdown from "./MkdListTableRowDropdown";
import MkdListTableRowButtons from "./MkdListTableRowButtons";

const MkdListTableRightActionPanel = ({
  table,
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
}) => {
  const [deleteId, setIdToDelete] = React.useState(null);

  const setDeleteId = async (id) => {
    console.log("id >>", id);
    setShowDeleteModal(true);
    setIdToDelete(id);
  };
  return (
    <Fragment>
      {!loading && currentTableData.length && columns.length ? (
        <>
          {(columns.find((item) => item.accessor === "") &&
            actions?.delete?.show) ||
          Object.keys(actions).filter(
            (key) =>
              actions[key]?.show &&
              actions[key]?.locations &&
              actions[key]?.locations?.length &&
              (actions[key]?.locations?.includes("dropdown") ||
                actions[key]?.locations?.includes("buttons"))
          )?.length ? (
            <div className="h-full ">
              <div className="grid grid-rows-[auto_1fr]">
                <div className="flex !h-[2.65rem] !max-h-[2.65rem] !min-h-[2.65rem] border-b !bg-weak-100 "></div>

                <div className="flex flex-col px-1">
                  {currentTableData?.map((rowData, rowDataIndex) => {
                    return (
                      <div
                        className="flex !h-[3rem] !max-h-[3rem] !min-h-[3rem] w-full items-center border-b"
                        key={rowDataIndex}
                      >
                        {/* // key={rowDataIndex}
                    // className="!h-[3rem] !max-h-[3rem] !min-h-[3rem] w-fit border-b" */}
                        {actionPostion?.includes("dropdown") ? (
                          <>
                            {/* <KebabIcon className="rotate-90" /> */}
                            <MkdListTableRowDropdown
                              actions={actions}
                              columns={columns}
                              row={rowData}
                              setDeleteId={setDeleteId}
                              // onPopoverStateChange={onPopoverStateChange}
                              actionId={actionId}
                            />
                          </>
                        ) : null}
                        {actionPostion?.includes("buttons") ? (
                          <>
                            <MkdListTableRowButtons
                              row={rowData}
                              actions={actions}
                              columns={columns}
                              actionId={actionId}
                              setDeleteId={setDeleteId}
                            />
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </Fragment>
  );
};

export default MkdListTableRightActionPanel;
// [
//   actions?.view?.show,
//   actions?.edit?.show,
//   actions?.delete?.show,
//   actions?.status?.show,
// ].includes(true) ||
