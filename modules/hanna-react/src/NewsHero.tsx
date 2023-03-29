import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { getStableRandomItem } from '@reykjavik/hanna-utils';

import { BlingComboProps, Blings } from './_abstract/_Blings.js';
import { Image, ImageProps } from './_abstract/_Image.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import ShareButtons from './ShareButtons.js';

type BlingOptions =
  | 'interesting'
  | 'snake'
  | 'pentagon'
  | 'dome'
  | 'balls-small'
  | 'balls-large';

const blingOptions: Record<BlingOptions, BlingComboProps> = {
  interesting: [
    {
      type: 'circle-xlarge',
      parent: 'center',
    },
    {
      type: 'loops-small',
      color: 'secondary',
      align: 'left-ish',
      vertical: 'down-ish',
      parent: 'center',
    },
  ],
  snake: [
    {
      type: 'snake-large',
      align: 'left',
      parent: 'top',
      vertical: 'down',
    },
  ],
  pentagon: [
    {
      type: 'pentagon-large',
      align: 'left',
      parent: 'center',
    },
  ],
  dome: [
    {
      type: 'dome-large',
      align: 'left-ish',
      parent: 'top',
      vertical: 'down',
    },
  ],
  'balls-small': [
    {
      type: 'circle-large',
      align: 'left',
      parent: 'center',
    },
    {
      type: 'circle-small',
      color: 'secondary',
      align: 'right',
      parent: 'bottom',
      vertical: 'down',
    },
  ],
  'balls-large': [
    {
      type: 'halfcircle-down-large',
      align: 'left',
      parent: 'bottom',
      vertical: 'up',
    },
    {
      type: 'circle-medium',
      color: 'secondary',
      align: 'left-center',
      parent: 'bottom',
    },
  ],
};

export type NewsHeroProps = {
  title: string;
  meta?: string; //TODO: add proper date meta, see: https://github.com/rvk-utd/hanna-components/pull/55/files/5123e6a04c7ce9f52605efb55471cf233cbd1550#diff-ec21511d63acfdf8095cb4c07201c487
  summary?: string | JSX.Element;
  /** For custom sharing component  */
  sharing?: boolean | (() => JSX.Element);
  image?: ImageProps;
  blingType?: BlingOptions;
} & SeenProp;

export const NewsHero = (props: NewsHeroProps) => {
  const { title, sharing = true, meta, summary, image, blingType, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  const blings =
    (blingType && blingOptions[blingType]) || getStableRandomItem(blingOptions, title);

  return (
    <div className={getBemClass('NewsHero', [!image && 'align--right'])} ref={ref}>
      <div className="NewsHero__content">
        <h1 className="NewsHero__title">{title}</h1>
        {meta && <span className="NewsHero__meta">{meta}</span>}
        <div className="NewsHero__summary">{summary}</div>
        {sharing === true ? <ShareButtons /> : sharing && sharing()}
      </div>
      {image ? (
        <Image className="NewsHero__image" {...image} />
      ) : (
        <Blings blings={blings} />
      )}
    </div>
  );
};

export default NewsHero;
