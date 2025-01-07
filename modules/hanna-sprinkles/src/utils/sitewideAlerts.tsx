import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';

import ensureCSS from '../_/ensureCSS.js';
import { getLang } from '../_/getLang.js';

import { SiteWideAlerts, SiteWideAlertsProps } from './sitewideAlerts.component.jsx';

// ---------------------------------------------------------------------------

const makeEmptyDivInside = (container: Element): HTMLDivElement => {
  const div = document.createElement('div');
  container.append(div);
  return div;
};

const resolveRoot = (
  rootElm: HTMLElement | string | undefined,
  Layout: string
): Element => {
  if (typeof rootElm === 'string') {
    const selectedElm = q(rootElm);
    if (selectedElm) {
      return selectedElm;
    }
  } else if (rootElm) {
    return rootElm;
  }

  const existingAlertsContainer = q<HTMLElement>(`.${Layout}__alerts`);
  if (existingAlertsContainer) {
    return makeEmptyDivInside(existingAlertsContainer);
  }

  const newAlertsContainer = document.createElement('div');
  newAlertsContainer.className = `${Layout}__alerts`;
  const layoutElm = qq(`.${Layout}, body`).slice(-1)[0]!;
  layoutElm.prepend(newAlertsContainer);
  return makeEmptyDivInside(newAlertsContainer);
};

// ===========================================================================

type Proptions = Pick<
  SiteWideAlertsProps,
  'alertsUri' | 'baseUrl' | 'refreshInterval'
> & {
  rootElm?: HTMLElement | string;
  layoutName: string;
};

const sitewideAlerts = (props: Proptions): void => {
  const Layout = props.layoutName || 'Layout';

  const rootElm = resolveRoot(props.rootElm, Layout);

  ensureCSS('Alert').then(() => {
    ReactDOM.render(
      <SiteWideAlerts
        alertsUri={props.alertsUri}
        baseUrl={props.baseUrl}
        refreshInterval={props.refreshInterval}
        lang={getLang()}
      />,
      rootElm
    );
  });
};

export default sitewideAlerts;
