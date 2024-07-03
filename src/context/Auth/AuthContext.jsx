import React, { useReducer } from "react";
import MkdSDK from "Utils/MkdSDK";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // TODO
      // updated code
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role
      };
      
    case "LOGOUT":
      // updated code
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  React.useEffect(() => {
    // Updated code
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedToken && storedRole) {
      sdk.check(storedRole)
        .then(() => {
          dispatch({
            type: "LOGIN",
            payload: {
              user: storedUser,
              token: storedToken,
              role: storedRole,
            },
          });
        })
        .catch((err) => {
          if (err.message === "TOKEN_EXPIRED") {
            tokenExpireError(dispatch, "TOKEN_EXPIRED");
          }
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
