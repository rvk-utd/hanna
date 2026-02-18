import React, {
  Fragment,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { FocusTrap } from '../FocusTrap.js';
import {
  SSRSupportProps,
  useDomid,
  useIsBrowserSide,
  WrapperElmProps,
} from '../utils.js';
import { BemProps } from '../utils/types.js';
import { useCallbackOnEsc } from '../utils/useCallbackOnEsc.js';

import { Portal } from './_Portal.js';

const MODAL_OPEN_CLASS = 'modal-open';

// ---------------------------------------------------------------------------
// Methods to manage the modalStack and the setting/unsetting modalOpenClass
//
const win =
  typeof window !== 'undefined'
    ? (window as Window & { $$modalStack?: Array<string> })
    : undefined;
const modalStack = win ? win.$$modalStack || (win.$$modalStack = []) : [];

const addToModalStack = (domid: string) => {
  document.documentElement.classList.add(MODAL_OPEN_CLASS); // Always set this, even on startOpen === true
  modalStack.unshift(domid);
};
const removeFromModalStack = (domid: string) => {
  const stackPos = modalStack.indexOf(domid);
  if (stackPos > -1) {
    modalStack.splice(stackPos, 1);
  }
  if (modalStack.length <= 0) {
    document.documentElement.classList.remove(MODAL_OPEN_CLASS);
  }
};

// ---------------------------------------------------------------------------

type AbstractModalI18n = {
  closeButton: string;
  closeButtonLabel?: string;
};

export const defaultAbstractModalTexts: DefaultTexts<AbstractModalI18n> = {
  is: {
    closeButton: 'Loka',
    closeButtonLabel: 'Loka þessum glugga',
  },
  en: {
    closeButton: 'Close',
    closeButtonLabel: 'Close this window',
  },
  pl: {
    closeButton: 'Zamknij',
    closeButtonLabel: 'Zamknij to okno',
  },
};

// ---------------------------------------------------------------------------

//FIXME: When Omit<> is used to omit 'bem' typescript deems `P` incompatible
// with props spread into _Modal

export type AbstractModalProps = {
  /**
   * The transition delay until closing the modal triggers `onClosed()`
   *
   * Default: `500`
   */
  closeDelay?: number;

  /**
   * Indicates if the Modal should be open or closed. To trigger opening or
   * closing, simply flip this flag.
   *
   * Default: `true`
   */
  open?: boolean;

  /**
   * Set this to `true` for Modals that should render as if they always
   * existed and had already been opened.
   *
   * A Modal that "starts open" will not CSS transition in, and will not
   * trigger its `onOpen` callback on mount.
   *
   * Default: `false`
   */
  startOpen?: boolean;

  /**
   * By default all modals close on ESC and outside clicks.
   * Set thtis to `true` to disable this behaviour.
   */
  stable?: boolean;

  /** Hides the (x) close button */
  noCloseButton?: boolean;

  /**
   * @deprecated  Use `stable` prop instead  (Will be removed in v0.11)
   *
   * Default: `true`
   *
   * The inverse of the `stable` prop. If both `fickle` and `stable` are
   * defined then `stable` takes precedence.
   */
  fickle?: boolean;

  /**
   * Convenience callback that runs as soon as the `open` flag flips to `true`
   * – including on initial opening.
   *
   * However, the initial `onOpen` is skipped when `startOpen` is set to `true`.
   */
  onOpen?: () => void;

  /**
   * Convenience callback that runs as soon as the `open` flag flips to `false`
   */
  onClose?: () => void;

  /**
   * Callback that runs when the modal closes – **after** `closeDelay` has elaped.
   */
  onClosed: () => void;

  /**
   * Default:
   * ```
   * {
   *   closeButton: 'Close',
   *   closeButtonLabel: 'Close this window',
   * }
   * ```
   */
  texts?: Readonly<{
    closeButton: string;
    closeButtonLabel?: string;
  }>;

  lang?: string;

  /**
   * Should the modal be mounted in a Portal component `<div/>`
   * located outside the ReactDOM.render root element?
   *
   * Default: `true`
   */
  portal?: boolean;
} & EitherObj<
  {
    /**
     * @deprecated  Use children instead  (Will be removed in v0.11)
     *
     * Render function that receives a `closeModal` action dispatcher.
     */
    render: (props: { closeModal(): void }) => ReactNode;
  },
  {
    /** Either a `ReactNode` or render function */
    children:
      | ReactNode
      | ((props: {
          /** Action dispacher that initiates modal closing action */
          closeModal(): void;
        }) => ReactNode);
  }
> &
  WrapperElmProps<'div', 'hidden' | 'role'> &
  SSRSupportProps;

type AbstractModalProps_private = AbstractModalProps & BemProps<true>;

// eslint-disable-next-line complexity
export const AbstractModal = (props: AbstractModalProps_private) => {
  const {
    bem,
    modifier,
    closeDelay = 500,
    wrapperProps = {},
    ssr,
    render, // eslint-disable-line deprecation/deprecation
    children,
  } = props;

  // eslint-disable-next-line deprecation/deprecation
  const isFickle = !(props.stable ?? props.fickle === false) || undefined;

  const txt = getTexts(props, defaultAbstractModalTexts);

  const openProp = props.open !== false; // defaults to `true`

  const isBrowser = useIsBrowserSide(ssr);
  const privateDomId = useDomid();
  const domid = wrapperProps.id || privateDomId;
  const modalElmRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(() => !!props.startOpen && openProp);
  const [visible, setVisible] = useState(open);

  const openModal = () => {
    if (!open) {
      addToModalStack(privateDomId);
      setVisible(true);
      setTimeout(() => {
        setOpen(true);
        focusElm(modalElmRef.current, { delay: 50 });
        props.onOpen && props.onOpen(); // allow onOpen to move focus to a new place....
      }, 50);
    }
  };

  const closeModal = () => {
    if (open) {
      setOpen(false);
      removeFromModalStack(privateDomId);
      props.onClose && props.onClose();
      setTimeout(() => {
        setVisible(false);
        props.onClosed();
      }, closeDelay);
    }
  };

  // ---
  // Update open state when props.open changes. Icky but simple.
  const lastPropsOpen = useRef(openProp);
  if (openProp !== lastPropsOpen.current && openProp !== open) {
    lastPropsOpen.current = openProp;
    // these update state during render, which aborts the current render
    // and triggers an immediate rerender.
    openProp ? openModal() : closeModal();
  }
  lastPropsOpen.current = openProp;
  // ---

  const closeOnCurtainClick =
    isFickle &&
    ((e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    });

  useCallbackOnEsc(
    isFickle &&
      (() => {
        if (modalStack[0] === domid) {
          closeModal();
        }
      })
  );

  // On initial mount (and final unmount)
  useEffect(
    () => {
      if (open) {
        // The modal did `startOpen` so we need to add it to the "modal-stack".
        addToModalStack(privateDomId);
      } else if (openProp) {
        // The modal should transition to open.
        openModal();
      }
      return () => removeFromModalStack(privateDomId);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const PortalOrFragment = props.portal !== false ? Portal : Fragment;

  const closeButtonLabel = txt.closeButtonLabel || txt.closeButton;

  const { onClick, className } = wrapperProps;

  return (
    <PortalOrFragment>
      {visible && (
        <div
          {...wrapperProps}
          className={modifiedClass(`${bem}wrapper`, [modifier, className])}
          hidden={!open}
          role="dialog"
          onClick={
            closeOnCurtainClick && onClick
              ? (e) => {
                  closeOnCurtainClick(e);
                  onClick(e);
                }
              : closeOnCurtainClick || onClick
          }
          id={domid}
        >
          {isBrowser && <FocusTrap atTop />}
          <div className={modifiedClass(bem, modifier)} ref={modalElmRef}>
            {render
              ? render({ closeModal })
              : typeof children === 'function'
              ? children({ closeModal })
              : children}
            {isBrowser && !props.noCloseButton && (
              <button
                className={`${bem}__closebutton`}
                type="button"
                onClick={closeModal}
                aria-label={closeButtonLabel}
                aria-controls={domid}
                title={closeButtonLabel}
              >
                {txt.closeButton}
              </button>
            )}
          </div>
          {isBrowser && <FocusTrap />}
        </div>
      )}
    </PortalOrFragment>
  );
};
