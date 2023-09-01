import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { BlingComboProps, Blings } from './_abstract/_Blings.js';
import { ButtonProps } from './_abstract/_Button.js';
import { Image, ImageProps } from './_abstract/_Image.js';
import { breakOnNL } from './_abstract/breakOnNL.js';
import ButtonTertiary from './ButtonTertiary.js';
import { Alignment, aligns } from './constants.js';
import { WrapperElmProps } from './utils.js';

type BlingOptions = 'waves' | 'sunny-waves' | 'triangles' | 'circles';

const blingOptions: Record<BlingOptions, BlingComboProps> = {
  waves: [
    {
      type: 'waves-medium',
      color: 'primary',
      align: 'left',
      vertical: 'up',
      parent: 'bottom',
    },
  ],
  'sunny-waves': [
    {
      type: 'waves-medium',
      align: 'left',
      parent: 'bottom',
      vertical: 'up',
    },
    {
      type: 'circle-medium',
      color: 'secondary',
      align: 'right-center',
      parent: 'top',
      vertical: 'down-ish',
    },
  ],
  triangles: [
    {
      type: 'triangle-large',
      align: 'left-center',
      parent: 'bottom',
      vertical: 'up',
    },
    {
      type: 'triangle-small',
      color: 'secondary',
      align: 'right',
      parent: 'top-ish',
      vertical: 'down-ish',
      overlay: true,
    },
  ],
  circles: [
    {
      type: 'circle-large',
      align: 'left',
      parent: 'top',
      vertical: 'down',
    },
    {
      type: 'circle-small',
      color: 'secondary',
      align: 'right',
      parent: 'bottom-ish',
      vertical: 'up-ish',
      overlay: true,
    },
  ],
};

export type InfoHeroProps = {
  title: string;
  titleBlurb?: string | JSX.Element;

  /** Inserts `<br/>`s on `\n`. Collapses multiple `\n`s. */
  subTitle?: string;
  blurb?: string | JSX.Element;
  buttons?: Array<ButtonProps>;
  footer?: string | JSX.Element;
  align?: Alignment;
  image?: ImageProps;
  blingType?: BlingOptions;
} & WrapperElmProps;

export const InfoHero = (props: InfoHeroProps) => {
  const {
    title,
    titleBlurb,
    subTitle,
    blurb,
    image,
    buttons = [],
    footer,
    align,
    blingType,
    wrapperProps,
  } = props;
  const showButtons = Boolean(buttons.length);

  const alignment = align && aligns[align] ? align : 'right';
  const blings =
    (blingType && (blingOptions[blingType] as BlingComboProps | undefined)) ||
    blingOptions.waves; // default to `waves`

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'InfoHero',
        'align--' + alignment,
        (wrapperProps || {}).className
      )}
    >
      <div className="InfoHero__content">
        <h1 className="InfoHero__title">{title}</h1>
        {titleBlurb && <div className="InfoHero__titleblurb">{titleBlurb}</div>}

        {subTitle && <div className="InfoHero__subtitle">{breakOnNL(subTitle)}</div>}
        {blurb && <div className="InfoHero__blurb">{blurb}</div>}

        {showButtons && (
          <div className="InfoHero__buttons">
            {buttons.map((buttonProps, i) => (
              <ButtonTertiary key={i} {...buttonProps} />
            ))}
          </div>
        )}
        {footer && <div className="InfoHero__footer">{footer}</div>}
      </div>
      <Image bem="InfoHero__image" altText={title} {...image} placeholder />
      <Blings blings={blings} mirror={alignment === 'right'} />
    </div>
  );
};
export default InfoHero;
