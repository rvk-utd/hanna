import React from 'react';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
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
  DeprecatedSeenProp;

export const InfoBlock = (props: InfoBlockProps) => {
  const { title, subtitle, items, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('InfoBlock', null, (wrapperProps || {}).className)}
    >
      <h2 className="InfoBlock__title">{title}</h2>
      {subtitle && <div className="InfoBlock__subtitle">{subtitle}</div>}
      {items.length > 0 && (
        <ul className="InfoBlock__items">
          {items.map((item, i) => (
            <li key={i} className="InfoBlock__item">
              {item}
            </li>
          ))}
        </ul>
      )}
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
