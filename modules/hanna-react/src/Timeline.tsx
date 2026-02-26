import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';
import { DEFAULT_LANG, HannaLang } from '@reykjavik/hanna-utils/i18n';

export type TimelineProps = {
  title?: string;
  hideTitle?: boolean;
  items: Array<
    | {
        title: string;
        category?: string;
        description?: string;
        date: string | Date;
        /**
         * If no item is marked current, then the first item in the array is impilicitly the current one.
         *
         * If multiple items are marked current, then the first one is the current one.
         */
        curent?: boolean;
      }
    | 'skeleton'
  >;
  /** If true, the timeline will be sorted with the oldest item first. By default, the newest item is first. */
  oldestFirst?: boolean;
  /** Defaults to the current global `DEFAULT_LANG` */
  lang?: HannaLang;
};

export const Timeline = (props: TimelineProps) => {
  const { title, items, oldestFirst, lang = DEFAULT_LANG } = props;

  const formatDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentIdx = Math.max(
    items.findIndex((item) => item !== 'skeleton' && !!item.curent),
    0
  );

  return (
    <div
      className={modifiedClass('Timeline', [
        oldestFirst && 'oldestFirst',
        props.hideTitle && 'hidetitle',
      ])}
    >
      <h3 className="Timeline__title">{title}</h3>
      <ul className="Timeline__items">
        {items.map((item, i) => {
          if (item === 'skeleton') {
            return (
              <li key={i} className="Timeline__item Timeline__item--skeleton">
                ...TBD, something something <code>&lt;Skeleton/&gt;</code>...
              </li>
            );
          }

          const { title, category: author, description, date } = item;
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
              <div className="Timeline__subitems">
                {author && (
                  <div className="Timeline__subitem Timeline__item__category">
                    {author}
                  </div>
                )}
                {description && (
                  <div className="Timeline__subitem Timeline__item__description">
                    {description}
                  </div>
                )}
                {date && (
                  <div className="Timeline__subitem Timeline__item__date">
                    {typeof date === 'string' ? date : formatDate.format(date)}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
