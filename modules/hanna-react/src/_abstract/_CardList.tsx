import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';

import { Button } from './_Button.js';
import { Image, ImageProps } from './_Image.js';

type Bem = {
  bem: string;
};

type BaseCardProps = {
  title: string;
  href: string;
};

export type ImageCardProps = BaseCardProps & {
  meta?: string;
  image?: ImageProps;
  imgPlaceholder?: boolean;
};

export type TextCardProps = BaseCardProps & {
  summary?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

const Card = (props: EitherObj<ImageCardProps, TextCardProps> & Bem) => {
  const { bem, href, title, imgPlaceholder, image, meta, summary, target } = props;
  const cardClass = `${bem}__card`;

  return (
    <>
      <Button bem={cardClass} href={href} target={target}>
        {' '}
        <Image className={`${bem}__image`} {...image} placeholder={imgPlaceholder} />
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
  };

export const CardList = (props: _CardListProps) => {
  const {
    bemPrefix,
    title,
    summaryElement,
    cards,
    titleTag = 'h2',
    children,
    imgPlaceholder,
  } = props;

  const TitleTag = titleTag;

  const fallbackImageUrl = (imgPlaceholder !== true && imgPlaceholder) || undefined;
  const fallbackImageStyle = fallbackImageUrl
    ? ({
        ['--' + bemPrefix + '--fallback']: `url("${fallbackImageUrl}")`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      {summaryElement ? (
        <div className={bemPrefix + '__summary'}>
          {title && <TitleTag className={bemPrefix + '__title'}>{title}</TitleTag>}
          {summaryElement}
        </div>
      ) : (
        title && <TitleTag className={bemPrefix + '__title'}>{title}</TitleTag>
      )}
      <ul
        className={bemPrefix + (props.standalone ? '' : '__list')}
        style={fallbackImageStyle}
      >
        {cards.map((card, i) => (
          <li key={i} className={bemPrefix + '__item'}>
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
