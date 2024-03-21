import React, { useEffect, useRef } from 'react';
import { CssModuleToken, getCssBundleUrl } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';

type HannaCssLinkProps = EitherObj<
  {
    tokens: Array<CssModuleToken> | string;
    options?: Parameters<typeof getCssBundleUrl>[1];
  },
  {
    href: string;
  }
>;

/**
 * A component that returns a `<link rel="stylesheet" ... />` element that
 * loads the Hanna CSS bundle, in a way that prevents FOUC when the token list
 * changes.
 */
export const HannaCssLink = (props: HannaCssLinkProps) => {
  const newHref = props.href ?? getCssBundleUrl(props.tokens, props.options);

  const linkRef = useRef<HTMLLinkElement>(null);
  const currentHrefRef = useRef(newHref);

  useEffect(() => {
    const linkElm = linkRef.current;
    if (!linkElm || newHref === currentHrefRef.current) {
      return;
    }

    let newLinkElm: HTMLLinkElement | undefined = document.createElement('link');
    newLinkElm.rel = 'stylesheet';
    newLinkElm.href = newHref;
    linkElm.after(newLinkElm);
    newLinkElm.onload = () => {
      if (!newLinkElm) {
        return;
      }
      linkElm.href = newHref;
      currentHrefRef.current = newHref;
      newLinkElm.remove();
      newLinkElm = undefined;
    };
    return () => {
      if (!newLinkElm) {
        return;
      }
      newLinkElm.remove();
      newLinkElm = undefined;
    };
  }, [newHref]);

  return <link ref={linkRef} rel="stylesheet" href={currentHrefRef.current} />;
};
