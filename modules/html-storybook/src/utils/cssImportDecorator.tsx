import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import { getFormatMonitor } from '@reykjavik/hanna-utils';
import { makeDecorator } from '@storybook/addons';

import { StoryParameters } from '../storytypes';

const makeCssUrl = (module: string | undefined, noLayout?: boolean) => {
  const layout = noLayout ? '' : 'Layout,';
  return getCssBundleUrl('-basics,' + layout + module);
};

export const cssImportDecorator = makeDecorator({
  name: 'cssImportDecorator',
  parameterName: 'css',
  wrapper: (storyFn, context) => {
    const css = (context.parameters as StoryParameters).css || {};
    const cssTokens = css.tokens || context.kind.split('/').pop();
    const cssUrl = makeCssUrl(cssTokens, css.noLayout);
    return (
      <>
        {cssUrl && (
          <link
            rel="stylesheet"
            href={cssUrl}
            onLoad={() => {
              getFormatMonitor().check();
              css.onLoad && css.onLoad();
              // for AbstractCarousel's left-offset calculations
              window.dispatchEvent(new Event('resize'));
            }}
          />
        )}
        {storyFn(context)}
      </>
    );
  },
});
