import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj } from '@reykjavik/hanna-utils';

import { SeenProp, useSeenEffect } from './utils/seenEffect';
import Footnote from './Footnote';

export type PageFilterProps = {
  title: string;
  summary?: React.ReactNode;
  footnote?: React.ReactNode;
  buttonRow?: React.ReactNode;
  underlap?: boolean;
} & EitherObj<{ filters: React.ReactNode }, { children: React.ReactNode }> &
  SeenProp;

const PageFilter = (props: PageFilterProps) => {
  const { title, summary, footnote, filters, children, buttonRow, underlap, startSeen } =
    props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className={getBemClass('PageFilter', underlap && 'underlap')} ref={ref}>
      <h2 className="PageFilter__title">{title}</h2>
      {summary && <div className="PageFilter__summary">{summary}</div>}
      <div className="PageFilter__filters">{filters || children}</div>
      <div className="PageFilter__buttons">{buttonRow}</div>
      {footnote && <Footnote>{footnote}</Footnote>}
    </div>
  );
};
export default PageFilter;
