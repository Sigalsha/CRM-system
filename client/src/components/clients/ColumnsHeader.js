import React from "react";
import { CLIENTS_HEADERS } from "../../utils/constants";
import "../../styles/clients/columnsHeader.css";

const ColumnsHeader = () => {
  function formatHeader(header) {
    switch (header) {
      case "firstContact":
        return "First Contact";
      case "emailType":
        return "Email Type";
      default:
        return header;
    }
  }
  return (
    <thead>
      <tr id="columns-header-container">
        {Object.keys(CLIENTS_HEADERS).map((header, i) => (
          <th className="column-header" key={i}>
            {formatHeader(header)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ColumnsHeader;
