import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import NameCard, { NameCardProps } from './NameCard.js';
import { WrapperElmProps } from './utils.js';

type NameCardsProps = {
  items: Array<Omit<NameCardProps, 'wrapperProps'>>;
} & WrapperElmProps;

export const NameCards = (props: NameCardsProps) => {
  const { items, wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={modifiedClass('NameCards', null, (wrapperProps || {}).className)}
    >
      {items.map((item, i) => (
        <NameCard key={i} {...item} />
      ))}
    </div>
  );
};

export default NameCards;
