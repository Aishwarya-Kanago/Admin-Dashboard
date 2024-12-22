import React, { useState, useEffect, useContext } from "react";
import FeatureInfo from "../featureInfo/FeatureInfo";
import "./home.css";
import Chart from "../chart/Chart";
import { userData } from "../../UserData";
import Topbar from "../../components/topbar/Topbar";
import WidgetSm from "../../components/widgetsm/WidgetSm";
import WidgetLg from "../../components/widgetlg/WidgetLg";
import axios from "axios";
import { userContext } from "../../App";

const Home = () => {
  const [filteredData, setFilteredData] = useState([]);

  const { data, transaction } = useContext(userContext);

  useEffect(() => {
    const sortedData = data.sort((a, b) => b.id - a.id);
    const activeUsers = sortedData.slice(0, 6);
    setFilteredData(activeUsers);
  }, [data]);

  console.log(filteredData, "meow");

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
          <WidgetSm data={filteredData} />
          <WidgetLg data={transaction} />
        </div>
      </div>
    </>
  );
};

export default Home;
