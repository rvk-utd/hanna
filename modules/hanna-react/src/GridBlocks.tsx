import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { Efnistakn, getEfnistaknUrl } from '@reykjavik/hanna-utils/assets';

import { ButtonProps } from './_abstract/_Button.js';
import { Image, ImageProps } from './_abstract/_Image.js';
import { Link } from './_abstract/_Link.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import ButtonTertiary from './ButtonTertiary.js';

export type GridBlockItem = {
  title: string;
  summary: string | JSX.Element;
  icon?: Efnistakn;
  image?: ImageProps;
} & (
  | {
      href?: string;
      links: Array<ButtonProps>;
    }
  | {
      href: string;
      links?: Array<ButtonProps>;
    }
);

export type GridBlocksProps = {
  blocks: Array<GridBlockItem>;
  twocol?: boolean;
} & SeenProp;

export type GridBlocksProp1s = {
  blocks: Array<GridBlockItem>;
  twocol?: boolean;
};

export const GridBlocks = (props: GridBlocksProps) => {
  const { blocks, twocol, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className={getBemClass('GridBlocks', [twocol && 'twocol'])} ref={ref}>
      {blocks.map(({ title, summary, href, links = [], icon, image }, i) => {
        const imageProps = icon ? { src: getEfnistaknUrl(icon) } : image;
        return (
          <div key={i} className="GridBlocks__item">
            {imageProps && <Image className="GridBlocks__illustration" {...imageProps} />}
            <div className="GridBlocks__textwrap">
              <h3 className="GridBlocks__item__title">
                {href != null ? (
                  <Link className="GridBlocks__item__titlelink" href={href}>
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </h3>
              <div className="GridBlocks__item__summary">{summary}</div>
              <ul className="GridBlocks__links">
                {links.map((link, i) => {
                  return (
                    <li key={i} className="GridBlocks__link">
                      <ButtonTertiary {...link} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridBlocks;
