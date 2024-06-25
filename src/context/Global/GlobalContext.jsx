import React, { useReducer } from "react";
import {
  REQUEST_FAILED,
  REQUEST_LOADING,
  REQUEST_SUCCESS,
  SET_GLOBAL_PROPERTY,
} from "./GlobalConstants";

/**
 * @typedef {Object} GlobalState
 * @property {string} globalMessage - Toast Message.
 * @property {"success"| "error" | "warning"} toastStatus - Toast State - "success" | "error" | "warning".
 * @property {boolean} isOpen
 * @property {string} path
 */

/**
 * The Value of the Global State .
 * @param {GlobalState} initialState
 */

const initialState = {
  globalMessage: "",
  toastStatus: "success",
  isOpen: true,
  path: "",
};

export const GlobalContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action?.type) {
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: action.payload.message,
        toastStatus: action.payload.toastStatus,
      };
    case "SETPATH":
      return {
        ...state,
        path: action.payload.path,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    case SET_GLOBAL_PROPERTY:
      if (action.property.includes(".")) {
        const [prop, field] = action.property.split(".");
        return {
          ...state,
          [prop]: { ...state[prop], [field]: action?.payload },
        };
      } else {
        return {
          ...state,
          [action.property]: action?.payload,
        };
      }
    case REQUEST_LOADING:
      return {
        ...state,
        [action.item]: {
          ...state[action?.item],
          loading: action?.payload,
        },
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        [action.item]: {
          ...state[action?.item],
          ...action?.payload,
          data: action?.payload?.data,
          error: false,
          success: true,
          loading: false,
        },
      };
    case REQUEST_FAILED:
      return {
        ...state,
        [action.item]: {
          ...state[action?.item],
          ...action?.payload,
          error: true,
          success: false,
          loading: false,
        },
      };
    default:
      return state;
  }
};

/**
 * @param {"success"| "error" | "warning"} toastStatus
 * @param {any} dispatch
 * @param {string} message
 * @param {number} timeout
 */

export const showToast = (
  dispatch,
  message,
  timeout = 3000,
  toastStatus = "success"
) => {
  dispatch({
    type: "SNACKBAR",
    payload: {
      message,
      toastStatus,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    });
  }, timeout);
};

export const setGlobalProjectRow = (dispatch, data) => {
  dispatch({
    type: "SET_PROJECT_ROW",
    payload: data,
  });
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
