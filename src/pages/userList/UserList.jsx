import React, { useEffect, useState } from "react";
import "./userList.css";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useList } from "../../UserContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const UserList = () => {
    const navigate = useNavigate();
    const { usersList: userList, setUsersList } = useList();
    const [originalData, setOriginalData] = useState(userList);
    const [filteredData, setFilteredData] = useState([]);

    const [filterInput, setFilterInput] = useState({
        searchUSer: "",
        statusInput: "All",
    });

    useEffect(() => {
        setOriginalData(userList);
        setFilteredData(userList);
    }, [userList]);

    const handleDelete = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                const newData = originalData?.filter((item) => item.id !== id);
                setUsersList(newData);
                alert("deleted successfully");
                window.location.reload();
            })
            .catch((err) => {
                alert(`Something went wrong : ${err}`);
            });
    };

    const onChangeHandler = (e) => {
        const newFilters = { ...filterInput, [e.target.name]: e.target.value };
        setFilterInput(newFilters);
    };

    useEffect(() => {
        const filterUser = originalData?.filter((item) => {
            const searchCondition =
                item.username
                    .toLowerCase()
                    .includes(filterInput.searchUSer.toLowerCase()) ||
                item.email
                    .toLowerCase()
                    .includes(filterInput.searchUSer.toLowerCase());
            const statusCondtion =
                filterInput.statusInput === "All" ||
                item.status.toLowerCase() ===
                    filterInput.statusInput.toLowerCase();

            return searchCondition && statusCondtion;
        });

        setFilteredData(filterUser);
    }, [filterInput]);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3, borderRadius: "16px" },
        {
            field: "user",
            headerName: "User name",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="userList-info">
                        <img
                            className="userList-img"
                            src={params.row.profile_pic}
                            alt=""
                        />
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
                        <Link
                            to={"/user/" + params.row.id}
                            className="edit-link"
                        >
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
                <div className="flex alignCenter justifySpaceBetween tableHeaderContainer">
                    <h3 className="page-title user-title">Users</h3>
                    <div className="flex alignCenter tableFilterContainer">
                        <div className="searchBarContainer">
                            <SearchIcon className="searchIcon" />
                            <input
                                className="tableFilterContainer__search tableFilterContainer__filter"
                                type="search"
                                placeholder="Search User"
                                name="searchUSer"
                                value={filterInput.searchUSer}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="status-info">
                            <label>Status</label>
                            <select
                                className="status tableFilterContainer__filter"
                                name="statusInput"
                                value={filterInput.statusInput}
                                onChange={onChangeHandler}
                            >
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <button
                            className="addButton"
                            onClick={() => {
                                navigate("/newUser");
                            }}
                        >
                            <PersonAddIcon />
                        </button>
                    </div>
                </div>
            </div>

            <Paper
                sx={{
                    height: 630,
                    width: "100%",
                    padding: 0,
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <DataGrid
                    rows={filteredData}
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
