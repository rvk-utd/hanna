import React, { ReactElement } from 'react';

import {
  AbstractModal,
  type AbstractModalProps,
  defaultAbstractModalTexts,
} from './_abstract/_AbstractModal.js';

export const defaultModalTexts = defaultAbstractModalTexts;

export type ModalProps = AbstractModalProps & {
  /** Modal width modifier */
  modifier?: 'w6' | 'w8' | 'w10';

  bling?: ReactElement | (() => ReactElement);
};

export const Modal = (props: ModalProps) => {
  const {
    bling,
    render, // eslint-disable-line deprecation/deprecation
    children,
  } = props;

  return (
    <AbstractModal {...props} bem="Modal" render={undefined}>
      {(renderProps) => {
        const _children = render
          ? render(renderProps)
          : typeof children === 'function'
          ? children(renderProps)
          : children;

        return bling ? (
          <>
            {_children}
            <div className="Modal__blings">
              <div className="Modal__blings__inner">{bling}</div>
            </div>
          </>
        ) : (
          _children
        );
      }}
    </AbstractModal>
  );
};

export default Modal;
