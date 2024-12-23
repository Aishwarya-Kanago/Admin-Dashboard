import axios from "axios";
import "./newproduct.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setnewProduct] = useState({});

  const onChangeProduct = (e) => {
    const currentProduct = { ...newProduct };
    let inputValue = e.target.value;

    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const localImageUrl = URL.createObjectURL(file);
        currentProduct[e.target.name] = localImageUrl;
        setnewProduct(currentProduct);
      }
      return;
    }

    if (e.target.name === "created_at") {
      inputValue = new Date(inputValue).getTime();
    }

    currentProduct[e.target.name] = inputValue;
    setnewProduct(currentProduct);
  };

  const createProduct = () => {
    axios
      .post("http://127.0.0.1:8000/api/products/", newProduct)
      .then((res) => {
        if (res.status === 201) {
          alert("Product created Sucessfully");
          navigate(`/products/`);
          window.location.reload();
        }
      })
      .catch((err) => {
        const res = err.response;
        const error_key = Object.keys(res.data)[0];
        const error_message = res.data[error_key];
        alert(`${error_key}:${error_message}`);
        console.log(res);
      });
  };

  return (
    <div className="newproduct">
      <div className="newproduct-title">
        <h1>New Product</h1>
      </div>
      <div className="load-img">
        <p>Image</p>
        <label htmlFor="file"></label>
        <input
          type="file"
          id="file"
          onChange={onChangeProduct}
          name="product_pic"
        />
      </div>
      <div className="newproduct-name">
        <label>Name</label>
        <input
          type="text"
          placeholder="Apple Airpods"
          name="name"
          onChange={onChangeProduct}
        />
      </div>
      <div className="newproduct-description">
        <label>Description</label>
        <input
          type="textarea"
          placeholder="Description"
          name="description"
          onChange={onChangeProduct}
        />
      </div>
      <div className="newproduct-price">
        <label>Price $</label>
        <input
          type="text"
          placeholder="220"
          onChange={onChangeProduct}
          name="price"
        />
      </div>
      <div className="newproduct-stock">
        <label>Stock</label>
        <input
          type="text"
          placeholder="123"
          onChange={onChangeProduct}
          name="stock"
        />
      </div>
      <div className="newproduct-status">
        <label>Status</label>
        <select name="status" id="status" onChange={onChangeProduct}>
          <option>in_stock</option>
          <option>out_of_stock</option>
          <option>discontinued</option>
        </select>
      </div>
      <div className="newproduct-stock">
        <label>Product Created At</label>
        <input
          type="date"
          placeholder="10.10.2022"
          name="created_at"
          onChange={onChangeProduct}
        />
      </div>
      <div className="newproduct-sales">
        <label>Sales</label>
        <input
          type="text"
          placeholder="5000"
          onChange={onChangeProduct}
          name="sales"
        />
      </div>
      <div className="newproduct-active">
        <label>Active</label>
        <select name="active" id="active" onChange={onChangeProduct}>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <button className="Create-newproduct" onClick={createProduct}>
        Create
      </button>
    </div>
  );
};

export default NewProduct;
