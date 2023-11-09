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
  const { bling, render, children } = props;

  return (
    <AbstractModal
      {...props}
      bem="modal"
      render={(renderProps) => {
        const _children = render ? render(renderProps) : children;
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
      // Required since props might contain children
      children={undefined} // eslint-disable-line react/no-children-prop
    />
  );
};

export default Modal;
