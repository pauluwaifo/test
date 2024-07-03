import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SnackBar from "Components/SnackBar";
import { AuthContext } from "Context/Auth";
import AdminLoginPage from "Pages/AdminLoginPage";
import NotFoundPage from "Pages/NotFoundPage";
import AdminDashboardPage from "Pages/AdminDashboardPage";
import AdminListReceipts from "Pages/AdminListReceipts";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
          exact
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route
            exact
            path="/admin/receipt"
            element={<AdminListReceipts />}
          ></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state, dispatch } = React.useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (user && token && role) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
          token: token,
          role: role,
        },
      });
      nav("/admin/dashboard");
    } else {
      nav("/admin/login");
    }

  }, [dispatch, nav]);

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
