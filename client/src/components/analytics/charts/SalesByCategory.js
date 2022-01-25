import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text
} from "recharts";
import { SALES_BY_CATEGORY, COLORS } from "../../../utils/constants";
import "../../../styles/analytics/analytics.css";
import "../../../styles/analytics/charts/salesByCategory.css";

const SalesByCategory = (props) => {
  const [category, setCategory] = useState("country");

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  const generateCategoryData = () => {
    const { getSalesByCategory, countries, owners, emailTypes, years } = props;

    switch (category) {
      case "country":
        return getSalesByCategory(countries);
      case "owner":
        return getSalesByCategory(owners);
      case "emailType":
        return getSalesByCategory(_sortEmailTypes(emailTypes));
      case "year":
        return getSalesByCategory(years);
      default:
        return getSalesByCategory(countries);
    }
  };

  const generateAreaColor = () => {
    switch (category) {
      case "country":
        return COLORS["brown"];
      case "owner":
        return COLORS["yellow"];
      case "emailType":
        return COLORS["orange"];
      case "year":
        return COLORS["lightgray"];
      default:
        return COLORS["lightgray"];
    }
  };

  const _sortEmailTypes = (emailTypes) => {
    return Object.keys(emailTypes)
      .sort()
      .reduce((obj, key) => {
        obj[key] = emailTypes[key];
        return obj;
      }, {});
  };

  return (
    <div className="chart-wrapper">
      <div className="category-header">
        <h5 className="chart-header">Sales by</h5>
        <label htmlFor="sales by"></label>
        <select
          className="select-category"
          value={category}
          onChange={handleCategoryChange}
        >
          {Object.keys(SALES_BY_CATEGORY).map((c, i) => {
            return (
              <option value={c} key={i} name={c}>
                {SALES_BY_CATEGORY[c]}
              </option>
            );
          })}
        </select>
      </div>
      <AreaChart
        width={400}
        height={300}
        data={generateCategoryData()}
        margin={{ top: 20, bottom: 5, right: 5, left: 5 }}
        fontSize={12}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={2}
          dot={{ fill: COLORS["lightgray"] }}
        />
        <XAxis dataKey="name">
          <Text width={12} />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="sales"
          stroke={generateAreaColor()}
          fill={generateAreaColor()}
          fillOpacity={0.8}
        />
      </AreaChart>
    </div>
  );
};

export default SalesByCategory;
