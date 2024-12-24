import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newProduct/newProduct";
import "./styles.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Topbar from "./components/topbar/Topbar";
import Product from "./pages/product/Product";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

function App() {

  return (
    <Router>
      <UserContextProvider>
        <div className="home-page">
          <Sidebar />
          <div className="parent-topbar">
            <Topbar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/userList" element={<UserList />}></Route>
              <Route path="/user/:userID" element={<User />}></Route>
              <Route path="/newUser" element={<NewUser />}></Route>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/newproduct" element={<NewProduct />}></Route>
            </Routes>
          </div>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
