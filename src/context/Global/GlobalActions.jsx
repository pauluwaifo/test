import { tokenExpireError } from "Context/Auth";

import MkdSDK from "Utils/MkdSDK";

import {
  REQUEST_FAILED,
  REQUEST_LOADING,
  REQUEST_SUCCESS,
  RequestItems,
  SET_GLOBAL_PROPERTY,
} from "./GlobalConstants";

import { showToast } from "./GlobalContext";
import TreeSDK from "Utils/TreeSDK";

/**
 * @param {any} dispatch - Global Dispatch
 * @param {String | Number | Boolean | Object} data -
 * @param {String} property - any propert name
 */

export const setGLobalProperty = (dispatch, data, property) => {
  // console.log("property >>", property);
  dispatch({
    property,
    type: SET_GLOBAL_PROPERTY,
    payload: data,
  });
};

/**
 * @param {any} dispatch - Global Dispatch
 * @param {boolean} data - true || false
 * @param { String } item - string of the needed action
 */

export const setLoading = (dispatch, data, item, where) => {
  // console.log("setLoading data >>", data, where);
  dispatch({
    item,
    type: REQUEST_LOADING,
    payload: data,
  });
};

/**
 * @param {any} dispatch - Global Dispatch
 * @param {Array | any} data - any[]
 * @param { String } item - string of the needed action
 */

export const dataSuccess = (dispatch, data, item) => {
  dispatch({
    item,
    type: REQUEST_SUCCESS,
    payload: data,
  });
};
/**
 * @param {any} dispatch - Global Dispatch
 * @param {Array | any} data - any[]
 * @param { String } item - string of the needed action
 */

export const dataFailure = (dispatch, data, item) => {
  dispatch({
    item,
    type: REQUEST_FAILED,
    payload: data,
  });
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param {Number | String} id - id
 * @param {String} method - method
 * @param {String} join - join
 * @param {String} state - any string to represent the context field, default is viewModel
 */

export const getSingleModel = async (
  globalDispatch,
  authDispatch,
  table,
  id,
  method = "GET",
  join = null,
  state = RequestItems?.viewModel
) => {
  const sdk = new MkdSDK();
  console.log("table >>", table);
  setLoading(globalDispatch, true, state);
  try {
    sdk.setTable(table.trim());
    const result = await sdk.callRestAPI(
      { id: Number(id), ...{ ...(join ? { join: join } : null) } },
      method
    );

    if (!result?.error) {
      dataSuccess(globalDispatch, { data: result?.model }, state);
    }
    setLoading(globalDispatch, false, state);
    // showToast(globalDispatch, "Project Saved", 4000, "info");
    return {
      error: false,
      data: result?.model,
      message: result?.message ?? "Success",
    };
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, state);
    dataFailure(globalDispatch, { message, id }, state);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true, message };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param {Array[Number] | Array[String]} filter - list of filters
 * @param { String } join - join table
 */

export const getMany = async (
  globalDispatch,
  authDispatch,
  table,
  filter = [],
  join = null
) => {
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, RequestItems?.listModel);
  try {
    // const filters = ids.map((id) => computeFilter("id", "in", id));
    const result = await tdk.getList(table, {
      ...{
        ...(join ? { join: join } : null),
        ...(filter && filter?.length ? { filter: filter } : null),
      },
    });

    if (!result?.error) {
      dataSuccess(
        globalDispatch,
        { data: result?.list },
        RequestItems?.listModel
      );
    }
    setLoading(globalDispatch, false, RequestItems?.listModel);
    return { error: false, data: result?.list };
    // showToast(globalDispatch, "Project Saved", 4000, "info");
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, RequestItems?.listModel);
    // dataFailure(globalDispatch, { message, id }, RequestItems?.listModel);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true, message };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param {Array[Number] | Array[String]} ids - list of ids
 * @param { String } join - join table
 */

export const getManyByIds = async (
  globalDispatch,
  authDispatch,
  table,
  ids,
  join = null
) => {
  console.log("join >>", join);
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, RequestItems?.listModel);
  try {
    const result = await tdk.getList(table, {
      ...{
        ...(join ? { join: join } : null),
        filter: [`id,in,${ids.join(",")}`],
      },
    });

    if (!result?.error) {
      dataSuccess(
        globalDispatch,
        { data: result?.list },
        RequestItems?.listModel
      );
    }
    setLoading(globalDispatch, false, RequestItems?.listModel);
    return { error: result?.error, data: result?.list };
    // showToast(globalDispatch, "Project Saved", 4000, "info");
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, RequestItems?.listModel);
    dataFailure(globalDispatch, { message, id }, RequestItems?.listModel);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true, message };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param { Object } payload - data to create
 */

export const createRequest = async (
  globalDispatch,
  authDispatch,
  table,
  payload
) => {
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, RequestItems?.createModel);
  try {
    const result = await tdk.create(table, payload);

    if (!result?.error) {
      dataSuccess(
        globalDispatch,
        { message: result?.message },
        RequestItems?.createModel
      );
      setLoading(globalDispatch, false, RequestItems?.createModel);
      showToast(globalDispatch, result?.message, 4000, "success");
      return { error: false, data: result?.data };
    } else {
      setLoading(globalDispatch, false, RequestItems?.createModel);
      showToast(globalDispatch, result?.message, 4000, "error");
      return { error: true };
    }
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, RequestItems?.createModel);
    dataFailure(globalDispatch, { message }, RequestItems?.createModel);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param {String | Number} id - item id
 * @param { Object } payload - data to create
 */

