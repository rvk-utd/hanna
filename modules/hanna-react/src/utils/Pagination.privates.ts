import range from '@hugsmidjan/qj/range';

type Generator = {
  (current: number, pageCount: number): Array<number | '…'>;
  // Used while testing
  prodMode?: boolean;
};

export const generatePageList: Generator = (current, pageCount) => {
  if (process.env.NODE_ENV !== 'production' && !generatePageList.prodMode) {
    if (Number(current) !== current || current !== Math.round(current)) {
      throw new Error('current parameter must be an integer');
    }
    if (Number(pageCount) !== pageCount || pageCount !== Math.round(pageCount)) {
      throw new Error('pageCount parameter must be an integer');
    }
  }

  if (pageCount <= 7) {
    return range(1, pageCount);
  }

  const min = Math.max(1, Math.min(current - 2, pageCount - 4));
  const max = Math.min(Math.max(current + 2, 5), pageCount);
  const pages: Array<number | '…'> = range(min, max);

  if (min > 1) {
    if (min > 2) {
      pages.unshift('…');
    }
    pages.unshift(1);
  }
  if (max < pageCount) {
    if (max < pageCount - 1) {
      pages.push('…');
    }
    pages.push(pageCount);
  }

  return pages;
};
