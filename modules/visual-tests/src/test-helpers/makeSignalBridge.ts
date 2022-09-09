import { useEffect } from 'react';
import { Page } from '@playwright/test';
import { type Signal, useSignal } from '@preact/signals-react';

declare global {
  /**
   * Used as a temporary Global storage for communication signals between
   * Playwright tests and React test-page components
   */
  var __signals: undefined | Record<string, Signal>; // eslint-disable-line no-var
}

/**
 * A `SignalBridge` contains a coupled pair of methods:
 * Firstly a React hoook "use" function that sets up (and returns) a Signal
 * value-store, and secondly a Playwright-ready function that "send"s an
 * updated Signal value to the Page being tested.
 *
 * **NOTE:** This is usually not needed, and the sanest way to test
 * multiple states/variations of Hanna components is usually to click buttons
 * like a normal Playwright tester person, and/or just render multiple
 * differently configured instances of the components and snap one big
 * screenshot of the whole mess.
 */
type SignalBridge<T> = {
  /** A react hoook function that sets up (and returns) the Signal */
  use(initialValue: T): Signal<T>;
  /** Updates the Signal's value in/on the target Page */
  send(page: Page, value: T): Promise<void>;
};

/**
 * Set up a state updating mechanism that brideges the gap from Playwright
 * to a participating test webpage written in React.
 */
export const makeSignalBridge = <T = unknown>(id: string): SignalBridge<T> => {
  const useBridgedSignal: SignalBridge<T>['use'] = (initialValue) => {
    const signal = useSignal(initialValue);
    useEffect(
      () => {
        // Ensure window.__signals exists.
        const __signals = (window.__signals = window.__signals || {});
        if (__signals[id]) {
          throw new Error(
            `window.__signals[${JSON.stringify(id)}] is already defined.` +
              `Please use a unique "id" for your bridged signals.`
          );
        }
        __signals[id] = signal;

        return () => {
          const { __signals } = window;
          if (__signals) {
            // Cleanup all the things!
            delete __signals[id];
            if (Object.keys(__signals).length === 0) {
              delete window.__signals;
            }
          }
        };
      },
      // NOTE: Signal containers returned by `useSignal` never change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    return signal;
  };

  return {
    use: useBridgedSignal,

    send: (page, value) =>
      page.evaluate(
        ([id, value]) =>
          new Promise((resolve, reject) => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              window.__signals![id]!.value = value;
              setTimeout(resolve, 100);
            } catch (err) {
              // We really want the test to knoow if the signalling failed
              // for some reason.
              reject(err);
            }
          }),
        [id, value] as const
      ),
  };
};
