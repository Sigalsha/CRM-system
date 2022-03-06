import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { CLIENT_PAGINATION } from "../../utils/constants";
import "../../styles/clients/clientsPagination.css";

const ClientsPagination = ({
  displayByPage,
  pageLimit,
  pageCount,
  isPageReset
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [isPageReset]);

  /*   componentDidUpdate(prevProps) {
    if (
      props.isPageReset &&
      props.isPageReset !== prevProps.isPageReset
    ) {
      setState({ currentPage: 1 });
    }
  } */

  const previousDisplay = (pageNum) => {
    displayByPage(-1, pageNum);
    setCurrentPage(pageNum);
  };

  const nextDisplay = (pageNum) => {
    displayByPage(1, pageNum);
    setCurrentPage(pageNum);
  };

  const handleSinglePageClick = (number) => {
    if (currentPage > number) {
      previousDisplay(number);
    } else if (currentPage < number) {
      nextDisplay(number);
    }
  };

  return (
    <div className="clients-pagination-wrapper">
      <button
        className={`page-arrow
            ${currentPage === 1 ? "page-cursor-not-allowed" : "page-cursor"}
          `}
        onClick={() =>
          previousDisplay(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} style={{ marginRight: 5 }} />
        {CLIENT_PAGINATION["prev"]}
      </button>
      <PageNumbers
        pageCount={pageCount}
        pageLimit={pageLimit}
        handleSinglePageClick={handleSinglePageClick}
      />
      <button
        onClick={() =>
          nextDisplay(currentPage < pageCount ? currentPage + 1 : currentPage)
        }
        className={`page-arrow
            ${
              currentPage === pageCount
                ? "page-cursor-not-allowed"
                : "page-cursor"
            }
          `}
      >
        {CLIENT_PAGINATION["next"]}
        <FontAwesomeIcon icon={faArrowCircleRight} style={{ marginLeft: 5 }} />
      </button>
    </div>
  );
};

const PageNumbers = ({ pageCount, handleSinglePageClick, pageLimit }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageCount); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (e) => {
    handleSinglePageClick(Number(e.target.id));
  };

  return (
    <ul className="page-numbers">
      {pageNumbers.map((num) => {
        return (
          <li
            key={num}
            id={num}
            className={`page-number
              ${
                Math.ceil(pageLimit / 20) === num
                  ? "current-page-number"
                  : "not-current-page"
              }
              ${
                num > Math.ceil(pageLimit / 20) + 10 ||
                num < Math.ceil(pageLimit / 20) - 10
                  ? "page-not-in-range"
                  : ""
              }
            `}
            onClick={handlePageClick}
          >
            {num}
          </li>
        );
      })}
    </ul>
  );
};
export default ClientsPagination;
