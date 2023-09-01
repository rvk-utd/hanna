import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import Footnote from './Footnote.js';
import { WrapperElmProps } from './utils.js';

export type PageFilterProps = {
  title: string;
  summary?: React.ReactNode;
  footnote?: React.ReactNode;
  buttonRow?: React.ReactNode;
  underlap?: boolean;
} & EitherObj<{ filters: React.ReactNode }, { children: React.ReactNode }> &
  WrapperElmProps &
  SeenProp;

export const PageFilter = (props: PageFilterProps) => {
  const {
    title,
    summary,
    footnote,
    filters,
    children,
    buttonRow,
    underlap,
    startSeen,
    wrapperProps,
  } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'PageFilter',
        underlap && 'underlap',
        (wrapperProps || {}).className
      )}
      ref={ref}
    >
      <h2 className="PageFilter__title">{title}</h2>
      {summary && <div className="PageFilter__summary">{summary}</div>}
      <div className="PageFilter__filters">{filters || children}</div>
      <div className="PageFilter__buttons">{buttonRow}</div>
      {footnote && <Footnote>{footnote}</Footnote>}
    </div>
  );
};
export default PageFilter;
