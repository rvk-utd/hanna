import React, { ReactElement, useEffect } from 'react';
import getScrollbarWidth from '@hugsmidjan/qj/getScrollbarWidth';
import { HannaColorTheme } from '@reykjavik/hanna-css';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { modifiedClass } from '@reykjavik/hanna-utils';
import type { StoryContext } from '@storybook/react';

const hide = (selector: string) => {
  const elm = document.querySelector<HTMLElement>(selector);
  elm && (elm.hidden = true);
};

export const layoutDecorator = (story: () => ReactElement, context: StoryContext) => {
  const params = context.parameters;
  const layout = params.layout || {};
  const modifier = layout.modifier;
  const colorTheme = (context.args.theme as HannaColorTheme | undefined) || layout.theme;
  const pos = layout.pos;
  const fullLayout = layout.head != null || !!pos;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(
    () => {
      document.documentElement.dataset.gridOverlay = 'true';
      if (fullLayout) {
        if (pos !== 'footer') {
          hide('.Layout__footer');
        }
        if (pos !== 'nav') {
          hide('.Layout__nav');
        }
        if (!layout.head) {
          hide('.Layout__header');
        }
        if (pos === 'nav' || pos === 'footer') {
          hide('.Layout__main');
        }
      } else {
        getScrollbarWidth.setCSSvar();
      }
      const killLinks = (e: MouseEvent) => {
        if ((e.target as HTMLElement | null)?.closest('a')) {
          e.preventDefault();
        }
      };
      document.addEventListener('click', killLinks);
      return () => {
        document.removeEventListener('click', killLinks);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const children = story();

  return layout.disabled ? (
    children
  ) : fullLayout ? (
    <Layout
      modifier={modifier}
      navChildren={pos === 'nav' && children}
      footerChildren={pos === 'footer' && children}
      colorTheme={colorTheme}
    >
      {pos !== 'nav' && pos !== 'footer' && children}
    </Layout>
  ) : (
    <div
      className={modifiedClass('Layout', modifier)}
      style={{ paddingTop: '0px' }}
      data-color-theme={colorTheme}
    >
      <div className="Layout__content">
        <div
          className="Layout__main"
          style={{ paddingTop: '30px', paddingBottom: '30px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
