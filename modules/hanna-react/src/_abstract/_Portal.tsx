import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const defaultGetRoot = () => {
  const rootElm = document.createElement('div');
  document.body.appendChild(rootElm);
  return rootElm;
};

type PortalProps = {
  getRoot?: () => Element;
  children: ReactNode;
};

export const Portal = ({ getRoot, children }: PortalProps) => {
  const [rootElm, setRootElm] = useState<Element | null>(null);
  useEffect(() => {
    const newRoot = (getRoot || defaultGetRoot)();
    setRootElm(newRoot);
    return () => newRoot.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return rootElm && createPortal(children, rootElm);
};
