import React, {
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';
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

/** How much to extend the remaining time when the auto-closing is interrupted (frozen) by mouseover or keyboard focus */
const FREEZE_EXTENSION_MS = 750;

const useAutoClosing = (autoClose: number, props: HTMLProps) => {
  const startTime = useRef(Date.now());
  const remainingMs = useRef(autoClose);
  const [frost, setFrost] = useState(0);

  if (!autoClose) {
    return { autoCloseIn: undefined };
  }
  const thaw = (e: FocusEvent | MouseEvent) => {
    // When it's about to thaw, make set a new start time to base future
    // "remaining time" calculations on.
    if (frost === 1) {
      startTime.current = Date.now();
    }
    setFrost((frost) => frost - 1);
    const handler = props[e.type.startsWith('blur') ? 'onBlur' : 'onMouseLeave'];
    handler && handler(e as FocusEvent<HTMLDivElement> & MouseEvent<HTMLDivElement>);
  };
  const freeze = (e: FocusEvent | MouseEvent) => {
    // When there's no frost and it's about to freeze, make note
    // of the remaining time. Furhter freezes should not update this.
    if (!frost) {
      console.log(remainingMs.current);
      // Calculate the currently remaining time based on the last start time.
      const newRemainingMs = remainingMs.current - (Date.now() - startTime.current);
      // Extend the remainint time a bit to give usees some leeway,
      // but never extend it beyond the original autoClose value.
      remainingMs.current = Math.min(newRemainingMs + FREEZE_EXTENSION_MS, autoClose);
    }
    setFrost((frost) => frost + 1);
    const handler = props[e.type.startsWith('focus') ? 'onFocus' : 'onMouseEnter'];
    handler && handler(e as FocusEvent<HTMLDivElement> & MouseEvent<HTMLDivElement>);
  };

  return {
    autoCloseIn: frost === 0 ? remainingMs.current : undefined,
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

type AlertType = 'info' | 'success' | 'warning' | 'error' | 'critical';

export const alertTypes: Record<string, 1> = {
  info: 1,
  success: 1,
  warning: 1,
  error: 1,
  critical: 1,
} satisfies Record<AlertType, 1>;

// ---------------------------------------------------------------------------

export type AlertProps = {
  type: AlertType;
  /** Defaults to `true` if an `onClose` or `closeUrl` handlers are passaed */
  closable?: boolean;
  /** The alert content */
  children?: ReactNode;
  /** UNSAFE raw HTML content for the Alert, e.g. one emitted by a CMS. */
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
      /**
       * Number of **seconds** until the Alert auto-closes.
       * Mosueover and keyboard focus resets the timer.  \
       * NOTE: An `onClosed` handler is required when using this option.
       */
      autoClose: number;
      /** Return `false` to prevent the alert from closing. */
      onClose?: () => void | boolean;
      /**
       * Callback that fires when the alert has closed/transitoned out.  \
       * Required when `autoClose` is used.
       */
      onClosed: () => void;
    },
    {
      /**
       * NOTE: The signature with the `event` argument will be removed in hanna-react v0.11
       *
       * Return `false` to prevent the alert from closing
       */
      onClose?(event: MouseEvent): void | boolean;
      /** Callback that fires after the alert has closed/transitoned out */
      onClosed?(): void;
    }
  > &
  WrapperElmProps<null, 'role' | 'hidden'>;

// eslint-disable-next-line complexity
export const Alert = (props: AlertProps) => {
  const {
    type,
    childrenHTML,
    children,
    onClose,
    closeUrl,
    ssr,
    onClosed,
    instantShow,
    wrapperProps,
  } = props;

  const autoClose = Math.max(props.autoClose || 0, 0) * 1_000;
  const closable =
    props.closable ?? !!(onClose || (onClosed && !autoClose) || closeUrl != null);

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
        onClose(event);

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

  const { autoCloseIn, autoClosingProps } = useAutoClosing(autoClose, props);

  useEffect(() => {
    if (autoCloseIn) {
      let autoCloseTimeout: ReturnType<typeof setTimeout> | undefined;
      autoCloseTimeout = setTimeout(() => {
        closeAlert();
      }, autoCloseIn);
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
  }, [closeAlert, autoCloseIn]);

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
