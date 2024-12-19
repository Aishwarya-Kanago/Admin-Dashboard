import React from "react";
import "./featureInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const FeatureInfo = () => {
  return (
    <>
      <h1 className="page-title">Home</h1>
      <div className="home-contents">
        <div className="revenue-home">
          <span className="moeny-container-title">Revenue</span>
          <div className="money-container">
            <span className="amount">$2,345</span>
            <span className="value-down">
              -11.5 <ArrowDownwardIcon className="arrow-icon" />
            </span>
          </div>
          <span className="moeney-container-sub">Compared to last month</span>
        </div>
        <div className="sales-home">
          <span className="moeny-container-title">Sales</span>
          <div className="money-container">
            <span className="amount">$3,500</span>
            <span className="value-down">
              -4.5 <ArrowDownwardIcon className="arrow-icon" />
            </span>
          </div>
          <span className="moeney-container-sub">Compared to last month</span>
        </div>
        <div className="cost-home">
          <span className="moeny-container-title">Cost</span>
          <div className="money-container">
            <span className="amount">$1,300</span>
            <span className="value-down">
              +2.5 <ArrowUpwardIcon className="arrow-icon" />
            </span>
          </div>
          <span className="moeney-container-sub">Compared to last month</span>
        </div>
        <div className="cost-home">
          <span className="moeny-container-title">Cost</span>
          <div className="money-container">
            <span className="amount">$1,300</span>
            <span className="value-down">
              +2.5 <ArrowUpwardIcon className="arrow-icon" />
            </span>
          </div>
          <span className="moeney-container-sub">Compared to last month</span>
        </div>
      </div>
    </>
  );
};

export default FeatureInfo;
