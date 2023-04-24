import React, { useEffect, useRef, useState } from 'react';
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
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const [preventFocus, setPreventFocus] = useState(false);

  useEffect(() => {
    if (!preventFocus) {
      activeButtonRef.current?.focus();
    }
  }, [activePage, preventFocus]);

  const handleButtonClick = (focus: boolean, pageIndex: number) => {
    setPreventFocus(!focus);
    onChange(pageIndex);
  };

  return (
    <ul className="Pagination" aria-label="Pagination">
      <li>
        <button
          disabled={activePage === 1}
          onClick={() => handleButtonClick(activePage === 2, activePage - 1)}
          className="Pagination__button Pagination__button--back"
          aria-label="Previous page"
        ></button>
      </li>
      {paginationItems.map((pagItem, indx) => {
        const isNumber = typeof pagItem === 'number' && !isNaN(pagItem);
        return (
          <li key={indx}>
            <button
              className={getBemClass(
                'Pagination__button',
                pagItem === activePage && 'active'
              )}
              onClick={() => {
                if (isNumber) {
                  handleButtonClick(true, pagItem);
                }
              }}
              disabled={!isNumber}
              type="button"
              ref={pagItem === activePage ? activeButtonRef : undefined}
              aria-current={pagItem === activePage || undefined}
            >
              {pagItem}
            </button>
          </li>
        );
      })}
      <li>
        <button
          disabled={activePage === pageCount}
          onClick={() => handleButtonClick(activePage + 1 === pageCount, activePage + 1)}
          className="Pagination__button Pagination__button--forward"
          aria-label="Next page"
        ></button>
      </li>
    </ul>
  );
};

export default Pagination;