export const updateRequest = async (
  globalDispatch,
  authDispatch,
  table,
  id,
  payload
) => {
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, RequestItems?.updateModel);
  try {
    const result = await tdk.update(table, id, payload);

    if (!result?.error) {
      // dataSuccess(globalDispatch, { message: result?.message }, RequestItems?.updateModel);
      setLoading(globalDispatch, false, RequestItems?.updateModel);
      showToast(globalDispatch, result?.message, 4000, "success");
      return { error: false };
    } else {
      setLoading(globalDispatch, false, RequestItems?.updateModel);
      showToast(globalDispatch, result?.message, 4000, "error");
      return { error: true };
    }
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, RequestItems?.updateModel);
    // dataFailure(globalDispatch, { message }, RequestItems?.updateModel);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * * @param {String | Number} id - item id
 * @param { Object } payload - data to create
 */

export const deleteRequest = async (
  globalDispatch,
  authDispatch,
  table,
  id,
  payload
) => {
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, RequestItems?.deleteModel);
  try {
    const result = await tdk.delete(table, id, payload);

    if (!result?.error) {
      dataSuccess(
        globalDispatch,
        { message: result?.message },
        RequestItems?.deleteModel
      );
      setLoading(globalDispatch, false, RequestItems?.deleteModel);
      showToast(globalDispatch, result?.message, 4000, "success");
      return { error: false, data: result?.data };
    } else {
      setLoading(globalDispatch, false, RequestItems?.deleteModel);
      showToast(globalDispatch, result?.message, 4000, "error");
      return { error: true };
    }
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, RequestItems?.deleteModel);
    dataFailure(globalDispatch, { message }, RequestItems?.deleteModel);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true };
  }
};

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param {String} table - table model
 * @param { Object } options - options are filter, join, size, direction and order query
 * @param { string } state - an optional string use as the data retrieval state in place of table
 * @param { Array } [options.filter=null] filter: []
 * @param { String } [options.join=null] join: "table1,table2,table3" - joins another table
 * @param { Number } [options.size=10] size number of items per page
 * @param { String } [options.order=id] order by any field | default is the id field
 * @param { String } [options.direction=desc] direction, desc or asc | desc is the default
 */

export const getList = async (
  globalDispatch,
  authDispatch,
  table,
  options = {},
  state
) => {
  const tdk = new TreeSDK();
  setLoading(globalDispatch, true, state ?? table);
  try {
    const result = await tdk.getList(table, options);

    if (!result?.error) {
      // dataSuccess(globalDispatch, { message: result?.message }, table);
      setLoading(globalDispatch, false, state ?? table);
      // showToast(globalDispatch, result?.message, 4000, "success");
      return { error: false, data: result?.list };
    } else {
      setLoading(globalDispatch, false, state ?? table);
      // showToast(globalDispatch, result?.message, 4000, "error");
      return result;
    }
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, state ?? table);
    // dataFailure(globalDispatch, { message }, table);
    // showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true, message };
  }
};

/**
 * @typedef {Object} CustomRequestOptions
 * @property {String} endpoint - the api endpoint
 * @property { any } payload - Request Data
 * @property { String } method - Request Method GET | POST | PATCH | DELETE | PUT - default -> GET
 */

/**
 * @param {any} globalDispatch - Global Dispatch
 * @param {any} authDispatch - Auth Dispatch
 * @param { CustomRequestOptions } options - payload data
 * @param { String } state - a field in the global content to access the loading state
 */

export const customRequest = async (
  globalDispatch,
  authDispatch,
  options = { endpoint: "", paylod: null, method: "GET" },
  state = RequestItems.customRequest
) => {
  if (!options.endpoint) {
    showToast(
      globalDispatch,
      "options.endpoint is a required field",
      4000,
      "error"
    );
    return { error: true };
  }
  const sdk = new MkdSDK();
  setLoading(globalDispatch, true, state);
  try {
    const result = await sdk.customRequest(
      options?.endpoint,
      options?.method,
      options?.payload
    );

    if (!result?.error) {
      // dataSuccess(globalDispatch, { message: result?.message }, state);
      setLoading(globalDispatch, false, state);
      showToast(globalDispatch, result?.message ?? "Success", 4000, "success");
      return {
        ...result,
        error: false,
        data: result?.data,
        message: result?.message,
      };
    } else {
      setLoading(globalDispatch, false, state);
      showToast(
        globalDispatch,
        result?.message ?? "An Error Occurred",
        4000,
        "error"
      );
      return {
        ...result,
        error: true,
        validation: result?.validation,
        message: result?.message,
      };
    }
  } catch (error) {
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message;
    setLoading(globalDispatch, false, state);
    // dataFailure(globalDispatch, { message }, state);
    showToast(globalDispatch, message, 4000, "error");
    tokenExpireError(authDispatch, message);
    return { error: true, message };
  }
};
