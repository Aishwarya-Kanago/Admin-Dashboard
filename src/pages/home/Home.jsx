import React, { useState, useEffect, useContext } from "react";
import FeatureInfo from "../featureInfo/FeatureInfo";
import "./home.css";
import Chart from "../chart/Chart";
import { userData } from "../../UserData";
import Topbar from "../../components/topbar/Topbar";
import WidgetSm from "../../components/widgetsm/WidgetSm";
import WidgetLg from "../../components/widgetlg/WidgetLg";
import axios from "axios";
import { UserContextProvider } from "../../UserContext";

const Home = () => {
  return (
    <>
      <div className="home-page-info">
        <FeatureInfo />
        <Chart
          title="Active User Details"
          data={userData}
          datakey="Active User"
          grid
        />
        <div className="new-joinee-tab">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </>
  );
};

export default Home;
