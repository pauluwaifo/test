import React, { memo, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({
  children,
  title,
  modalCloseClick,
  modalHeader,
  classes = { modal: "h-full", modalDialog: "h-[90%]", modalContent: "" },
  page = "",
  isOpen,
}) => {
  const modalRef = useRef(null);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [isOpen]);

  useEffect(() => {
    const scrollableElements = document.querySelectorAll(
      "body, .scrollable-container" // Add other selectors if needed
    );

    if (isOpen) {
      scrollableElements.forEach((element) => {
        element.style.overflow = "hidden";
      });
    } else {
      scrollableElements.forEach((element) => {
        element.style.overflow = "auto";
      });
    }

    return () => {
      scrollableElements.forEach((element) => {
        element.style.overflow = "auto";
      });
    };
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      style={{
        zIndex: 999999999999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      className={`fixed bottom-0 left-0 right-0 top-0 flex w-full scale-0 items-center justify-center bg-[#00000099] p-5 backdrop-blur-sm transition-all ${
        isOpen ? "scale-100" : "scale-0"
      } ${classes?.modal}`}
    >
      <div
        className={`${
          page === "ManagePermissionAddRole" ? "w-fit" : "w-[80%]"
        } relative overflow-auto rounded-lg bg-white pb-5 shadow ${
          classes?.modalDialog
        }`}
      >
        {modalHeader && (
          <div
            className={`sticky inset-x-0 top-0 !z-50 m-auto flex w-full justify-between border-b bg-white px-5 py-4`}
          >
            <div className="text-center font-inter text-[1.125rem] font-bold capitalize leading-[1.5rem] tracking-[-1.5%]">
              {title}
            </div>
            <button
              type="button"
              className="modal-close cursor-pointer"
              onClick={modalCloseClick}
            >
              <MdClose className="text-xl" />
            </button>
          </div>
        )}

        <div className={`-z-10 mt-4 px-5 ${classes?.modalContent}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalMemo = memo(Modal);
export { ModalMemo as Modal };
