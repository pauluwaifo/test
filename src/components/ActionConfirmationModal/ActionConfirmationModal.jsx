import React, { useEffect } from "react";
import { Modal } from "Components/Modal";
import { ActionConfirmation } from "Components/ActionConfirmation";

export const ActionConfirmationModal = ({
  data = { id: null },
  options = { endpoint: null, method: "GET" },
  onSuccess,
  onClose,
  multiple = false,
  action = "",
  mode = "create",
  table = "",
  title = "",
  isOpen = false,
  inputConfirmation = true,
  modalClasses = {
    modalDialog:
      "max-h-[90%] min-h-[12rem] overflow-y-auto !w-full md:!w-[29.0625rem]",
    modal: "h-full",
  },
}) => {
  return (
    <Modal
      isOpen={isOpen}
      modalCloseClick={onClose}
      title={title}
      modalHeader
      classes={modalClasses}
    >
      {isOpen && (
        <ActionConfirmation
          data={data}
          mode={mode}
          table={table}
          action={action}
          onClose={onClose}
          options={options}
          multiple={multiple}
          onSuccess={onSuccess}
          inputConfirmation={inputConfirmation}
        />
      )}
    </Modal>
  );
};

export default ActionConfirmationModal;
