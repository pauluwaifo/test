export const REQUEST_LOADING = "REQUEST_LOADING";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const SET_GLOBAL_PROPERTY = "SET_GLOBAL_PROPERTY";

const RequestItems = {
  viewModel: "viewModel",
  createModel: "createModel",
  updateModel: "updateModel",
  listModel: "listModel",
  deleteModel: "deleteModel",
  customRequest: "customRequest",
};

Object.freeze(RequestItems);

export { RequestItems };
