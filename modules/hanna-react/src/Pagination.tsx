import React, { useState } from 'react';
import { generate } from '@bramus/pagination-sequence';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type PaginationProps = {
  currentItem: number;
  itemsLength: number;
};

const Pagination = (props: PaginationProps) => {
  const { currentItem, itemsLength } = props;
  const [currentPage, setCurrentPage] = useState<number>(currentItem);
  const paginationItems = generate(currentPage, itemsLength) as Array<number | string>;

  return (
    <nav className="Pagination" aria-label="Pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="Pagination__button Pagination__button--back"
      ></button>
      {paginationItems.map((pagItem, indx) => {
        const isNumber = typeof pagItem === 'number' && !isNaN(pagItem);
        return (
          <button
            key={indx}
            className={getBemClass(
              'Pagination__button',
              pagItem === currentPage && 'active'
            )}
            onClick={() => {
              if (isNumber) {
                setCurrentPage(pagItem);
              }
            }}
            disabled={!isNumber}
            type="button"
          >
            {pagItem}
          </button>
        );
      })}
      <button
        disabled={currentPage === itemsLength}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="Pagination__button Pagination__button--forward"
      ></button>
    </nav>
  );
};

export default Pagination;
