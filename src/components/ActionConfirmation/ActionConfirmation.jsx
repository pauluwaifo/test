import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "Utils/MkdSDK";
import {
  GlobalContext,
  RequestItems,
  createRequest,
  customRequest,
  deleteRequest,
  updateRequest,
} from "Context/Global";
import { AuthContext } from "Context/Auth";
import { MkdInput } from "Components/MkdInput";
import { InteractiveButton } from "Components/InteractiveButton";
import { AddButton } from "Components/AddButton";

export const ActionConfirmation = ({
  data = { id: null },
  options = { endpoint: null, method: "GET" },
  onSuccess,
  onClose,
  multiple = false,
  action = "",
  mode = "create",
  table = "",
  inputConfirmation = true,
}) => {
  let sdk = new MkdSDK();

  const schema = yup
    .object({
      confirm: yup
        .string()
        .required()
        .oneOf([action], `Confirmation must be "${action}"`),
    })
    .required();

  const {
    state: { createModel, updateModel, deleteModel },
    dispatch: globalDispatch,
  } = React.useContext(GlobalContext);
  const { state: authState, dispatch } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    if (!multiple) {
      switch (mode) {
        case "create":
          return createData(data);
        case "update":
          return editData(data);
        case "delete":
          return deleteData(data);
        case "custom":
          return customData(data);
        case "manual":
          return manualData(data);
      }
    } else {
      makeRequests();
    }
  };

  const makeRequests = async () => {
    const result = await createRequest(globalDispatch, dispatch, table, data);
    if (!result.error && onSuccess) {
      onSuccess();
    }
  };

  const editData = async (data) => {
    console.log("data >>", data);
    const result = await updateRequest(
      globalDispatch,
      dispatch,
      table,
      data?.id,
      data
    );

    if (!result?.error && onSuccess) {
      onSuccess();
    }
  };

  const createData = async (data) => {
    if (action === "move") return moveRequest(data);
    const result = await createRequest(globalDispatch, dispatch, table, data);

    if (!result?.error && onSuccess) {
      onSuccess();
    }
  };

  const deleteData = async (data) => {
    const result = await deleteRequest(
      globalDispatch,
      dispatch,
      table,
      data.id
    );

    if (!result?.error && onSuccess) {
      onSuccess();
    }
  };

  const customData = async (data) => {
    const result = await customRequest(
      globalDispatch,
      dispatch,
      {
        endpoint: options?.endpoint,
        method: options?.method,
        payload: data,
      },
      RequestItems.createModel
    );

    if (
      result &&
      result?.hasOwnProperty("error") &&
      !result?.error &&
      onSuccess
    ) {
      onSuccess(result);
    }
  };
  const manualData = (data) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };
  const moveRequest = async (data) => {
    const result = await customRequest(
      globalDispatch,
      dispatch,
      {
        endpoint: "/v3/api/custom/qualitysign/inventory/move",
        method: "POST",
        payload: data,
      },
      RequestItems.createModel
    );

    if (!result?.error && onSuccess) {
      onSuccess(result);
    }
  };

  React.useEffect(() => {
    if (!inputConfirmation) {
      setValue("confirm", action);
    }
  }, [inputConfirmation]);

  return (
    // <div className={`px-5 ${multiple ? "flex justify-center" : ""}`}>
    <div className="mx-auto flex h-fit flex-col items-center justify-start rounded !font-inter leading-snug tracking-wide">
      <form
        className={`flex h-fit w-full flex-col text-start`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <div className="my-2">
            <div>
              Are you sure you want to {action}{" "}
              {data?.id && data?.id?.length && data?.id?.length > 1
                ? "these"
                : "this"}{" "}
              {table}?
            </div>
          </div>
          <div className={`!mb-10 ${inputConfirmation ? "" : "hidden"}`}>
            <MkdInput
              type={"text"}
              page={"items"}
              name={`confirm`}
              errors={errors}
              register={register}
              label={
                <div className="font-bold text-black">
                  Type '{action}' below
                </div>
              }
              className={"grow"}
            />
          </div>

          <div className="mt-5  flex w-full grow gap-5">
            <AddButton
              type="button"
              onClick={() => onClose()}
              className="grow self-end !border-soft-200 !bg-transparent font-bold !text-[#4F46E5]"
            >
              Cancel
            </AddButton>
            <InteractiveButton
              type="submit"
              loading={
                createModel?.loading ||
                updateModel?.loading ||
                deleteModel?.loading
              }
              disabled={
                createModel?.loading ||
                updateModel?.loading ||
                deleteModel?.loading
              }
              className="focus:shadow-outline bg-primaryBlue !w-1/2 self-end rounded px-4 py-2 font-bold capitalize text-white focus:outline-none"
            >
              {action}
            </InteractiveButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActionConfirmation;
