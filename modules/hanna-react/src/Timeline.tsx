import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';
import { TagPill, TagPillColor } from '@reykjavik/hanna-react/TagPill';
import { modifiedClass } from '@reykjavik/hanna-utils';
import { DEFAULT_LANG, HannaLang } from '@reykjavik/hanna-utils/i18n';

export type TimeLineItem =
  | {
      /** The main timeline item value */
      title: string;
      /** Flexible categorization field. Could for example contain a person/user's name  */
      category?: string;
      /** More details about the  */
      description?: string;
      /**
       * The date/time of the timeline event.
       *
       * `Date` and `number` (timestamp) values are auto formatted according to the
       * currently active `HannaLang`. If you need a non-default format pass it as a
       * preformatted string.
       */
      date?: Date | number | string;
      /** Displays a status tag next to the timeline item. */
      status?: {
        label: string;
        color?: TagPillColor;
      };
      /**
       * If no item is marked current, then the first item in the array is impilicitly the current one.
       *
       * If multiple items are marked current, then the first one is the current one.
       */
      current?: boolean;
    }
  | 'loading';

const dateFormatters: Partial<Record<HannaLang, Intl.DateTimeFormat>> = {};
const dateTimeFormatters: Partial<Record<HannaLang, Intl.DateTimeFormat>> = {};

const getDateFormatter = (lang: HannaLang, hideTime?: boolean): Intl.DateTimeFormat =>
  hideTime
    ? dateFormatters[lang] ||
      (dateFormatters[lang] = new Intl.DateTimeFormat(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }))
    : dateTimeFormatters[lang] ||
      (dateTimeFormatters[lang] = new Intl.DateTimeFormat(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }));

export type TimelineProps = {
  /** Optional title to show above the timeline. */
  title?: string;

  /** The items to display in the timeline. */
  items: Array<TimeLineItem>;

  /**
   * If true, Item `Dates` will be formatted year, month day only, without the
   * time of day (hours and minutes) visible.
   *
   * Default: `false`
   */
  hideTime?: boolean;

  /** If true, the timeline will be sorted with the oldest item first. By default, the newest item is first. */
  oldestFirst?: boolean;
  /** Defaults to the current global `DEFAULT_LANG` */
  lang?: HannaLang;
};

export const Timeline = (props: TimelineProps) => {
  const { title, items, oldestFirst, lang = DEFAULT_LANG, hideTime } = props;

  const dateFmt = getDateFormatter(lang, hideTime);

  const currentIdx = Math.max(
    items.findIndex((item) => item !== 'loading' && !!item.current),
    0
  );

  return (
    <div className={modifiedClass('Timeline', [oldestFirst && 'oldestFirst'])}>
      {title && <h3 className="Timeline__title">{title}</h3>}
      <ul className="Timeline__items">
        {items.map((item, i) => {
          if (item === 'loading') {
            return (
              <li key={i} className="Timeline__item Timeline__item--loading">
                <Skeleton height={1} wrapperProps={{ className: 'Skeleton__circle' }} />
                <Skeleton items={1} height={3} text />
              </li>
            );
          }

          const { title, category: author, description, date, status } = item;

          return (
            <li
              key={i}
              className={modifiedClass('Timeline__item', [
                i < currentIdx && 'future',
                i > currentIdx && 'past',
              ])}
              aria-current={currentIdx === i ? 'step' : undefined}
            >
              <div className="Timeline__item__title">{title}</div>
              {status && <TagPill color={status.color}>{status.label}</TagPill>}
              {author && <div className="Timeline__item__category">{author}</div>}
              {description && (
                <div className="Timeline__item__description">{description}</div>
              )}
              {date && (
                <div className="Timeline__item__date">
                  {typeof date === 'string' ? date : dateFmt.format(date)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
