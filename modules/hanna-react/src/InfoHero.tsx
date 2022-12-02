import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { BlingComboProps, Blings } from './_abstract/_Blings';
import { ButtonProps } from './_abstract/_Button';
import { Image, ImageProps } from './_abstract/_Image';
import { breakOnNL } from './_abstract/breakOnNL';
import ButtonTertiary from './ButtonTertiary';
import { Alignment, aligns } from './constants';

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
  align?: Alignment;
  image?: ImageProps;
  blingType?: BlingOptions;
};

const InfoHero = (props: InfoHeroProps) => {
  const {
    title,
    titleBlurb,
    subTitle,
    blurb,
    image,
    buttons = [],
    align,
    blingType,
  } = props;
  const showButtons = Boolean(buttons.length);

  const alignment = align && aligns[align] ? align : 'right';
  const blings =
    (blingType && (blingOptions[blingType] as BlingComboProps | undefined)) ||
    blingOptions.waves; // default to `waves`

  return (
    <div className={getBemClass('InfoHero', 'align--' + alignment)}>
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
      </div>
      <Image className="InfoHero__image" altText={title} {...image} placeholder />
      <Blings blings={blings} mirror={alignment === 'right'} />
    </div>
  );
};
export default InfoHero;
