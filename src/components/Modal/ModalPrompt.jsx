import React from "react";
import { CloseIcon, DangerIcon } from "Assets/svgs";
import { InteractiveButton } from "Components/InteractiveButton";
import { MdClose } from "react-icons/md";

// type Props = {
//   closeModalFunction: () => void
//   actionHandler: any
//   message?: string
//   title?: string
//   rejectText?: string
//   acceptText?: string
//   titleClasses?: string
//   messageClasses?: string
// }

const ModalPrompt = ({
  open,
  closeModalFunction,
  actionHandler,
  message,
  title,
  messageClasses,
  titleClasses,
  acceptText = "",
  rejectText = "Cancel",
  loading = false,
  allowAccept = true,
}) => {
  return (
    <aside
      className={`fixed inset-0 m-auto flex items-center justify-center backdrop-blur-sm transition-all ${
        open ? "scale-100" : "scale-0"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "91000",
      }}
    >
      <section className="flex w-[25rem] min-w-[25rem] flex-col  gap-6 rounded-md bg-white px-6 py-6">
        <div className="flex justify-between ">
          <div>
            {title ? (
              <div className={` ${titleClasses}`}>
                {title}
                {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */}
              </div>
            ) : null}
            {/* <DangerIcon className={`h-5 w-5`} /> */}
            {/* <img src={danger} width={30} height={30} alt='danger' /> */}
          </div>
          <button disabled={loading} onClick={closeModalFunction}>
            <MdClose className="text-xl" />
            {/* <img src={Close} width={30} height={30} alt='close' /> */}
          </button>
        </div>
        {/* {title ? (
          <div className={` ${titleClasses}`}>
            {title}
          </div>
        ) : null} */}
        {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */}
        {message ? (
          <div className={`text-[#667085] ${messageClasses}`}>
            {message}
            {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */}
          </div>
        ) : null}

        <div className="flex w-full justify-between gap-2 font-medium uppercase leading-[1.5rem] text-[base]">
          <InteractiveButton
            disabled={loading}
            loading={loading}
            className={`${
              allowAccept ? "flex !w-1/2" : "hidden w-0"
            }  h-[2.75rem] !rounded-[.625rem] bg-primary uppercase !text-white`}
            onClick={actionHandler}
          >
            {acceptText && acceptText.toLowerCase() !== "yes"
              ? `Yes ${acceptText}`
              : "Yes"}
          </InteractiveButton>
          <button
            disabled={loading}
            className={`flex h-[2.75rem] items-center justify-center rounded-[.625rem]  border border-[#d8dae5] text-[#667085] ${
              allowAccept ? " w-1/2" : "grow"
            }`}
            onClick={closeModalFunction}
          >
            {rejectText}
          </button>
        </div>
      </section>
    </aside>
  );
};

export default ModalPrompt;
