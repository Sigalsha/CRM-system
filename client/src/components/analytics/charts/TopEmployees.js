import React from "react";
import {
  Bar,
  Text,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  BarChart,
  CartesianGrid
} from "recharts";
import { COLORS, ANALYTICS_HEADERS } from "../../../utils/constants";
import "../../../styles/analytics/analytics.css";

const TopEmployees = ({ owners, getOwners }) => {
  return (
    <div className="chart-wrapper">
      <h5 className="chart-header">{ANALYTICS_HEADERS["topEmployees"]}</h5>
      <BarChart
        width={350}
        height={200}
        data={getOwners(owners)}
        margin={{ top: 25, bottom: 5, right: 5, left: 5 }}
        fontSize={12}
      >
        <CartesianGrid stroke={COLORS["backgroundGray"]} />
        <XAxis dataKey="name">
          <Text width={12} />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill={COLORS["yellow"]} barSize={20}>
          <LabelList
            dataKey="name"
            position="top"
            fontSize={9}
            marginBottom={20}
            marginLeft={20}
            marginRight={20}
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default TopEmployees;
