import React from 'react';

import { CardList, TextCardListProps } from './_abstract/_CardList';
import { SeenProp, useSeenEffect } from './utils/seenEffect';

export type ActionCardsProps = TextCardListProps & SeenProp;

const ActionCards = (props: ActionCardsProps) => {
  const [ref] = useSeenEffect(props.startSeen);

  return (
    <div className="ActionCards" ref={ref}>
      <CardList {...props} bemPrefix="ActionCards" />
    </div>
  );
};

export default ActionCards;
