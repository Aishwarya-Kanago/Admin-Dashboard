import React, { useState, useEffect } from "react";
import FeatureInfo from "../featureInfo/FeatureInfo";
import "./home.css";
import Chart from "../chart/Chart";
import { userData } from "../../UserData";
import Topbar from "../../components/topbar/Topbar";
import WidgetSm from "../../components/widgetsm/WidgetSm";
import WidgetLg from "../../components/widgetlg/WidgetLg";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const getUserData = () => {
    axios.get("http://127.0.0.1:8000/api/users/").then((res) => {
      const response = res.data;

      const sortedData = response.sort((a, b) => b.id - a.id);
      const activeUsers = sortedData.slice(0, 6);
      setData(activeUsers);

      const topTransations = response
        .sort((a, b) => b.profile?.transaction - a.profile?.transaction)
        .slice(0, 6);
      setTransaction(topTransations);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

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
          <WidgetSm data={data} />
          <WidgetLg data={transaction} />
        </div>
      </div>
    </>
  );
};

export default Home;
