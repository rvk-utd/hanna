import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from '../utils.js';
import { DeprecatedSeenProp } from '../utils/seenEffect.js';
import { BemModifierProps } from '../utils/types.js';

import { Button, ButtonProps } from './_Button.js';
import { Image, ImageProps } from './_Image.js';

export type BlockItem = {
  title: string;
  summary?: string | JSX.Element;
  buttons?: Array<ButtonProps>;
};

export type ContentImageBlock = {
  content: BlockItem;
  image: ImageProps;
} & DeprecatedSeenProp;

export type ContentBlock = {
  content: Array<BlockItem>;
  image?: undefined;
} & DeprecatedSeenProp;

export type BlockProps = (ContentBlock | ContentImageBlock) &
  BemModifierProps &
  WrapperElmProps;

export const Block = (props: BlockProps & { bem: string }) => {
  const { image, modifier, bem, content, wrapperProps } = props;

  const contentItems = Array.isArray(content) ? content : [content];
  return (
    <div
      {...wrapperProps}
      className={modifiedClass(bem, modifier, (wrapperProps || {}).className)}
    >
      {contentItems.map(({ title, summary, buttons = [] }, i) => {
        const hasSummary = summary && (typeof summary !== 'string' || !!summary.trim());
        return (
          <div key={i} className={`${bem}__content`}>
            <h2 className={`${bem}__title`}>{title}</h2>
            {hasSummary && <div className={`${bem}__summary`}>{summary}</div>}
            {buttons.length > 0 && (
              <div className={`${bem}__buttons`}>
                {' '}
                {buttons.map((buttonProps, i) => (
                  <>
                    <Button bem={`${bem}__button`} key={i} {...buttonProps} />{' '}
                  </>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {image && <Image bem={`${bem}__image`} {...image} />}
    </div>
  );
};
