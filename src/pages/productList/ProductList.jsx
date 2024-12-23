import "./productList.css";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";
import axios from "axios";

const ProductList = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filterInput, setFilterInput] = useState({
    searchProduct: "",
    statusInput: "All",
  });
  const getProductData = () => {
    axios.get("http://127.0.0.1:8000/api/products/").then((res) => {
      const response = res.data;
      const requiredFields = [];
      response.forEach((product) => {
        const newProductObj = {
          id: product.id,
          name: product.name,
          stock: product.stock,
          status: product.status,
          price: `$ ${product.price}`,
          product_pic: product.product_pic,
        };
        requiredFields.push(newProductObj);
      });
      setOriginalData(requiredFields);
      setFilteredData(requiredFields);
    });
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => {
        const deleteProduct = originalData.filter((item) => item.id !== id);
        setFilteredData(deleteProduct);
        setOriginalData(deleteProduct);
      })
      .catch((err) => {
        alert(`Something went wrong ${err}`);
        console.log(err);
      });
  };

  const onChangeHandler = (e) => {
    const newFilters = { ...filterInput, [e.target.name]: e.target.value };
    setFilterInput(newFilters);
  };

  useEffect(() => {
    const filterUser = originalData.filter((item) => {
      const searchCondition = item.name
        .toLowerCase()
        .includes(filterInput.searchProduct.toLowerCase());

      const statusCondtion =
        filterInput.statusInput === "All" ||
        item.status.toLowerCase() === filterInput.statusInput.toLowerCase();

      return searchCondition && statusCondtion;
    });

    setFilteredData(filterUser);
  }, [filterInput]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productList-info">
            <img
              className="productList-img"
              src={params.row.product_pic}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 160 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "price", headerName: "Price", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="action-icons">
            <Link to={"/product/" + params.row.id} className="edit-link">
              <EditIcon className="productList-edit-user" />
            </Link>
            <DeleteIcon
              className="productList-delete-user"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="product-table">
      <div className="userpage-topbar">
        <div className="flex alignCenter justifySpaceBetween tableHeaderContainer">
          <h3 className="page-title user-title">Product List</h3>
          <div className="flex alignCenter tableFilterContainer">
            <div className="searchBarContainer">
              <SearchIcon className="searchIcon" />
              <input
                className="tableFilterContainer__search tableFilterContainer__filter"
                type="search"
                placeholder="Search Product"
                name="searchProduct"
                value={filterInput.searchProduct}
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
                <option value="In_stock">In stock</option>
                <option value="Out_of_stock">Out of stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
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
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default ProductList;
