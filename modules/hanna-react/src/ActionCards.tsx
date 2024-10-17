import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import {
  CardList,
  CardListSummaryProps,
  TextCardListProps,
  TextCardProps,
} from './_abstract/_CardList.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type ActionCardsProps = TextCardListProps &
  CardListSummaryProps &
  WrapperElmProps &
  DeprecatedSeenProp;

export type ActionCardsItemProps = TextCardProps;

export const ActionCards = (props: ActionCardsProps) => {
  const { wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={modifiedClass('ActionCards', null, (wrapperProps || {}).className)}
    >
      <CardList bemPrefix="ActionCards" {...props} wrapperProps={undefined} />
    </div>
  );
};

export default ActionCards;
