import React, { useState } from 'react';
import Pagination from '@reykjavik/hanna-react/Pagination';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Pagination',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Pagination: StoryComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      activePage={currentPage}
      pageCount={25}
      onChange={(page) => setCurrentPage(page)}
    />
  );
};
