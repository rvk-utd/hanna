import React, { ReactNode } from 'react';

export type FootnoteProps = {
  children: ReactNode;
};

const Footnote = (props: FootnoteProps) => (
  <div className="Footnote">{props.children}</div>
);

export default Footnote;
