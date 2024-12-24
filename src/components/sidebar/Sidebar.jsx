import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

import EmailIcon from "@mui/icons-material/Email";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MessageIcon from "@mui/icons-material/Message";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReportIcon from "@mui/icons-material/Report";
import MenuIcon from "@mui/icons-material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Sidebar = () => {
  const [menuOpen, setmenuOpen] = useState(false);

  return (
    <>
      <ClickAwayListener onClickAway={() => setmenuOpen(false)}>
        <div
          className={`nav-bar-icon ${menuOpen ? "icon-open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuIcon
            onClick={() => setmenuOpen(!menuOpen)}
            className="menu-icon"
          />
        </div>
      </ClickAwayListener>

      <div
        className={`main-menu ${menuOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="logo">
          <img
            src="https://i.pinimg.com/550x/a9/2a/b5/a92ab56a225cef3bf88e624df4bcf025.jpg"
            alt="travel-logo"
          />
          <span>Hello Admin</span>
        </div>
        <div className="dashboard">
          <h3>Dashboard</h3>
          <Link to="/" className="link">
            <div className="home">
              <HomeIcon />
              <span>Home</span>
            </div>
          </Link>
          <div className="analytics">
            <AnalyticsOutlinedIcon />
            <span>Analytics</span>
          </div>
          <div className="sales">
            <TrendingUpIcon />
            <span>Sales</span>
          </div>
        </div>
        <div className="quick-menu">
          <h3>Quick Menu</h3>
          <Link to="/userList" className="link">
            <div className="users">
              <PersonIcon />
              <span>Users</span>
            </div>
          </Link>

          <Link to="/products" className="link">
            <div className="products">
              <InventoryIcon />
              <span>Products</span>
            </div>
          </Link>
          <div className="transactions">
            <AttachMoneyIcon />
            <span>Transactions</span>
          </div>
          <div className="reports">
            <AssessmentOutlinedIcon />
            <span>Reports</span>
          </div>
        </div>
        <div className="notifications">
          <h3>Notifications</h3>
          <div className="mail">
            <EmailIcon />
            <span>Mail</span>
          </div>
          <div className="feedback">
            <FeedbackIcon />
            <span>Feedback</span>
          </div>
          <div className="messages">
            <MessageIcon />
            <span>Messages</span>
          </div>
        </div>
        <div className="staff">
          <h3>Staff</h3>
          <div className="manage">
            <ManageAccountsIcon />
            <span>Manage</span>
          </div>
          <div className="analytics">
            <AnalyticsOutlinedIcon />
            <span>Analytics</span>
          </div>
          <div className="reports-staff">
            <ReportIcon />
            <span>Reports</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
