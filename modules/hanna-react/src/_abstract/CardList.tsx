import React, { CSSProperties, ReactElement, ReactNode } from 'react';

import Button from './Button';
import Image, { ImageProps } from './Image';

type Bem = {
  bem: string;
};

type BaseCardProps = {
  title: string;
  href: string;
  imgPlaceholder?: boolean;
};

export type ImageCardProps = BaseCardProps & {
  meta?: string;
  image?: ImageProps;
};

export type TextCardProps = BaseCardProps & {
  summary?: string;
};

const Card = (props: (ImageCardProps | TextCardProps) & Bem) => {
  const { bem, href, title, imgPlaceholder } = props;
  const cardClass = `${bem}__card`;
  const image = 'image' in props && props.image;
  const meta = 'meta' in props && props.meta;
  const summary = 'summary' in props && props.summary;

  return (
    <>
      <Button bem={cardClass} href={href}>
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
  summaryElement?: ReactElement;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  imgPlaceholder?: boolean | string;
};
export type ImageCardListProps = CardListProps<ImageCardProps>;
export type TextCardListProps = CardListProps<TextCardProps>;

type _CardListProps = CardListProps<BaseCardProps> & {
  bemPrefix: string;
  children?: ReactNode;
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

  const fallbackImage = (imgPlaceholder !== true && imgPlaceholder) || undefined;
  const fallbackImageStyle = fallbackImage
    ? ({ '--ImageCards--fallback': `url("${fallbackImage}")` } as CSSProperties)
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
      <ul className={bemPrefix + '__list'} style={fallbackImageStyle}>
        {cards.map((card, i) => (
          <li key={i} className={bemPrefix + '__item'}>
            <Card {...card} bem={bemPrefix} imgPlaceholder={!!imgPlaceholder} />
          </li>
        ))}
      </ul>
      {children}
    </>
  );
};
