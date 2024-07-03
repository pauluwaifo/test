import React, { useEffect, useRef, useState } from "react";
import MkdSDK from "Utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext, tokenExpireError } from "Context/Auth";
import {
  GlobalContext,
  customRequest,
  setGLobalProperty,
} from "Context/Global";
import { MkdListTableV2 } from "Components/MkdListTable";
import {
  CircleCheckMarkIcon,
  EditIcon2,
  RotateIcon,
  TrashIcon,
} from "Assets/svgs";
import { AiFillEye } from "react-icons/ai";
import { operations } from "Components/MkdListTable/MkdListTableBindOperations";
import { receiptData } from "Utils/data";
import { ActionConfirmationModal } from "Components/ActionConfirmationModal";

let sdk = new MkdSDK();


const columns = [
  {
    header: "Row",
    accessor: "row",
  },
  {
    header: "id",
    accessor: "id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "create_at",
    accessor: "create_at",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "update_at",
    accessor: "update_at",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "customer",
    accessor: "company_name",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
    join: "user",
  },
  {
    header: "user_id",
    accessor: "user_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "division",
    accessor: "division_name",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
    join: "division",
  },
  {
    header: "division_id",
    accessor: "division_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "campaign",
    accessor: "campaign_name",
    join: "campaigns",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "campaign_id",
    accessor: "campaign_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "reference",
    accessor: "reference",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "purchase_order",
    accessor: "purchase_order",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "carrier",
    accessor: "carrier",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "tracking_number",
    accessor: "tracking_number",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "transaction_id",
    accessor: "transaction_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "bill_of_lading_number",
    accessor: "bill_of_lading_number",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "status",
    accessor: "receipt_status",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: true,
    mappings: {
      0: "open",
      1: "closed",
    },
  },
  {
    header: "arrival_date",
    accessor: "arrival_date",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "seal_number",
    accessor: "seal_number",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "trailer_number",
    accessor: "trailer_number",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "line_items",
    accessor: "line_items",
    isSorted: true,
    list: true,
    limit: 6,
    listType: "json|object_array",
    action: {
      key: "sku",
      operation: "list",
    },
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "item_id",
    accessor: "item_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "receipt_charges",
    accessor: "receipt_charges",
    isSorted: true,
    list: true,
    limit: 6,
    listType: "json|object_array",
    action: {
      key: "total_charges",
      operation: "add",
    },
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "expected_date",
    accessor: "expected_date",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "warehouse",
    accessor: "warehouse",
    join: "warehouse",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "warehouse_id",
    accessor: "warehouse_id",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "notes",
    accessor: "notes",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "labor_hours",
    accessor: "labor_hours",
    isSorted: true,
    selected_column: true,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "attached_files",
    accessor: "attached_files",
    isSorted: true,
    selected_column: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Action",
    accessor: "",
  },
];

const AdminListReceipts = () => {
  // Ref
  const refreshRef = useRef();

  // Context
  const { dispatch } = React.useContext(AuthContext);
  const {
    dispatch: globalDispatch,
    state: { confirmRequest },
  } = React.useContext(GlobalContext);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [localReceiptData, setLocalReceiptData] = React.useState([]);
  const [showOpenModal, setShowOpenModal] = React.useState(false);
  const [showCloseModal, setShowCloseModal] = React.useState(false);

  useEffect(() => {
    setLocalReceiptData(receiptData)
  }, [])

  const onToggleModal = (modal, toggle, ids = []) => {
    switch (modal) {
      case "close":
        // TO DO
        setSelectedItems(ids);
        break;
      case "open":
        // TO DO
        setSelectedItems(ids);
        break;
    }
  };

  return (
    <div className="overflow-x-auto  rounded bg-white p-5 shadow">
      <MkdListTableV2
        defaultColumns={columns}
        externalData={localReceiptData}
        useExternalData={true}
        tableRole={"admin"}
        table={"receipts"}
        tableTitle={"Receipts"}
        actionId={"id"}
        actions={{
          select: { show: false, action: null, multiple: false },
          view: {
            show: true,
            // action: (ids) => navigate(`/admin/view-receipts/${ids[0]}`),
            multiple: false,
            locations: ["buttons", "dropdown"],
            icon: <AiFillEye className="text-gray-400" />,
          },
          edit: {
            show: true,
            // action: (ids) => navigate(`/admin/edit-receipts/${ids[0]}`),
            multiple: false,
            locations: ["buttons", "dropdown"],
            icon: <EditIcon2 />,
            bind: {
              column: "receipt_status",
              action: "hide",
              operator: operations.EQUAL,
              ifValue: 1,
            },
          },
          delete: {
            show: true,
            action: null,
            multiple: false,
            locations: ["buttons", "dropdown"],
            icon: <TrashIcon className="text-gray-400" />,
            bind: {
              column: "receipt_status",
              action: "hide",
              operator: operations.EQUAL,
              ifValue: 1,
            },
          },
          close: {
            show: true,
            action: (ids) => onToggleModal("close", true, ids),
            multiple: true,
            locations: ["buttons"],
            children: "Close",
            icon: <CircleCheckMarkIcon className="h-[.955rem] w-[.955rem]" />,
            bind: {
              column: "receipt_status",
              action: "hide",
              operator: operations.EQUAL,
              ifValue: 0,
            },
          },
          open: {
            show: true,
            action: (ids) => onToggleModal("open", true, ids),
            multiple: true,
            locations: ["buttons"],
            children: "Open",
            icon: (
              <RotateIcon
                className="h-[.955rem] w-[.955rem]"
                stroke={"#717179"}
              />
            ),
            bind: {
              column: "receipt_status",
              action: "hide",
              operator: operations.EQUAL,
              ifValue: 1,
            },
          },
          add: {
            show: false,
            // action: () => navigate("/admin/add-receipts"),
            multiple: true,
            children: "+",
          },
          export: {
            show: false,
            action: null,
            multiple: true,
            showText: false,
            className: "!p-0 !bg-white !border-0",
          },
        }}
        actionPostion={[`buttons`]}
        // allowEditing
        refreshRef={refreshRef}
      />

      <ActionConfirmationModal
        isOpen={showCloseModal}
        title="Close Receipt"
        modalClasses={{
          modalDialog:
            "max-h-[90%] min-h-[12rem] overflow-y-auto !w-full md:!w-[29.0625rem]",
          modal: "h-full",
        }}
        data={{ id: selectedItems[0] }}
        onClose={() => onToggleModal("close", false, [])}
        onSuccess={(data) => {
          // TO DO - Update the receipt_status to closed here
          onToggleModal("close", false, []);
        }}
        action="close"
        mode="manual"
        multiple={false}
        table="receipts"
        inputConfirmation={false}
      />
      <ActionConfirmationModal
        isOpen={showOpenModal}
        title="Open Receipt"
        modalClasses={{
          modalDialog:
            "max-h-[90%] min-h-[12rem] overflow-y-auto !w-full md:!w-[29.0625rem]",
          modal: "h-full",
        }}
        data={{ id: selectedItems[0] }}
        onClose={() => onToggleModal("open", false, [])}
        onSuccess={(data) => {
          // TO DO - Update the receipt_status to open here
          onToggleModal("open", false, []);
        }}
        action="open"
        mode="manual"
        multiple={false}
        table="receipts"
        inputConfirmation={false}
      />
    </div>
  );
};

export default AdminListReceipts;
