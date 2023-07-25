import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { Button } from './_abstract/_Button.js';
import { breakOnNL } from './_abstract/breakOnNL.js';

const formatDate = (date: Date | string) => {
  return typeof date === 'string'
    ? date
    : date.toISOString().slice(0, 10).replace(/-/g, '.');
};

const _telToContactInfo = (tel: string | Array<string> | undefined) => {
  if (!tel) {
    return;
  }
  tel = typeof tel === 'string' ? [tel] : tel;
  return tel.map((tel) => ({
    href: 'tel:' + tel,
    value: tel,
  }));
};

const renderContent = (content: string | JSX.Element) =>
  typeof content === 'string' ? breakOnNL(content) : content;

// ---------------------------------------------------------------------------

export type NameCardI18n = {
  updatedLabel: string;
  availableLabel: string;
  unavailableLabel: string;

  /** @deprecated Use availableLabel instead  (will be removed in v0.11) */
  vacancyLabel?: string;
  /** @deprecated Use unavailableLabel instead  (will be removed in v0.11) */
  noVacancyLabel?: string;
  /** @deprecated Not used anymore  (will be rmoved in v0.11) */
  telLabel?: string;
};

const defaultTexts: DefaultTexts<NameCardI18n> = {
  en: {
    updatedLabel: 'Updated on',
    availableLabel: '',
    unavailableLabel: '',
    vacancyLabel: 'Vacancy',
    noVacancyLabel: 'No vacancy',
  },
  is: {
    updatedLabel: 'Uppfært síðast',
    availableLabel: '',
    unavailableLabel: '',
    vacancyLabel: 'Laus pláss',
    noVacancyLabel: 'Ekki laus pláss',
  },
};

// ---------------------------------------------------------------------------

type ContactInfo = {
  href: string;
  label: string;
  longLabel?: string;
};

/** @deprecated use label and longLabel props instead  (Will be removed in v0.11) */
type DeprecatedContactInfo = {
  href: string;
  value: string;
  label?: string;
};

export type NameCardProps = {
  name: string;
  /** Phone numbers, e-mail addresses, etc. */
  contactInfo?: Array<string | ContactInfo | DeprecatedContactInfo>;
  /** Address/location info
   *
   * Special handling of string:
   * Inserts `<br/>`s on `\n`. Collapses multiple `\n`s.
   *
   * Only simple, inline element HTML allowed
   */
  location?: string | JSX.Element;

  /** Misc info such as opening-hours, etc.
   *
   * Special handling of string:
   * Inserts `<br/>`s on `\n`. Collapses multiple `\n`s.
   *
   * Only simple, inline element HTML allowed
   */
  aboutText?: string | JSX.Element;

  /**
   * Designated for info about working/opening hours
   *
   * Special handling of string:
   * Inserts `<br/>`s on `\n`. Collapses multiple `\n`s.
   *
   * Only simple, inline element HTML allowed
   */
  hours?: string | JSX.Element;

  /** Displays "active" indicator. Use for vacancies, inline-status, etc. */
  available?: boolean;
  /** Meta data about freshness status, etc. */
  updated?: string | Date;

  lang?: string;
  texts?: NameCardI18n;

  /** @deprecated Use `available` instead  (will be removed in v0.11) */
  vacancy?: boolean;
  /** @deprecated Use `contactInfo` instead  (will be removed in v0.11) */
  tel?: string | Array<string>;
};

export const NameCard = (props: NameCardProps) => {
  const { name, location, hours, aboutText, available = props.vacancy, updated } = props;

  const renderMeta = () => {
    if (available == null && !updated) {
      return;
    }
    const texts = getTexts(props, defaultTexts);
    const { updatedLabel, availableLabel, unavailableLabel } = texts;
    return (
      <div className="NameCard__meta">
        {available != null && (
          <span
            className={modifiedClass('NameCard__availability', available && 'available')}
          >
            {available
              ? availableLabel || texts.vacancyLabel
              : unavailableLabel || texts.noVacancyLabel}{' '}
          </span>
        )}
        {updated != null && (
          <span className="NameCard__updated">
            {updatedLabel} {formatDate(updated)}
          </span>
        )}
      </div>
    );
  };

  let contactInfo = props.contactInfo;
  if (!contactInfo) {
    contactInfo = _telToContactInfo(props.tel) || [];
  }

  // Remove/map @deprecated contactinfo items
  const cleanContactInfo = contactInfo.map(
    (item): Exclude<typeof item, DeprecatedContactInfo> => {
      if (typeof item !== 'string' && 'value' in item) {
        return {
          href: item.href,
          label: item.value,
          longLabel: item.label,
        };
      }
      return item;
    }
  );

  return (
    <div className="NameCard">
      <div className="NameCard__name">{name}</div>
      {contactInfo.length > 0 && (
        <p className="NameCard__contactinfo">
          {cleanContactInfo.map((item, i) => (
            <>
              {typeof item === 'string' ? (
                <span className="NameCard__contactinfo__item">{item}</span>
              ) : (
                <Button
                  key={i}
                  bem="NameCard__contactinfo__item"
                  href={item.href}
                  aria-label={item.longLabel}
                  title={item.longLabel}
                >
                  {item.label}
                </Button>
              )}{' '}
            </>
          ))}
        </p>
      )}
      {location && <p className="NameCard__location">{renderContent(location)}</p>}
      {hours && <p className="NameCard__hours">{renderContent(hours)}</p>}
      {aboutText && <p className="NameCard__abouttext">{renderContent(aboutText)}</p>}
      {renderMeta()}
    </div>
  );
};

export default NameCard;
