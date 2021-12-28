import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav><ul className="my-pagination">
      {pages.map((page) => (
        <li key={page}
          className={"my-page " + (page === currentPage ? "my-current-page" : "")}
          onClick={() => onPageChange(page)}>{page}
        </li>
      ))}
    </ul></nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
