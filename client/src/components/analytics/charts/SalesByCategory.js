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
import {
  SALES_BY_CATEGORY,
  COLORS,
  ANALYTICS_HEADERS
} from "../../../utils/constants";
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
        return COLORS["deepBlue"];
      case "owner":
        return COLORS["primaryBlue"];
      case "emailType":
        return COLORS["secondaryBlue"];
      case "year":
        return COLORS["lightestBlue"];
      default:
        return COLORS["backgroundGray"];
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
        <h5 className="chart-header">{ANALYTICS_HEADERS["salesByCategory"]}</h5>
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
        width={350}
        height={200}
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
