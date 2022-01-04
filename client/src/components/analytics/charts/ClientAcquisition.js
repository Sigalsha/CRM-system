import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import utils from "../../../utils/utils";
import { COLORS } from "../../../utils/constants";
import "../../../styles/analytics/analytics.css";
import "../../../styles/analytics/charts/clientAcquisition.css";

const colors = [COLORS["brown"], COLORS["yellow"], COLORS["orange"]];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ClientAcquisition = ({ sales, salesOf2018, years }) => {
  const getLast6MonthsOf2018 = () => {
    let lastHalfYear = 0;
    for (let i = 5; i < 12; i++) {
      lastHalfYear += utils.getSalesByMonth(salesOf2018, i);
    }
    return lastHalfYear;
  };

  const before2018 = () =>
    sales.filter((s) => utils.isFrom2018(s.firstContact, true));

  const getSalesData = () => {
    const data = [
      {
        name: "last month of 2018",
        value: utils.getSalesByMonth(salesOf2018, 11)
      },
      { name: "last 6 months of 2018", value: getLast6MonthsOf2018() },
      { name: "before 2018", value: before2018().length }
    ];
    return data;
  };

  const getSalesDataByYears = () => {
    const data = [];
    for (const [key, value] of Object.entries(years)) {
      data.push({ name: key, value: value });
    }
    return data;
  };

  const generatePie = (pieData, renderCustomizedLabel) => {
    return (
      <ResponsiveContainer width={250} height={250}>
        <PieChart fontSize={13}>
          <Pie
            data={pieData()}
            cx="50%"
            cy="50%"
            labelLine={renderCustomizedLabel ? false : true}
            label={
              renderCustomizedLabel
                ? renderCustomizedLabel
                : (name) => `${name.value}`
            }
            outerRadius={80}
            dataKey="value"
            legendType={"rect"}
          >
            {pieData().map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="pies-wrapper">
      <h5 className="chart-header">Client Acquisition</h5>
      <div className="pie-wrapper">
        <div>
          {generatePie(getSalesDataByYears(), renderCustomizedLabel())}
          <p className="pie-header">Sales by Year</p>
        </div>
        <div>
          {generatePie(getSalesData())}
          <p className="pie-header">Sales comparison</p>
        </div>
      </div>
    </div>
  );
};

export default ClientAcquisition;
