import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

const colors = {
  green: 1,
  red: 1,
};
type SharpieColor = keyof typeof colors;

const tags = {
  span: 1,
  strong: 1,
  em: 1,
  b: 1,
  i: 1,
  u: 1,
  s: 1,
};
type SharpieTag = keyof typeof tags;

export type SharpieProps = {
  color: SharpieColor;
  tag?: SharpieTag;
  children: ReactNode;
};

const Sharpie = (props: SharpieProps) => {
  const { color, tag, children } = props;

  const colorModifier = colors[color] ? color : 'green';
  const Tag = tag && tags[tag] ? tag : 'span';

  return <Tag className={getBemClass('Sharpie', colorModifier)}>{children}</Tag>;
};

export default Sharpie;
