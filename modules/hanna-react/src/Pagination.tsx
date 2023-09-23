import React, { memo, MouseEvent } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { Link } from './_abstract/_Link.js';
import { generatePageList } from './utils/Pagination.privates.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from './utils.js';

/*
  # TODO:

  - [ ] Update CSS styles
  - [ ] Generate Visual Regression Test

*/

type StringContaining<Token extends string> = `${string}${Token}${string}`;

export type PageTemplateString = StringContaining<'${page}'>;

type PaginationButtonProps = {
  key?: string | number;
  page: number;
  label?: string;
  labelLong: PageTemplateString;
  modifier?: 'next' | 'prev' | 'active' | false;
  disabled?: boolean;
  type: 'button' | 'submit';
  onChange?: (page: number, clickEvent: MouseEvent) => void;
  href?: (page: number) => string;
  ariaControls?: string;
};

const PaginationButton = (props: PaginationButtonProps) => {
  const { page, label, modifier, disabled, onChange, href } = props;
  const labelLong = props.labelLong.replace(/\$\{page\}/, page + '');
  const labelShort = label ? label.replace(/\$\{page\}/, page + '') : page + '';

  const btnProps = {
    key: props.key,
    className: modifiedClass('Pagination__button', modifier),
    title: labelLong,
    'aria-label': labelLong !== labelShort ? labelLong : undefined,
    children: labelShort,
    onClick: onChange && ((e: MouseEvent) => onChange(page, e)),
    'aria-current': modifier === 'active' || undefined,
    'aria-controls': props.ariaControls,
  };

  return href && !disabled ? (
    <Link href={href(page)} {...btnProps} />
  ) : (
    <button type={props.type} disabled={disabled} {...btnProps} />
  );
};

// ---------------------------------------------------------------------------

const getBtnRenderer = (cfg: PaginationProps) => {
  const { submit, onChange, href, 'aria-controls': ariaControls } = cfg;
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof href === 'string' &&
    !/\$\{page\}/.test(href)
  ) {
    throw new Error('The `href` template string must contain a literal "${page}" token');
  }
  const getHref =
    typeof href === 'string'
      ? (page: number) => href.replace(/\$\{page\}/, `${page}`)
      : href;
  const type = submit ? 'submit' : 'button';

  return (
    props: Omit<PaginationButtonProps, 'href' | 'onChange' | 'type' | 'ariaControls'>
  ) => (
    <PaginationButton
      href={getHref}
      onChange={onChange}
      type={type}
      ariaControls={ariaControls}
      {...props}
    />
  );
};

// ---------------------------------------------------------------------------

export type PaginationI18n = {
  defaultTitle: StringContaining<'${pageCount}'>;
  nextLabel: string;
  nextLabelLong: PageTemplateString;
  prevLabel: string;
  prevLabelLong: PageTemplateString;
  pageLabelLong: PageTemplateString;
};

export const defaultPaginationTexts: DefaultTexts<PaginationI18n> = {
  is: {
    defaultTitle: 'Veldu síðu (${pageCount} alls)',
    nextLabel: 'Næsta',
    nextLabelLong: 'Næsta síða (${page})',
    prevLabel: 'Fyrri',
    prevLabelLong: 'Fyrri síða (${page})',
    pageLabelLong: 'Síða ${page}',
  },
  en: {
    defaultTitle: 'Select Page (${pageCount} total)',
    nextLabel: 'Next',
    nextLabelLong: 'Next page (${page})',
    prevLabel: 'Previous',
    prevLabelLong: 'Previous page (${page})',
    pageLabelLong: 'Page ${page}',
  },
  pl: {
    defaultTitle: 'Wybierz stronę (${pageCount} wszystkich)',
    nextLabel: 'Następna',
    nextLabelLong: 'Następna strona (${page})',
    prevLabel: 'Poprzednia',
    prevLabelLong: 'Poprzednia strona (${page})',
    pageLabelLong: 'Strona ${page}',
  },
};

// ---------------------------------------------------------------------------

export type PaginationProps = {
  current: number;
  pageCount: number;
  'aria-controls'?: string;
  title?: string;
  submit?: boolean;
  texts?: PaginationI18n;
  lang?: HannaLang;
} & EitherObj<
  {
    href: PageTemplateString | ((page: number) => string);
    onChange?: (page: number, clickEvent: MouseEvent) => void;
  },
  { onChange: (page: number, clickEvent: MouseEvent) => void }
> &
  SSRSupportProps &
  WrapperElmProps<null, 'aria-label'>;

export const Pagination = memo((props: PaginationProps) => {
  const { current, pageCount, ssr, wrapperProps } = props;
  const isBrowser = useIsBrowserSide(ssr);

  if (pageCount < 2 || (!isBrowser && !props.href)) {
    return null;
  }

  // const pageList = useMemo(() => generatePages(current, pageCount), [current, pageCount]);
  const pageList = generatePageList(current, pageCount);

  const texts = getTexts(props, defaultPaginationTexts);
  const btn = getBtnRenderer(props);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('Pagination', null, (wrapperProps || {}).className)}
      aria-label={
        props.title || texts.defaultTitle.replace(/\$\{pageCount\}/, `${pageCount}`)
      }
    >
      {btn({
        page: current,
        modifier: 'next',
        label: texts.nextLabel,
        labelLong: texts.nextLabelLong,
        disabled: current === pageCount,
      })}{' '}
      {btn({
        page: current,
        modifier: 'prev',
        label: texts.prevLabel,
        labelLong: texts.pageLabelLong,
        disabled: current === 1,
      })}{' '}
      {pageList
        .map((page, i) => {
          return page === '…' ? (
            <span className="Pagination__ellipsis">…</span>
          ) : (
            btn({
              key: i,
              page,
              labelLong: texts.pageLabelLong,
              modifier: page === current && 'active',
            })
          );
        })
        .flatMap((itm) => [itm, ' '])}
    </div>
  );
});
