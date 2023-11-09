import React, {
  Fragment,
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import { EitherObj } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { FocusTrap } from './_abstract/_FocusTrap.js';
import { Portal } from './_abstract/_Portal.js';
import { useCallbackOnEsc } from './utils/useCallbackOnEsc.js';
import { useDomid, WrapperElmProps } from './utils.js';

const MODAL_OPEN_CLASS = 'modal-open';

// ---------------------------------------------------------------------------

type ModalI18n = {
  closeButton: string;
  closeButtonLabel?: string;
};
export const defaultModalTexts: DefaultTexts<ModalI18n> = {
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

//FIXME: When Omit<> is used to omit 'bem' typescript deems `P` incompatible with
// props spread into _Modal

export type ModalProps = {
  /**
   * The transition delay until closing the modal triggers `onClosed()`
   *
   * Default: `500`
   */
  closeDelay?: number;

  /**
   * Indicates if teh Modal should be open or closed. To trigger opening or closing, simply flip this flag.
   *
   * Default: `true`
   */
  open?: boolean;

  /**
   * Set this to `true` for Modals that should render as if they always existed and had already been opened.
   *
   * A Modal that "starts open" will not CSS transition in, and will not trigger its `onOpen` callback on mount.
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

  /** Convenience callback that runs as soon as the `open` flag flips to `true` – including on initial opening.
   *
   * However, the initial `onOpen` is skipped  `startOpen` is set to `true`.
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

  modifier?: 'w6' | 'w8' | 'w10';

  bling?: ReactElement;
} & EitherObj<
  {
    /** Render function that receives a `closeModal` action dispatcher. */
    render: (props: { closeModal(): void }) => ReactNode;
  },
  { children: ReactNode }
> &
  WrapperElmProps<'div', 'hidden' | 'role'>;

// eslint-disable-next-line complexity
export const Modal = (props: ModalProps) => {
  const { modifier, closeDelay = 500, bling, wrapperProps = {} } = props;

  const isFickle = !(props.stable ?? props.fickle === false) || undefined;

  const txt = getTexts(props, defaultModalTexts);

  const privateDomId = useDomid();
  const domid = wrapperProps.id || privateDomId;
  const modalElmRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(() => !!props.startOpen && props.open !== false);

  const openModal = () => {
    if (!open) {
      addToModalStack(privateDomId);
      setTimeout(() => {
        setOpen(true);
        props.onOpen && props.onOpen();
        focusElm(modalElmRef.current);
      }, 100);
    }
  };

  const closeModal = () => {
    if (open) {
      setOpen(false);
      removeFromModalStack(privateDomId);
      props.onClose && props.onClose();
      setTimeout(props.onClosed, closeDelay);
    }
  };

  const lastPropsOpen = useRef(props.open);
  // Update state when props.open changes. Icky but simple.
  if (props.open !== lastPropsOpen.current && props.open !== open) {
    lastPropsOpen.current = props.open;
    props.open ? openModal() : closeModal();
  }

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
      } else if (props.open) {
        // The modal should transition to open.
        openModal();
      }
      return () => removeFromModalStack(privateDomId);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const bem = 'Modal';

  const PortalOrFragment = props.portal !== false ? Portal : Fragment;
  const children = props.render ? props.render({ closeModal }) : props.children;

  const closeButtonLabel = txt.closeButtonLabel || txt.closeButton;

  const { onClick, className } = wrapperProps;

  return (
    <PortalOrFragment>
      <div
        {...wrapperProps}
        className={modifiedClass('Modalwrapper', [modifier, className])}
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
        <FocusTrap atTop />
        <div className={modifiedClass('Modal', modifier)} ref={modalElmRef}>
          {bling ? (
            <>
              {children}
              <div className="Modal__blings">
                <div className="Modal__blings__inner">{bling}</div>
              </div>
            </>
          ) : (
            children
          )}
          {!props.noCloseButton && (
            <button
              className={bem + '__closebutton'}
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
        <FocusTrap />
      </div>
    </PortalOrFragment>
  );
};

export default Modal;
