import React from 'react';
import { generate } from '@bramus/pagination-sequence';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type PaginationProps = {
  activePage: number;
  pageCount: number;
  onChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { activePage, pageCount, onChange } = props;
  const paginationItems = generate(activePage, pageCount, 1, 1);

  return (
    <nav className="Pagination" aria-label="Pagination">
      <button
        disabled={activePage === 1}
        onClick={() => onChange(activePage - 1)}
        className="Pagination__button Pagination__button--back"
      ></button>
      {paginationItems.map((pagItem, indx) => {
        const isNumber = typeof pagItem === 'number' && !isNaN(pagItem);
        return (
          <button
            key={indx}
            className={getBemClass(
              'Pagination__button',
              pagItem === activePage && 'active'
            )}
            onClick={() => {
              if (isNumber) {
                onChange(pagItem);
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
        disabled={activePage === pageCount}
        onClick={() => onChange(activePage + 1)}
        className="Pagination__button Pagination__button--forward"
      ></button>
    </nav>
  );
};

export default Pagination;
