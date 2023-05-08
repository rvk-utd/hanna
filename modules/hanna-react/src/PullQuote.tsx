import React from 'react';

import { _Quote, QuoteProps } from './_abstract/_Quote.js';

export type PullQuoteProps = QuoteProps;

export const PullQuote = (props: PullQuoteProps) => <_Quote bem="PullQuote" {...props} />;

export default PullQuote;
