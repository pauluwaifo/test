import React, { useEffect, useState } from "react";
import load from "../assets/images/no_data_found.png";
import { AuthContext, tokenExpireError } from "Context/Auth";
import { useNavigate } from "react-router";
import DragContainer from "Components/DragContainer";

const AdminDashboardPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const fetchData = async (page) => {
    try {
      const res = await fetch(
        `https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-project":
              "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            payload: {},
            page: page,
            limit: itemsPerPage,
          }),
        }
      );
      const result = await res.json();

      if (res.ok && result) {
        setItems(result && result.list ? result.list : null);
        setTotalItems(result.total);
      } else {
        console.log(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { dispatch } = React.useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
    console.log(items);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    console.log("clicked");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    nav("/admin/login");
  };

  return (
    <>

      <div className="flex justify-center wrap flex-col text-gray-700 p-4">
        <div className="flex flex-row justify-between">
          <p className="text-4xl">Todays Leader board</p>
          <button
            className="p-2 border rounded-sm m-1 bg-green-500 text-white"
            onClick={() => handleSignOut()}
          >
            Sign out
          </button>
        </div>
        <DragContainer items={items} setItems={setItems} />
        <div className="flex flex-row">
          <button
            className="p-2 border rounded-sm m-1 bg-green-500 text-white"
            onClick={() => handlePreviousPage()}
          >
            Previous
          </button>
          <button
            className="p-2 border rounded-sm m-1 bg-green-500 text-white"
            onClick={() => handleNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
