import React, { useEffect, useState } from 'react';
import { DAY, MINUTE, SECOND } from '@hugsmidjan/qj/time';
import { Alert, AlertProps } from '@reykjavik/hanna-react/Alert';
import { HannaLang } from '@reykjavik/hanna-utils/i18n';

const DISMISSAL_KEY_PREFIX = 'alert-dismissed-';

const MAX_AGE = 14 * DAY;
const gcDismissed = () => {
  // Meh, only do this once in a while.
  if (Math.random() > 0.1) {
    return;
  }
  const expirySec = Math.floor((Date.now() - MAX_AGE) / SECOND);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      key.startsWith(DISMISSAL_KEY_PREFIX) &&
      Number(localStorage.getItem(key)) < expirySec
    ) {
      localStorage.removeItem(key);
    }
  }
};

const shouldShowOnThisPage = (baseUrl: string) => (alert: SiteWideAlert) => {
  const pages = alert.showOnPages || [];
  if (pages.length === 0) {
    return true;
  }
  const negate = alert.negateShowOnPages ?? true;

  let pagePathMatches = false;
  const currentPath = window.location.pathname;

  for (let i = 0; i < pages.length; i++) {
    const page = baseUrl.slice(0, -1) + pages[i];

    if (page.charAt(page.length - 1) === '*') {
      if (currentPath.startsWith(page.substring(0, page.length - 1))) {
        pagePathMatches = true;
        break;
      }
    } else if (page === currentPath) {
      pagePathMatches = true;
      break;
    }
  }

  return negate ? !pagePathMatches : pagePathMatches;
};

const isNotDismissed = (alert: SiteWideAlert) => {
  const isDismissed =
    alert.dismissible &&
    (Number(localStorage.getItem(DISMISSAL_KEY_PREFIX + alert.uuid)) || -1) >=
      (alert.dismissalIgnoreBefore || 0);
  return !isDismissed;
};

const fetchAlerts = (alertsUri: string, baseUrl: string): Promise<Array<SiteWideAlert>> =>
  fetch(alertsUri)
    .then((res) => res.json())
    .then((res: { sitewideAlerts: Array<SiteWideAlert> }) => {
      const newAlerts = res.sitewideAlerts;
      const nowSec = Math.ceil(Date.now() / SECOND);
      // normalize the shape of the alert objects so their meaning is clearer:
      newAlerts.forEach((alert) => {
        if (!alert.dismissible) {
          // Explicitly undefine `dismissalIgnoreBefore` on non-`dismissible` alerts.
          delete alert.dismissalIgnoreBefore;
        } else if ((alert.dismissalIgnoreBefore || 0) > nowSec) {
          // Turn off `dismissible` for alerts with `dismissalIgnoreBefore` times in the future.
          alert.dismissible = false;
        }
      });
      return newAlerts.filter(isNotDismissed).filter(shouldShowOnThisPage(baseUrl));
    })
    .catch((e) => {
      console.error('Site wide alerts failed loading', e);
      return [];
    });

const updatedismissibleState = (alerts: Array<SiteWideAlert>): Array<SiteWideAlert> => {
  const nowSec = Math.ceil(Date.now() / SECOND);
  let changed = false as boolean;
  const newAlerts = alerts.map((alert) => {
    if (alert.dismissible || alert.dismissalIgnoreBefore || 0 > nowSec) {
      return alert;
    }
    changed = true;
    return {
      ...alert,
      dismissible: true,
    };
  });
  return changed ? newAlerts : alerts;
};

const getNextUpdateDismissalTime = (alerts: Array<SiteWideAlert>): number | null => {
  const nowSec = Math.floor(Date.now() / SECOND);
  const nextRefreshTime = alerts
    .filter((alert) => (alert.dismissalIgnoreBefore || -1) > nowSec)
    .reduce(
      (time, { dismissalIgnoreBefore = 0 }) =>
        time ? Math.min(time, dismissalIgnoreBefore) : dismissalIgnoreBefore,
      0
    );
  const diffSec = nextRefreshTime - nowSec;
  return diffSec > 0 ? diffSec : null;
};

// ---------------------------------------------------------------------------

const sitewideAlertTypes: Record<string, AlertProps['type'] | undefined> = {
  'alert-warning': 'critical',
  'alert-attention': 'warning',
  'alert-success': 'success',
  'alert-info': 'info',
};

const minRefreshInterval = 10 * SECOND;
const defaultRefreshInterval = 2 * MINUTE;

type SiteWideAlert = {
  uuid: string;
  dismissible: boolean;
  dismissalIgnoreBefore?: number;
  styleClass: string;
  showOnPages?: Array<string>;
  negateShowOnPages?: boolean;
  renderedAlert: string;
};

export type SiteWideAlertsProps = {
  /** URL of the API endpoint to fetch alerts from */
  alertsUri: string;

  /** URL of the current page/site-section.
   * Used to filter out unrelated alerts from the master list.
   *
   * Default: `'/'`
   */
  baseUrl?: string;

  /** Milliseconds between checks for new alerts.
   *
   * Default: `120_000` (2 minutes)  */
  refreshInterval?: number;

  lang?: HannaLang;
};

export const SiteWideAlerts = (props: SiteWideAlertsProps) => {
  const { alertsUri, baseUrl = '/', lang } = props;

  const refreshInterval = Math.max(
    props.refreshInterval || defaultRefreshInterval,
    minRefreshInterval
  );

  const [alerts, setAlerts] = useState<Array<SiteWideAlert>>([]);

  // Garbage collect dismissed alerts
  useEffect(gcDismissed, []);

  // fetch alert info from server
  useEffect(() => {
    const _fetchAlerts = () => {
      fetchAlerts(alertsUri, baseUrl).then((newAlerts) => {
        setAlerts((alerts) => {
          const changed =
            alerts.length !== newAlerts.length ||
            JSON.stringify(alerts) !== JSON.stringify(newAlerts);
          return changed ? newAlerts : alerts;
        });
      });
    };
    _fetchAlerts();
    const nextFetch = setInterval(_fetchAlerts, refreshInterval);
    return () => {
      clearInterval(nextFetch);
    };
  }, [alertsUri, baseUrl, refreshInterval]);

  // check if any of the currently active alerts need to have their `dismissible` flag flipped
  // because their `dismissalIgnoreBefore` is expiring
  useEffect(() => {
    const nextRefreshTime = getNextUpdateDismissalTime(alerts) || 0;
    if (nextRefreshTime > 0) {
      const nextRefresh = setTimeout(() => {
        setAlerts(updatedismissibleState);
      }, (nextRefreshTime + 2) * SECOND);
      return () => {
        clearTimeout(nextRefresh);
      };
    }
  }, [alerts]);

  const dismissAlert = ({ uuid }: SiteWideAlert) => {
    window.localStorage.setItem(
      DISMISSAL_KEY_PREFIX + uuid,
      String(Math.round(Date.now() / SECOND))
    );
    setTimeout(() => {
      setAlerts((alerts) => {
        const newAlerts = alerts.filter((alert) => alert.uuid !== uuid);
        return newAlerts.length < alerts.length ? newAlerts : alerts;
      });
    }, 2000);
  };

  return (
    <>
      {alerts.map((alert) => {
        const type = sitewideAlertTypes[alert.styleClass] || 'info';
        return (
          <Alert
            key={alert.uuid}
            type={type}
            childrenHTML={alert.renderedAlert}
            onClose={alert.dismissible ? () => dismissAlert(alert) : undefined}
            lang={lang}
          />
        );
      })}
    </>
  );
};
