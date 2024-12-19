import React, { useEffect, useState } from "react";
import "./userList.css";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const UserList = () => {
  const [data, setData] = useState([]);

  const getUserData = () => {
    axios.get("http://127.0.0.1:8000/api/users/").then((res) => {
      const response = res.data;
      const processedData = [];
      response.forEach((user) => {
        const newUserObj = {
          id: user.id,
          username: user.username,
          email: user.email,
          status: user.profile?.status,
          transaction: `$ ${user.profile?.transaction}`,
          profile_pic: user.profile?.profile_pic,
        };
        processedData.push(newUserObj);
      });
      setData(processedData);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/users/${id}`)
      .then((res) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, borderRadius: "16px" },
    {
      field: "user",
      headerName: "User name",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="userList-info">
            <img className="userList-img" src={params.row.profile_pic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.5 },
    { field: "transaction", headerName: "Transaction", flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      borderRadius: "16px",
      renderCell: (params) => {
        return (
          <div className="action-icons">
            <Link to={"/user/" + params.row.id} className="edit-link">
              <EditIcon className="userList-edit-user" />
            </Link>
            <DeleteIcon
              className="userList-delete-user"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="data-table">
      <div className="userpage-topbar">
        <h3 className="page-title">Users</h3>
        <div className="search-user">
          <label for="">
            <input type="search" placeholder="Search User" />
          </label>
          <div className="status-info">
            <label>Status</label>
            <select className="status">
              <option>All</option>
              <option>Active</option>
              <option>Non-Active</option>
            </select>
          </div>
        </div>
      </div>

      <Paper
        sx={{
          height: 630,
          width: "80%",
          padding: 0,
          border: "1px solid #ddd",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ "&, [class^=MuiDataGrid]": { border: "none" } }}
        />
      </Paper>
    </div>
  );
};

export default UserList;
