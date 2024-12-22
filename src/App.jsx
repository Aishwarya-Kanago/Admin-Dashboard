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

import React, { createContext, useEffect, useState } from "react";
import Topbar from "./components/topbar/Topbar";
import Product from "./pages/product/Product";
import axios from "axios";

export const userContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [usersList, setUsersList] = useState();
  const [transaction, setTransaction] = useState([]);

  const getUserData = () => {
    axios.get("http://127.0.0.1:8000/api/users/").then((res) => {
      const response = res.data;
      setData(response);

      const topTransations = response
        .sort((a, b) => b.profile?.transaction - a.profile?.transaction)
        .slice(0, 6);
      setTransaction(topTransations);

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
      setUsersList(processedData);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <userContext.Provider value={{ data, transaction }}>
      <Router>
        <div className="home-page">
          <Sidebar />
          <div className="parent-topbar">
            <Topbar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>

              <Route
                path="/userList"
                element={<UserList userData={usersList} />}
              ></Route>
              <Route path="/user/:userID" element={<User />}></Route>
              <Route path="/newUser" element={<NewUser />}></Route>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/newproduct" element={<NewProduct />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </userContext.Provider>
  );
}

export default App;
