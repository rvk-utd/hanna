import React from 'react';

import NameCard, { NameCardProps } from './NameCard';

type NameCardsProps = {
  items: Array<NameCardProps>;
};

export const NameCards = (props: NameCardsProps) => {
  const { items } = props;
  return (
    <div className="NameCards">
      {items.map((item, i) => (
        <NameCard key={i} {...item} />
      ))}
    </div>
  );
};

export default NameCards;
