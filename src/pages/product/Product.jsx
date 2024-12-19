import "./product.css";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Chart from "../chart/Chart";
import { productData } from "../../UserData";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";

const Product = () => {
  console.log("hey");

  const [product, setProduct] = useState({});
  const { productId } = useParams();
  console.log(product, "prod");

  const getProductData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${productId}/`)
      .then((res) => {
        const response = res.data;
        setProduct(response);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  const onChangeHandler = (e) => {
    const newProduct = { ...product };

    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const localImageUrl = URL.createObjectURL(file);
        newProduct[e.target.name] = localImageUrl;
        setProduct(newProduct);
      }
      return;
    }

    newProduct[e.target.name] = e.target.value;
    setProduct(newProduct);
  };

  const updateHandler = (e) => {
    axios
      .put(`http://127.0.0.1:8000/api/products/${productId}/`, product)
      .then((res) => {
        if (res.status == 200) {
          alert("Product updated Sucessfully");
        }
      });
  };

  return (
    <div className="product">
      <div className="product-title-container">
        <h1 className="product-title">Product</h1>
        <Link to="/newproduct">
          <button className="product-add-btn">Create</button>
        </Link>
      </div>
      <div className="product-top">
        <div className="product-topleft">
          <Chart data={productData} datakey="Sales" title="Sales Performance" />
        </div>
        <div className="product-topright">
          <div className="productinfo-top">
            <img src={product.product_pic} alt="" className="productinfo-img" />
            <span className="productname">{product.name}</span>
          </div>
          <div className="productinfo-bottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id :</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description :</span>
              <span className="productInfoValue">{product.description}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price :</span>
              <span className="productInfoValue">$ {product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Stock :</span>
              <span className="productInfoValue">{product.stock}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales :</span>
              <span className="productInfoValue">{product.sales}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active :</span>
              <span className="productInfoValue">{product.active}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Status :</span>
              <span className="productInfoValue">{product.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom-page">
        <form className="product-form">
          <div className="product-name">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Apple AirPod"
              name="name"
              value={product.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="product-sales">
            <label>Sales</label>
            <input
              type="text"
              placeholder="2200"
              name="sales"
              value={product.sales}
              onChange={onChangeHandler}
            />
          </div>
          <div className="product-stock">
            <label>Stock</label>
            <input
              type="text"
              placeholder="220"
              name="stock"
              value={product.stock}
              onChange={onChangeHandler}
            />
          </div>
          <div className="product-price">
            <label>Price</label>
            <input
              type="text"
              placeholder="220"
              name="stock"
              value={`$ ${product.price}`}
              onChange={onChangeHandler}
            />
          </div>
          <div className="product-stock">
            <label>Status</label>
            <select
              name="status"
              value={product.status}
              onChange={onChangeHandler}
            >
              <option>in_Stock</option>
              <option>out_of_stock</option>
              <option>discontinued</option>
            </select>
          </div>
          <div className="product-active">
            <label>Active</label>
            <select
              name="active"
              id="active"
              value={product.active}
              onChange={onChangeHandler}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </form>

        <div className="product-update">
          <div className="productupload-img">
            <img src={product.product_pic} alt="user-img" />
            <label htmlFor="file">
              <PublishIcon />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              name="product_pic"
              onChange={onChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="product-update-btn"
            onClick={updateHandler}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
