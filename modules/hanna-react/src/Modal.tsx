import React, { ReactElement } from 'react';
import _Modal, { ModalProps as _ModalProps } from '@hugsmidjan/react/Modal';

//FIXME: When Omit<> is used to omit 'bem' typescript deems `P` incompatible with
// props spread into _Modal
export type ModalProps = _ModalProps & {
  bem?: never;
  bodyWrap?: never;
  modifier?: 'w6' | 'w8' | 'w10';
  bling?: ReactElement;
};

const Modal = (props: ModalProps) => {
  const {
    closeDelay = 500,
    texts = {
      closeButton: 'Loka ',
    },
    bling,
    children,
    render = () => children,
  } = props;

  return (
    <_Modal
      {...props}
      bodyWrap={false}
      bem="Modal"
      closeDelay={closeDelay}
      texts={texts}
      render={(args) =>
        bling ? (
          <>
            {render(args)}
            <div className="Modal__blings">
              <div className="Modal__blings__inner">{bling}</div>
            </div>
          </>
        ) : (
          render(args)
        )
      }
      // eslint-disable-next-line react/no-children-prop
      children={undefined}
    />
  );
};

export default Modal;
