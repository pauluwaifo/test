import React, { memo, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import { StringCaser } from "Utils/utils";
import { AuthContext, tokenExpireError } from "Context/Auth";
import {
  GlobalContext,
  customRequest,
  getMany,
  setLoading as setGlobalLoading,
} from "Context/Global";
import {
  MkdListTable,
  OverlayTableActions,
  TableActions,
} from "Components/MkdListTable";
import { AddButton } from "Components/AddButton";
import TreeSDK from "Utils/TreeSDK";
import "./MkdListTable.css";
import { ExCircleIcon } from "Assets/svgs";

import { MkdInput } from "Components/MkdInput";

let sdk = new MkdSDK();
// const getSchemaStructure = (schema) => {
//   return;
// };
const getType = (type) => {
  switch (type) {
    case "varchar":
      return "text";
    case "text":
      return "textarea";
    case "mediumtext":
      return "textarea";
    case "longtext":
      return "textarea";
    case "tinyint":
      return "number";
    case "int":
      return "number";
    case "bigint":
      return "number";
    case "float":
      return "number";
    case "double":
      return "number";
    case "image":
      return "image";
    case "file":
      return "file";
    case "date":
      return "date";
    case "datetime":
      return "datetime";
    default:
      return "text";
  }
};

/**
 *  @params {"dropwdown" | "ontop" | "overlay"} actionPostion
 *
 */
const MkdListTableV2 = ({
  externalData = [],
  useExternalData = false,
  defaultColumns = [],
  columnModel = null,
  // setColumns,
  actions = {
    view: { show: true, multiple: true, action: null },
    edit: { show: true, multiple: true, action: null },
    delete: { show: true, multiple: true, action: null },
    select: { show: true, multiple: true, action: null },
    action: {
      show: false,
      multiple: false,
      action: null,
      showChildren: true,
      children: "+",
      type: "",
      className: "",
      locations: [],
      icon: null,
    },
    add: {
      show: true,
      multiple: true,
      action: null,
      showChildren: true,
      children: "+",
      type: "",
      className: "",
    },
    export: {
      show: true,
      multiple: true,
      action: null,
      showText: false,
      className: "",
    },
  },
  actionPostion = ["dropdown"], // "dropwdown" | "ontop" | "overlay" | "button"
  actionId = "id",
  tableRole = "admin",
  table = "user",
  tableTitle = "",
  tableSchema = [],
  hasFilter = true,
  schemaFields = [],
  showPagination = true,
  defaultFilter = [],
  refreshRef = null,
  allowEditing = false,
  allowSortColumns = true,
  topClasses = "",
  join = [],
  filterDisplays = [],
}) => {
  const tdk = new TreeSDK();

  const { dispatch } = React.useContext(AuthContext);
  const {
    dispatch: globalDispatch,
    state: { columModel },
  } = React.useContext(GlobalContext);

  const [query, setQuery] = React.useState("");
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(1000);
  const [pageCount, setPageCount] = React.useState(0);
  const [dataTotal, setDataTotal] = React.useState(0);
  const [currentPage, setPage] = React.useState(1);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);
  const [canNextPage, setCanNextPage] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [filterConditions, setFilterConditions] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isSearchDirty, setIsSearchDirty] = React.useState(false);
  // const [optionValue, setOptionValue] = React.useState("eq");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [runFilter, setRunFilter] = React.useState(false);
  const [searchField, setSearchField] = React.useState("name");

  const [columnData, setColumnData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [columnId, setColumnId] = React.useState(0);
  const [popoverShown, setPopoverShow] = React.useState(false);

  const selectedOptionsMemo = useMemo(() => selectedOptions, [selectedOptions]);

  const schema = yup.object({});

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSort(columnIndex) {
    console.log(columns[columnIndex]);
    if (columns[columnIndex].isSorted) {
      columns[columnIndex].isSortedDesc = !columns[columnIndex].isSortedDesc;
    } else {
      columns.map((i) => (i.isSorted = false));
      columns.map((i) => (i.isSortedDesc = false));
      columns[columnIndex].isSorted = true;
    }

    (async function () {
      await getData(currentPage, pageSize, {
        filterConditions,
        order: columns[columnIndex].accessor,
        direction: columns[columnIndex].isSortedDesc ? "desc" : "asc",
      });
    })();
  }

  function updatePageSize(limit) {
    (async function () {
      setPageSize(limit);

      if (isSearchDirty && !searchValue) {
        await getData(currentPage, limit);
        setIsSearchDirty(false);
      } else if (isSearchDirty && searchValue) {
        getSearchData({ limit, page: currentPage });
      }
    })();
  }

  function setOptionValue(field, value, uid) {
    const tempSelectedOptions = [...selectedOptions];
    const data = tempSelectedOptions.map((item) => {
      if (item?.uid === uid) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    setSelectedOptions((prev) => [...data]);
    // console.log("field", field);
    if (field === "value") {
      // console.log("field", field);
      setRunFilter(true);
    }
  }

  function previousPage() {
    (async function () {
      if (isSearchDirty && !searchValue) {
        // await getData(currentPage, pageSize, { filterConditions: [] });
        await getData(
          currentPage - 1 > 0 ? currentPage - 1 : currentPage,
          pageSize
        );
        setIsSearchDirty(false);
      } else if (isSearchDirty && searchValue) {
        getSearchData({
          limit: pageSize,
          page: currentPage - 1 > 0 ? currentPage - 1 : currentPage,
        });
      }
    })();
  }

  function updateCurrentPage(page) {
    (async function () {
      setPage(page);
      if (isSearchDirty && !searchValue) {
        await getData(page, pageSize);
        setIsSearchDirty(false);
      } else if (isSearchDirty && searchValue) {
        getSearchData({ limit: pageSize, page });
      }
    })();
  }

  function nextPage() {
    (async function () {
      if (isSearchDirty && !searchValue) {
        await getData(
          currentPage + 1 <= pageCount ? currentPage + 1 : currentPage,
          pageSize
        );
        setIsSearchDirty(false);
      } else if (isSearchDirty && searchValue) {
        getSearchData({
          limit: pageSize,
          page: currentPage + 1 <= pageCount ? currentPage + 1 : currentPage,
        });
      }
    })();
  }

  const addFilterCondition = (option, selectedValue, inputValue) => {
    const input =
      selectedValue === "eq" && isNaN(inputValue)
        ? `${inputValue}`
        : inputValue;
    const condition = `${option},${selectedValue},${input}`.toLowerCase();
    setFilterConditions((prevConditions) => {
      const newConditions = prevConditions.filter(
        (condition) => !condition.includes(option)
      );
      return [...newConditions, condition];
    });
    setSearchValue(inputValue);
  };
  // options.size = payload.limit;
  // options.order = payload.sortId;
  // options.direction = payload.direction;
  // options.page = payload.page;
  // options.join = payload.join;
  async function getData(pageNum, limitNum, currentTableData) {
    // console.log("currentTableData >>", currentTableData);
    try {
      setLoading(true);
      const result = await tdk.getPaginate(table, {
        size: limitNum,
        page: pageNum,
        ...{
          ...(join && join.length
            ? {
                join,
              }
            : null),
        },
        ...{
          ...(currentTableData?.order
            ? {
                order: currentTableData?.order,
                direction: currentTableData?.direction,
              }
            : null),
        },
        ...{
          ...(currentTableData?.filterConditions &&
          currentTableData?.filterConditions.length
            ? {
                filter: [
                  ...currentTableData?.filterConditions,
                  ...(defaultFilter.length ? defaultFilter : []),
                ],
              }
            : defaultFilter.length
            ? { filter: [...defaultFilter] }
            : null),
        },
      });
      // sdk.setTable(table);
      // const result = await sdk.callRestAPI(
      //   {
      //     payload: {
      //       ...currentTableData,
      //       ...{
      //         ...(filterConditions.length
      //           ? {
      //               filter: [
      //                 ...(defaultFilter.length && defaultFilter),
      //                 ...filterConditions,
      //               ],
      //             }
      //           : defaultFilter.length
      //           ? { filter: [...defaultFilter] }
      //           : null),
      //       },
      //     },
      //     page: pageNum,
      //     limit: limitNum,
      //   },
      //   "PAGINATE"
      // );
      // if (!result) {
      //   setLoading(false);
      // }
      setSelectedItems(() => []);
      const { list, total, limit, num_pages, page } = result;

      setCurrentTableData(list);
      console.log("v2 component fetch result");
      console.log(result);
      console.log("list");
      console.log(list);
      setPageSize(limit);
      setPageCount(num_pages);
      setPage(page);
      setDataTotal(total);
      setCanPreviousPage(page > 1);
      setCanNextPage(page + 1 <= num_pages);
      setLoading(false);
      if (selectedItems?.length) {
        setSelectedItems(() => []);
      }
    } catch (error) {
      setLoading(false);
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  const deleteItem = async (id) => {
    async function deleteId(id) {
      try {
        setDeleteLoading(true);
        sdk.setTable(table);
        const result = await sdk.callRestAPI({ id }, "DELETE");
        if (!result?.error) {
          setCurrentTableData((list) =>
            list.filter((x) => Number(x.id) !== Number(id))
          );
          setDeleteLoading(false);
          setShowDeleteModal(false);
        }
      } catch (err) {
        setDeleteLoading(false);
        setShowDeleteModal(false);
        tokenExpireError(dispatch, err?.message);
        throw new Error(err);
      }
    }

    if (typeof id === "object") {
      id.forEach(async (idToDelete) => {
        await deleteId(idToDelete);
      });
    } else if (typeof id === "number") {
      await deleteId(id);
    }
  };

  const exportTable = async (id) => {
    try {
      sdk.setTable(table);
      const result = await sdk.exportCSV();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleAlphaSearchInput = async (e) => {
    if ([e?.code?.toLowerCase(), e?.key?.toLowerCase()].includes("enter")) {
      console.log("searchValue >>", searchValue);
      if (isSearchDirty && !searchValue) {
        await getData(currentPage, pageSize, { filterConditions: [] });
        setIsSearchDirty(false);
      } else if (isSearchDirty && searchValue) {
        getSearchData();
      }
    } else {
      setSearchValue(e?.target?.value);
      if (!isSearchDirty) {
        setIsSearchDirty(true);
      }
    }
  };

  const getSearchData = async (query = { limit: pageSize, page: 1 }) => {
    try {
      const apiEndpoint = `/v3/api/custom/qualitysign/generic/search/${table}?limit=${query?.limit}&page=${query?.page}`;
      setLoading(true);
      const result = await customRequest(globalDispatch, dispatch, {
        endpoint: apiEndpoint,
        method: "POST",
        payload: {
          search: searchValue,
          columns: columns,
        },
      });
      if (!result?.error) {
        setSelectedItems(() => []);
        const { data, total, limit, num_pages, page } = result;

        setCurrentTableData(() => data);
        console.log("v2 component fetch search result");
        console.log(result);
        console.log("list");
        console.log(data);
        setPageSize(Number(limit));
        setPageCount(num_pages ?? pageCount);
        setPage(Number(page));
        setDataTotal(Number(total));
        setCanPreviousPage(Number(page) > 1);
        setCanNextPage(
          Number(page) + 1 <= num_pages ? Number(num_pages) : pageCount
        );
        setLoading(false);
        if (selectedItems?.length) {
          setSelectedItems(() => []);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const resetForm = async () => {
    reset();
    await getData(currentPage, pageSize);
  };

  const onSubmit = (e) => {
    let filters = [];
    // find duplicate fields
    const uniqueSet = new Set(
      selectedOptionsMemo.map((item) => item?.accessor)
    );
    if (uniqueSet?.size) {
      uniqueSet.forEach((uniqueSetItem) => {
        const filterSet = selectedOptionsMemo.filter(
          (item) => item.accessor === uniqueSetItem
        );
        console.log("filterSet >>", filterSet);
        if (filterSet?.length > 0 && filterSet?.length > 1) {
          const valueSet = filterSet
            .map((item) => {
              if (item?.value) {
                return item;
              }
            })
            .filter(Boolean);

          if (valueSet.length > 1) {
            // const value = `${uniqueSetItem},in,${valueSet
            //   .map((item) => item.value)
            //   .join(",")}`;
            // filters.push(value);
            valueSet.forEach((valueSetItem) => {
              switch (valueSetItem?.operator) {
                case "cs":
                case "eq":
                  filters.push(
                    `qualitysign_${table}.${valueSetItem?.accessor},o${valueSetItem?.operator},${valueSetItem?.value}`
                  );
                  break;
                default:
                  filters.push(
                    `qualitysign_${table}.${valueSetItem?.accessor},${valueSetItem?.operator},${valueSetItem?.value}`
                  );
              }
            });
          } else if (valueSet.length === 1) {
            filters.push(
              `qualitysign_${table}.${valueSet[0]?.accessor},${valueSet[0]?.operator},${valueSet[0]?.value}`
            );
          }
        } else if (filterSet?.length === 1) {
          if (filterSet[0]?.value) {
            filters.push(
              `qualitysign_${table}.${filterSet[0]?.accessor},${filterSet[0]?.operator},${filterSet[0]?.value}`
            );
          }
        }
      });
    }
    // return console.log("filters >>", filters);
    if (filters?.length) {
      getData(currentPage, pageSize, { filterConditions: filters });
    } else {
      getData(currentPage, pageSize, { filterConditions: [] });
    }

    // getData(currentPage, pageSize, filter);
  };

  async function updateTableData(id, key, updatedData) {
    try {
      // setLoading(true);
      sdk.setTable(table);
      const result = await sdk.callRestAPI(
        {
          id,
          [key]: updatedData,
        },
        "PUT"
      );
      // if (result) {
      //   setLoading(false);
      // }

      console.log("update user data");
      console.log(result);
    } catch (error) {
      // setLoading(false);
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  async function handleTableCellChange(id, newValue, index, newValueKey) {
    console.log(newValue);
    console.log(index);
    console.log(newValueKey);
    let runApiCall;
    newValue = isNaN(Number.parseInt(newValue))
      ? newValue
      : Number.parseInt(newValue);
    try {
      clearTimeout(runApiCall);
      runApiCall = setTimeout(async () => {
        await updateTableData(id, newValueKey, newValue);
      }, 200);
      setCurrentTableData((prevData) => {
        const updatedData = prevData.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [newValueKey]: newValue,
            };
          }
          return item;
        });
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  }
  const populateColums = (result) => {
    setColumnId(result?.data[0]?.id);
    setColumnData(result?.data[0]);
    const data =
      result?.data[0].columns && JSON.parse(result?.data[0].columns)
        ? JSON.parse(result?.data[0].columns)
        : [];

    console.log("data >>", data);

    if (data.length) {
      setColumns(() => [...data]);
    } else {
      setColumns(() => [...defaultColumns]);
    }
  };

  const getColumns = async () => {
    setGlobalLoading(globalDispatch, true, "columModel");
    const result = await getMany(globalDispatch, dispatch, "column", [
      ...(columnModel
        ? [`model,eq,'${columnModel}'`]
        : [`model,eq,'${table}'`]),
      `user_id,eq,0`,
    ]);

    // console.log("result >>", result);
    if (!result?.error && result?.data?.length) {
      populateColums(result);
    } else {
      const result = await getMany(globalDispatch, dispatch, "column", [
        ...(columnModel
          ? [`model,eq,'${columnModel}'`]
          : [`model,eq,'${table}'`]),
        `user_id,eq,0`,
      ]);
      if (!result?.error && result?.data?.length) {
        populateColums(result);
      }
    }
    setGlobalLoading(globalDispatch, false, "columModel");
  };

  React.useEffect(() => {
    if (useExternalData) {
      setColumns(() => defaultColumns);
    } else {
      getColumns();
    }
  }, [useExternalData]);

  // Update External Selected Items
  React.useEffect(() => {
    if (actions?.select?.action) {
      actions.select.action(selectedItems);
    }
  }, [selectedItems?.length]);

  React.useEffect(() => {
    const searchableCol = columns.find((col) => col?.searchable);
    if (searchableCol) {
      setSearchField(searchableCol?.accessor);
    }
  }, []);

  React.useEffect(() => {
    if (useExternalData) {
      setCurrentTableData(() => externalData);
    } else {
      getData(currentPage, pageSize, { filterConditions: [] });
    }
  }, [useExternalData]);

  return (
    <div className="!h-fit">
      {refreshRef && (
        <button
          type="button"
          ref={refreshRef}
          onClick={() => getData(1, pageSize)}
          className="hidden"
        ></button>
      )}
      <div
        className={`flex w-full justify-between ${
          tableTitle && hasFilter ? "flex-col gap-3" : "h-fit items-center"
        } ${topClasses}`}
      >
        <h4 className="flex items-center font-inter text-[1rem] font-medium capitalize leading-[1.5rem] tracking-[-0.011em]">
          {tableTitle ? tableTitle : ""}
        </h4>

        <div
          className={`flex h-fit ${
            hasFilter ? "w-full" : "w-fit"
          } items-center justify-between gap-2 text-center`}
        >
          <div
            className={`flex h-full w-fit justify-end gap-2 self-end ${
              !tableTitle && !hasFilter ? "w-full" : ""
            }`}
          >
            {Object.keys(actions).map((key, keyIndex) => {
              if (
                actions[key].show &&
                actions[key].hasOwnProperty("type") &&
                ["toggle"].includes(actions[key].type)
              ) {
                return (
                  <MkdInput
                    key={keyIndex}
                    type="toggle"
                    onChange={(e) => {
                      if (actions[key]?.action) {
                        actions[key]?.action(e?.target?.checked);
                      }
                    }}
                    label={actions[key]?.children ?? key}
                    value={actions[key]?.value}
                  />
                );
              }
            })}

            {selectedItems?.length && actionPostion.includes("ontop") ? (
              <TableActions actions={actions} selectedItems={selectedItems} />
            ) : null}

            {Object.keys(actions).map((key, keyIndex) => {
              if (
                actions[key].show &&
                actions[key].hasOwnProperty("type") &&
                ["static"].includes(actions[key].type)
              ) {
                return (
                  <AddButton
                    key={keyIndex}
                    onClick={() => {
                      if (actions[key]?.action) {
                        actions[key]?.action();
                      }
                    }}
                    title={actions[key]?.title ?? key}
                    // showChildren={actions?.add?.showChildren}
                    showPlus={false}
                    className={`!h-[2.5rem] ${actions[key]?.className}`}
                    loading={actions[key]?.loading ?? false}
                    disabled={actions[key]?.disabled ?? false}
                    icon={actions[key]?.icon ?? null}
                  >
                    {key === "delete" ? <ExCircleIcon /> : null}
                    {actions[key].children ? (
                      actions[key].children
                    ) : (
                      <>
                        {StringCaser(key === "delete" ? "Remove" : key, {
                          casetype: "capitalize",
                          separator: " ",
                        })}
                      </>
                    )}
                  </AddButton>
                );
              }
            })}

            {actions?.add?.show && (
              <AddButton
                onClick={() => {
                  if (actions?.add?.action) {
                    actions?.add?.action();
                  }
                }}
                showChildren={actions?.add?.showChildren}
                className={`!h-[2.5rem] ${actions?.add?.className}`}
              >
                {actions?.add?.children}
              </AddButton>
            )}
          </div>
        </div>
      </div>
      <div className="my-2">
        <MkdListTable
          table={table}
          onSort={onSort}
          columns={columns}
          actions={actions}
          actionId={actionId}
          tableRole={tableRole}
          tableTitle={tableTitle}
          columnData={columnData}
          deleteItem={deleteItem}
          setColumns={setColumns}
          allowEditing={allowEditing}
          setColumnData={setColumnData}
          actionPostion={actionPostion}
          deleteLoading={deleteLoading}
          showDeleteModal={showDeleteModal}
          allowSortColumns={allowSortColumns}
          currentTableData={currentTableData}
          setSelectedItems={setSelectedItems}
          setShowDeleteModal={setShowDeleteModal}
          loading={loading || columModel?.loading}
          handleTableCellChange={handleTableCellChange}
          // onPopoverStateChange={setPopoverShow}
          popoverShown={popoverShown}
        />
      </div>
      {selectedItems?.length && actionPostion.includes("overlay") ? (
        <OverlayTableActions actions={actions} selectedItems={selectedItems} />
      ) : null}
    </div>
  );
};

export default memo(MkdListTableV2);
