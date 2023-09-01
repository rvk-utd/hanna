import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type InfoBlockProps = {
  title: string;
  subtitle?: string | JSX.Element;
  items: Array<string | JSX.Element>;
} & EitherObj<
  { attention?: string | JSX.Element },
  { extraInfo?: string | JSX.Element }
> &
  WrapperElmProps &
  SeenProp;

export const InfoBlock = (props: InfoBlockProps) => {
  const { title, subtitle, items, startSeen, wrapperProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('InfoBlock', null, (wrapperProps || {}).className)}
      ref={ref}
    >
      <h2 className="InfoBlock__title">{title}</h2>
      {subtitle && <div className="InfoBlock__subtitle">{subtitle}</div>}
      <ul className="InfoBlock__items">
        {items.map((item, i) => (
          <li key={i} className="InfoBlock__item">
            {item}
          </li>
        ))}
      </ul>
      {'extraInfo' in props && (
        <div className="InfoBlock__extrainfo">{props.extraInfo}</div>
      )}
      {'attention' in props && (
        <div className="InfoBlock__attention">{props.attention}</div>
      )}
    </div>
  );
};

export default InfoBlock;
