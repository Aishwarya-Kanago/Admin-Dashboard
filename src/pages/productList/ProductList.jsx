import "./productList.css";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import React from "react";
import axios from "axios";

const ProductList = () => {
  const [data, setData] = useState([]);

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
      setData(requiredFields);
    });
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => {
        const deleteProduct = data.filter((item) => item.id !== id);
        setData(deleteProduct);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

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
            <Link to={"/product/" + params.row.id}>
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
      <h3>Product List</h3>
      <Paper sx={{ height: 630, width: "100%", padding: 0 }}>
        <DataGrid
          rows={data}
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
