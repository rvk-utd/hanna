import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { Efnistakn, getEfnistaknUrl } from '@reykjavik/hanna-utils/assets';

import { ButtonProps } from './_abstract/_Button.js';
import { Image, ImageProps } from './_abstract/_Image.js';
import { Link } from './_abstract/_Link.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import ButtonTertiary from './ButtonTertiary.js';
import { WrapperElmProps } from './utils.js';

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
} & WrapperElmProps &
  DeprecatedSeenProp;

export const GridBlocks = (props: GridBlocksProps) => {
  const { blocks, twocol, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'GridBlocks',
        [twocol && 'twocol'],
        (wrapperProps || {}).className
      )}
    >
      {blocks.map(({ title, summary, href, links = [], icon, image }, i) => {
        const imageProps = icon ? { src: getEfnistaknUrl(icon) } : image;
        return (
          <div key={i} className="GridBlocks__item">
            {imageProps && <Image bem="GridBlocks__illustration" {...imageProps} />}
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
