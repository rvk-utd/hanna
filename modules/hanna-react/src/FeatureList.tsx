import React, { CSSProperties } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { Efnistakn } from '@reykjavik/hanna-utils/assets';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import Bling from './Bling.js';
import { WrapperElmProps } from './utils.js';

export type FeatureListProps = {
  title: string;
  features: Array<{
    icon?: Efnistakn;
    iconUrl?: string;
    name: string;
  }>;
} & WrapperElmProps &
  SeenProp;

export const FeatureList = (props: FeatureListProps) => {
  const { title, features, startSeen, wrapperProps } = props;

  const [ref] = useSeenEffect(startSeen);
  const _features = features.length ? features : [{ name: '...' }];
  return (
    <>
      <Bling type="snake-large" align="left" vertical="down-ish" />

      <div
        {...wrapperProps}
        className={modifiedClass('FeatureList', null, (wrapperProps || {}).className)}
        ref={ref}
      >
        <h2 className="FeatureList__title">{title}</h2>
        <ul className="FeatureList__list">
          {_features.map(({ name, icon, iconUrl }, i) => (
            <li
              key={i}
              className="FeatureList__feature"
              style={
                iconUrl
                  ? ({ '--efnistakn': `url("${iconUrl}")` } as CSSProperties)
                  : undefined
              }
              data-efnistakn={!iconUrl ? icon : undefined}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FeatureList;
