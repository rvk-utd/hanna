import React from 'react';

import { _Quote, QuoteProps } from './_abstract/_Quote';

export type PullQuoteProps = QuoteProps;

const PullQuote = (props: PullQuoteProps) => <_Quote bem="PullQuote" {...props} />;

export default PullQuote;
