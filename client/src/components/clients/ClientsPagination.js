import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/clients/clientsPagination.css";

const ClientsPagination = ({
  pageCount,
  pageLimit,
  updateDisplayByPage,
  isPageReset,
  currentClients
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="clients-pagination-wrapper">
      <span
        className={`page-arrow
            ${currentPage === 1 ? "page-cursor-not-allowed" : "page-cursor"}
          `}
        onClick={() =>
          this.previousDisplay(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} style={{ marginRight: 5 }} />
        previous
      </span>
      <PageNumbers
        pageCount={this.props.pageCount}
        pageLimit={this.props.pageLimit}
        handleSinglePageClick={this.handleSinglePageClick}
      />
      <span
        onClick={() =>
          this.nextDisplay(
            currentPage < pageCount ? currentPage + 1 : currentPage
          )
        }
        className={`page-arrow
            ${
              currentPage === pageCount
                ? "page-cursor-not-allowed"
                : "page-cursor"
            }
          `}
      >
        next
        <FontAwesomeIcon icon={faArrowCircleRight} style={{ marginLeft: 5 }} />
      </span>
    </div>
  );
};
export default ClientsPagination;
