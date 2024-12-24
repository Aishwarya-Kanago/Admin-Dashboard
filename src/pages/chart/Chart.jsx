import React from "react";
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, datakey, grid }) => {
  return (
    <div className="chart-main">
      <div className="chart-container">
        <h3 className="sub-title">{title}</h3>
        <ResponsiveContainer width="95%">
          <LineChart data={data}>
            {grid && <CartesianGrid stroke="whitesmoke" />}
            <XAxis dataKey="name" stroke="black" />
            <Line type="monotone" dataKey={datakey} stroke="#6e73bb" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
