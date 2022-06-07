import React from 'react';

import { _Quote, QuoteProps } from './_abstract/_Quote';

export type BlockQuoteProps = QuoteProps;

const BlockQuote = (props: BlockQuoteProps) => <_Quote bem="BlockQuote" {...props} />;

export default BlockQuote;
