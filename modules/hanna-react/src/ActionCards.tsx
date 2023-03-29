import React from 'react';

import {
  CardList,
  CardListSummaryProps,
  TextCardListProps,
  TextCardProps,
} from './_abstract/_CardList.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';

export type ActionCardsProps = TextCardListProps & CardListSummaryProps & SeenProp;

export type ActionCardsItemProps = TextCardProps;

export const ActionCards = (props: ActionCardsProps) => {
  const [ref] = useSeenEffect(props.startSeen);

  return (
    <div className="ActionCards" ref={ref}>
      <CardList {...props} bemPrefix="ActionCards" />
    </div>
  );
};

export default ActionCards;
