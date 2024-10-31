import React, { CSSProperties, MouseEventHandler, ReactElement, ReactNode } from 'react';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from '../utils.js';
import { BemModifierProps } from '../utils/types.js';

import { Button } from './_Button.js';
import { Image, ImageProps } from './_Image.js';

type Bem = {
  bem: string;
};

export type TextCardProps = {
  title: string;
  href?: string;
  meta?: string | JSX.Element;
  summary?: string | JSX.Element;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler;
};

export type ImageCardProps = TextCardProps & {
  image?: ImageProps;
  imgPlaceholder?: boolean;
};

const Card = (props: EitherObj<ImageCardProps, TextCardProps> & Bem) => {
  const { bem, href, title, imgPlaceholder, image, meta, summary, target, onClick } =
    props;
  const cardClass = `${bem}__card`;

  return (
    <>
      <Button bem={cardClass} href={href} target={target} onClick={onClick}>
        {' '}
        {!!(image || imgPlaceholder) && (
          <Image bem={`${bem}__image`} {...image} placeholder={imgPlaceholder} />
        )}
        <span className={`${cardClass}__title`}>{title}</span>{' '}
        {meta && <span className={`${cardClass}__meta`}>{meta}</span>}{' '}
        {summary && <span className={`${cardClass}__summary`}>{summary}</span>}{' '}
      </Button>{' '}
    </>
  );
};

// ---------------------------------------------------------------------------

export type CardListProps<T> = {
  cards: Array<T>;
  title?: string | undefined;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
};

export type CardListSummaryProps = {
  summaryElement?: ReactElement;
};

export type ImageCardListProps = CardListProps<ImageCardProps> & {
  imgPlaceholder?: boolean | string;
};
export type TextCardListProps = CardListProps<TextCardProps>;

type _CardListProps = EitherObj<ImageCardListProps, TextCardListProps> &
  CardListSummaryProps & {
    bemPrefix: string;
    children?: ReactNode;
    standalone?: boolean;
  } & WrapperElmProps<'ul'> &
  BemModifierProps;

export const CardList = (props: _CardListProps) => {
  const {
    bemPrefix,
    modifier,
    title,
    summaryElement,
    cards,
    titleTag = 'h2',
    children,
    imgPlaceholder,
    wrapperProps,
  } = props;

  const TitleTag = titleTag;

  const fallbackImageUrl = (imgPlaceholder !== true && imgPlaceholder) || undefined;
  const fallbackImageStyle = fallbackImageUrl
    ? ({
        [`--${bemPrefix}--fallback`]: `url("${fallbackImageUrl}")`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      {summaryElement ? (
        <div className={`${bemPrefix}__summary`}>
          {title && <TitleTag className={`${bemPrefix}__title`}>{title}</TitleTag>}
          {summaryElement}
        </div>
      ) : (
        title && <TitleTag className={`${bemPrefix}__title`}>{title}</TitleTag>
      )}
      <ul
        {...wrapperProps}
        className={
          props.standalone
            ? modifiedClass(bemPrefix, modifier, (wrapperProps || {}).className)
            : `${bemPrefix}__list`
        }
        style={fallbackImageStyle}
      >
        {cards.map((card, i) => (
          <li key={i} className={`${bemPrefix}__item`}>
            <Card
              /* Assert as `ImageCardProps` to silence the imgPlaceholder false-positive */
              {...(card as ImageCardProps)}
              bem={bemPrefix}
              imgPlaceholder={!!imgPlaceholder}
            />
          </li>
        ))}
      </ul>
      {children}
    </>
  );
};
