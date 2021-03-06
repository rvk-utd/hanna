import React from 'react';

import { SeenProp, useSeenEffect } from './utils/seenEffect';

export type InfoBlockProps = {
  title: string;
  subtitle: string | JSX.Element;
  items: Array<string | JSX.Element>;
} & (
  | { attention?: undefined; extraInfo?: undefined }
  | { attention: string | JSX.Element; extraInfo?: undefined }
  | { extraInfo: string | JSX.Element; attention?: undefined }
) &
  SeenProp;

const InfoBlock = (props: InfoBlockProps) => {
  const { title, subtitle, items, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className="InfoBlock" ref={ref}>
      <h2 className="InfoBlock__title">{title}</h2>
      <div className="InfoBlock__subtitle">{subtitle}</div>
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
