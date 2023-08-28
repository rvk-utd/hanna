import React from 'react';

import {
  CardList,
  CardListSummaryProps,
  TextCardListProps,
  TextCardProps,
} from './_abstract/_CardList.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type ActionCardsProps = TextCardListProps &
  CardListSummaryProps &
  WrapperElmProps &
  SeenProp;

export type ActionCardsItemProps = TextCardProps;

export const ActionCards = (props: ActionCardsProps) => {
  const [ref] = useSeenEffect(props.startSeen);

  return (
    <div className="ActionCards" ref={ref}>
      <CardList bemPrefix="ActionCards" {...props} wrapperProps={undefined} />
    </div>
  );
};

export default ActionCards;
