import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

export type ProcessOverviewItemProps = {
  title: string;
  content: string | JSX.Element;
};

export type ProcessOverviewProps = {
  title: string;
  items: Array<ProcessOverviewItemProps>;
  attention?: string | JSX.Element;
  transparent?: boolean;
  narrow?: boolean;
};

export const ProcessOverview = (props: ProcessOverviewProps) => {
  const { title, items, attention, transparent, narrow } = props;

  return (
    <div
      className={modifiedClass('ProcessOverview', [
        transparent && 'transparent',
        narrow && 'narrow',
      ])}
    >
      <h2 className="ProcessOverview__title">{title}</h2>
      {items.map(({ title, content }, i) => {
        return (
          <div key={i} className="ProcessOverview__item">
            <h3 className="ProcessOverview__item__title">{title}</h3>
            <div className="ProcessOverview__item__content">{content}</div>
          </div>
        );
      })}

      {attention && <div className="ProcessOverview__attention">{attention}</div>}
    </div>
  );
};

export default ProcessOverview;
