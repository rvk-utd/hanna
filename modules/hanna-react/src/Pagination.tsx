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
  const [lastClickedButton, setLastClickedButton] = useState<'arrow' | 'normal' | null>(
    null
  );

  useEffect(() => {
    if (lastClickedButton === 'normal') {
      activeButtonRef.current?.focus();
    }
  }, [paginationItems, lastClickedButton]);

  const handleButtonClick = (button: 'arrow' | 'normal', pageCount: number) => {
    setLastClickedButton(button);
    onChange(pageCount);
  };

  return (
    <nav className="Pagination" aria-label="Pagination">
      <button
        disabled={activePage === 1}
        onClick={() => handleButtonClick('arrow', activePage - 1)}
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
                handleButtonClick('normal', pagItem);
              }
            }}
            disabled={!isNumber}
            type="button"
            ref={pagItem === activePage ? activeButtonRef : undefined}
          >
            {pagItem}
          </button>
        );
      })}
      <button
        disabled={activePage === pageCount}
        onClick={() => handleButtonClick('arrow', activePage + 1)}
        className="Pagination__button Pagination__button--forward"
      ></button>
    </nav>
  );
};

export default Pagination;
