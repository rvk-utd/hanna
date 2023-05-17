import React, { ReactNode } from 'react';
import { useIsBrowserSide } from '@hugsmidjan/react/hooks';
import { EitherObj } from '@reykjavik/hanna-utils';

type HiddenTigerProps = {
  style?: React.CSSProperties;
  serverSide?: ReactNode | (() => ReactNode);
} & EitherObj<{ clientSide: ReactNode | (() => ReactNode) }, { children: ReactNode }>;

export const HiddenTiger = (props: HiddenTigerProps) => {
  const { children, style, serverSide, clientSide } = props;
  const isBrowser = useIsBrowserSide();
  if (isBrowser) {
    const content = !clientSide
      ? children
      : typeof clientSide === 'function'
      ? clientSide()
      : clientSide;
    return style ? (
      <div style={style}>{content}</div>
    ) : (
      // TypeScript can't handle ReactNode's Array type - It's a konwn TSX limitation
      (content as JSX.Element)
    );
  } else if (serverSide) {
    return (typeof serverSide === 'function' ? serverSide() : serverSide) as JSX.Element;
  }
  return null;
};
