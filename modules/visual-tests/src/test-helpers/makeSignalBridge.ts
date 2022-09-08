import { useEffect } from 'react';
import { Page } from '@playwright/test';
import { type Signal, useSignal } from '@preact/signals-react';

declare global {
  /**
   * Used as a temporary Global storage for communication signals between
   * React test-page components and Playwright tests
   */
  var __signals: undefined | Record<string, Signal>; // eslint-disable-line no-var
}

let _count = 1;

/**
 * Makes a
 */
export const makeSignalBridge = <T = unknown>() => {
  const name = 'signal_' + _count++;
  const useBridgedSignal = (initialValue: T) => {
    const signal = useSignal(initialValue);
    useEffect(
      () => {
        const __signals = (window.__signals = window.__signals || {});
        __signals[name] = signal;

        return () => {
          const { __signals } = window;
          if (__signals) {
            delete __signals[name];
            if (Object.keys(__signals).length === 0) {
              delete window.__signals;
            }
          }
        };
      },
      [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    return signal;
  };

  return {
    use: useBridgedSignal,

    send: (page: Page, value: T) =>
      page.evaluate(
        ([name, value]) =>
          new Promise<void>((resolve, reject) => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              window.__signals![name]!.value = value;
              setTimeout(resolve, 100);
            } catch (err) {
              reject(err);
            }
          }),
        [name, value] as const
      ),
  };
};
