import React, {
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { Button } from './_abstract/_Button.js';
import { isPreact } from './utils/env.js';
import {
  HTMLProps,
  SSRSupportProps,
  useIsBrowserSide,
  WrapperElmProps,
} from './utils.js';

// FIXME: Eventually import from @reykjavik/hanna-css
const AlertCloseTransitionDuration = 400;

const useAutoClosing = (autoClose: number, props: HTMLProps) => {
  const [temp, setTemp] = useState(0);
  if (!autoClose) {
    return { autoClosing: false };
  }
  const thaw = (e: FocusEvent | MouseEvent) => {
    setTemp((temp) => temp + 1);
    const handler = props[e.type.startsWith('blur') ? 'onBlur' : 'onMouseLeave'];
    // @ts-expect-error  (Proper fix ends up as too much code for this extreme edge case)
    handler && handler(e);
  };
  const freeze = (e: FocusEvent | MouseEvent) => {
    setTemp((temp) => temp - 1);
    const handler = props[e.type.startsWith('focus') ? 'onFocus' : 'onMouseEnter'];
    // @ts-expect-error  (Resolving ends up as too much code for this extreme edge case)
    handler && handler(e);
  };

  return {
    autoClosing: temp === 0,
    autoClosingProps: {
      onMouseEnter: freeze,
      onMouseLeave: thaw,
      onFocus: freeze,
      onBlur: thaw,
      ...(isPreact && {
        onfocusin: (e: FocusEvent) => e.currentTarget !== e.target && freeze(e),
        onfocusout: (e: FocusEvent) => e.currentTarget !== e.target && thaw(e),
      }),
    },
  };
};

// ---------------------------------------------------------------------------

export type AlertI18n = {
  closeLabel: string;
  closeLabelLong?: string;
};

export const defaultAlertTexts: DefaultTexts<AlertI18n> = {
  en: { closeLabel: 'Hide' },
  is: { closeLabel: 'Fela' },
  pl: { closeLabel: 'Ukryj' },
};

export const alertTypes = {
  info: 1,
  success: 1,
  warning: 1,
  error: 1,
  critical: 1,
};
type AlertType = keyof typeof alertTypes;

// ---------------------------------------------------------------------------

export type AlertProps = {
  type: AlertType;
  closable?: boolean;
  children?: ReactNode;
  childrenHTML?: string;
  /** server-side anchor href */
  closeUrl?: string;
  texts?: AlertI18n;
  lang?: HannaLang;
  /** Set to true to opt out of the opening transition */
  instantShow?: boolean;
} & SSRSupportProps &
  EitherObj<
    {
      /** Seconds until the Alert auto-closes.
       *
       * Mosueover and keyboard focus resets the timer.
       */
      autoClose: number;
      /** Return `false` to prevent the alert from closing. */
      onClose?: () => void | boolean;
      /** Callback that fires when the alert has closed/transitoned out */
      onClosed: () => void;
    },
    {
      /** @deprecated This signature with the `event` argument will be removed in hanna-react v0.11
       *
       * Return `false` to prevent the alert from closing
       */
      onClose?(event: MouseEvent): void | boolean;
      /** Callback that fires after the alert has closed/transitoned out */
      onClosed?(): void;
    }
  > &
  WrapperElmProps<null, 'role' | 'hidden'>;

export const Alert = (props: AlertProps) => {
  const {
    type,
    childrenHTML,
    children,
    onClose, // eslint-disable-line deprecation/deprecation
    closeUrl,
    closable = !!(onClose || closeUrl != null),
    ssr,
    onClosed,
    instantShow,
    wrapperProps,
  } = props;
  const autoClose = Math.max(props.autoClose || 0, 0);

  const closing = useRef<ReturnType<typeof setTimeout>>();
  const isBrowser = useIsBrowserSide(ssr);
  const [open, setOpen] = useState(instantShow || !isBrowser);
  const showCloseButton = closable && (isBrowser || closeUrl != null);
  const { closeLabel, closeLabelLong } = getTexts(props, defaultAlertTexts);

  useEffect(() => {
    setOpen(true);
  }, []);

  const closeAlert = useCallback(
    (event?: MouseEvent) => {
      const ret =
        onClose &&
        // @ts-expect-error  (@deprecated `event` parameter will be removed in v0.11)
        onClose(event); // eslint-disable-line deprecation/deprecation

      if (ret !== false) {
        setOpen(false);
        if (closing.current) {
          clearTimeout(closing.current);
          closing.current = undefined;
        }
        closing.current = setTimeout(() => {
          onClosed && onClosed();
        }, AlertCloseTransitionDuration);
      }
    },
    [onClose, onClosed]
  );

  const { autoClosing, autoClosingProps } = useAutoClosing(autoClose, props);

  useEffect(() => {
    if (autoClosing) {
      let autoCloseTimeout: ReturnType<typeof setTimeout> | undefined;
      autoCloseTimeout = setTimeout(() => {
        closeAlert();
      }, autoClose * 1_000);
      return () => {
        if (autoCloseTimeout) {
          clearTimeout(autoCloseTimeout);
          autoCloseTimeout = undefined;
        }
        if (closing.current) {
          clearTimeout(closing.current);
          closing.current = undefined;
        }
      };
    }
  }, [closeAlert, autoClosing, autoClose]);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'Alert',
        [!!alertTypes[type] && type, closable && 'closable'],
        (wrapperProps || {}).className
      )}
      role="alert"
      hidden={!open || undefined}
      {...autoClosingProps}
    >
      {childrenHTML ? (
        <div dangerouslySetInnerHTML={{ __html: childrenHTML }} />
      ) : (
        children
      )}{' '}
      {showCloseButton && (
        <Button
          bem="Alert__close"
          {...(closeUrl != null ? { href: closeUrl } : { type: 'button' })}
          onClick={(e: MouseEvent) => {
            closeAlert(e);
          }}
          aria-label={closeLabelLong}
          title={closeLabelLong || closeLabel}
        >
          {closeLabel}
        </Button>
      )}
    </div>
  );
};

export default Alert;
