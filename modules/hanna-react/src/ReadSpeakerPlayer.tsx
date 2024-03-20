import React, { useEffect } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { HTMLProps } from './utils.js';

type RSpkrObject = {
  rspkr?: {
    ui?: {
      addClickEvents(): void;
      destroyActivePlayer(): void;
    };
  };
};

const scriptTagId = 'rs_req_Init';
const scriptTagSelector = `script#${scriptTagId}`;

/**
 * Counts the number of ReadSpeaker buttons mounted on the page.
 * When mounting the first button, a script tag will be added to the page,
 * and this counter incremented. When unmounting, this counter is decremented,
 * and when it reaches `0`, the script tag will be removed from the page.
 * GC FTW!
 */
let buttons = 0;

export type ReadSpeakerPlayerI18n = {
  linkText: string;
  linkLabel?: string;
};

export const defaultReadSpeakerPlayerTexts: DefaultTexts<ReadSpeakerPlayerI18n> = {
  en: { linkText: 'Listen', linkLabel: 'Listen to this page read out loud' },
  is: { linkText: 'Hlusta', linkLabel: 'Hlusta á þessa síðu lesna upphátt' },
  pl: { linkText: 'Posłuchaj', linkLabel: 'Posłuchaj tej strony odczytanej na głos' },
};

// ---------------------------------------------------------------------------

export type ReadSpeakerPlayerProps = {
  /**
   * Your ReadSpeaker account/customer ID
   *
   * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html#customer-id
   */
  customerId?: string;

  /**
   * Reading language/locale for the ReadSpeaker player.
   *
   * Default: `is`
   *
   * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html#reading-language
   */
  lang?: Lowercase<string>;

  /**
   * Reading voice for the ReadSpeaker player.
   *
   * This prop only makes sense if you specfy a reading `lang`, as
   * the voices are language-specific.
   *
   * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html#voice
   */
  voice?: string;

  /**
   * The DOM `id=""` of the element to read.
   *
   * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html#reading-area-id
   */
  readId?: string;
  /**
   * The DOM class-name of the element(s) to read
   *
   * Comma-separated list of class-names may also work...
   *
   * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html#reading-area-class
   */
  readClass?: string;

  texts?: ReadSpeakerPlayerI18n;

  /* Sets the horizontal alignment of the player UI.  */
  align?: 'left' | 'right';
  /** Tooggles CSS float layout */
  float?: boolean;

  /** Custom HTML attributes for the wrapper element. */
  wrapperProps?: HTMLProps;
};

/**
 * Embeds a ReadSpeaker player in the page
 *
 * @see https://docs.typo3.org/p/readspeaker/readspeaker-services/main/en-us/Configuration/Index.html
 */
export const ReadSpeakerPlayer = (props: ReadSpeakerPlayerProps) => {
  const {
    align,
    float,
    customerId = '11315',
    lang = 'is',
    voice = /^is(?:_is)?$/i.test(lang) ? 'is_dora' : '',
    readId = '',
    readClass = readId ? '' : 'Layout__main',
    wrapperProps,
    texts,
  } = props;

  const { linkText, linkLabel } = getTexts(
    { lang: lang.slice(0, 2), texts },
    defaultReadSpeakerPlayerTexts
  );

  useEffect(
    () => {
      if (buttons === 0) {
        if (document.querySelector(scriptTagSelector)) {
          // If the script element has been already added to the page
          // while our `button` count is at 0, then someone else
          // must have injected the script, and is presumably managing it.
          // Therefore, our job is done here.
          return;
          // NOTE: We check this every time, in case the script gets removed.
        }

        const script = document.createElement('script');
        script.id = scriptTagId;
        script.src = `https://cdn-eu.readspeaker.com/script/${customerId}/webReader/webReader.js?pids=wr`;
        script.onload = () => (window as RSpkrObject).rspkr?.ui?.addClickEvents();
        script.async = true;
        document.head.appendChild(script);
      }

      buttons++;
      (window as RSpkrObject).rspkr?.ui?.addClickEvents();

      return () => {
        buttons--;
        if (buttons === 0) {
          document.querySelector(scriptTagSelector)?.remove();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // NOTE: We do not support dynamic changes to `customerId`
      // or multiple different `customerId`s on the same page.
      // If you try that, things will be weird and wonky.
    ]
  );

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ReadSpeakerPlayer',
        [align === 'right' && `align-${align}`, float && 'float'],
        (wrapperProps || {}).className
      )}
    >
      <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve">
        <a
          rel="nofollow"
          className="rsbtn_play"
          accessKey="L"
          title={linkLabel || linkText}
          href={`https://app-eu.readspeaker.com/cgi-bin/rsent?${new URLSearchParams({
            customerid: customerId,
            lang,
            voice: lang && voice,
            autoLang: !lang ? 'true' : 'false',
            readclass: readClass,
            readid: readId,
          })}`}
        >
          <span className="rsbtn_left rsimg rspart">
            <span className="rsbtn_text">
              <span>{linkText}</span>
            </span>
          </span>
          <span className="rsbtn_right rsimg rsplay rspart" />
        </a>
      </div>
    </div>
  );
};

/**
 * Run this function if you find that the player keeps reading when a user
 * swaps pages.
 */
export const stopReading = () => (window as RSpkrObject).rspkr?.ui?.destroyActivePlayer();
