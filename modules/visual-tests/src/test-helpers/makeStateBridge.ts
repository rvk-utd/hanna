import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Page } from '@playwright/test';

declare global {
  /**
   * Used as a temporary Global storage for communication state values between
   * Playwright tests and React test-page components
   */
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var __state: undefined | Record<string, Dispatch<SetStateAction<any>>>;
}

/**
 * A `StateBridge` contains a coupled pair of methods:
 * Firstly a React hoook "use" function that sets up (and returns) a Signal
 * value-store, and secondly a Playwright-ready function that "send"s an
 * updated Signal value to the Page being tested.
 *
 * __NOTE:__ This is usually not needed, and the sanest way to test
 * multiple states/variations of Hanna components is usually to click buttons
 * like a normal Playwright tester person, and/or just render multiple
 * differently configured instances of the components and snap one big
 * screenshot of the whole mess.
 */
type StateBridge<T> = {
  /** A react hoook function that sets up (and returns) the Signal */
  use(initialValue: T): [value: T, setValue: Dispatch<SetStateAction<T>>];
  /** Updates the Signal's value in/on the target Page */
  send(page: Page, value: T | ((prevValue: T) => T)): Promise<void>;
};

/**
 * Set up a state updating mechanism that brideges the gap from Playwright
 * to a participating test webpage written in React.
 */
export const makeStateBridge = <T = unknown>(id: string): StateBridge<T> => {
  const useBridgedState: StateBridge<T>['use'] = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    useEffect(
      () => {
        // Ensure window.__state exists.
        const __state = (window.__state = window.__state || {});
        if (__state[id]) {
          throw new Error(
            `window.__state[${JSON.stringify(id)}] is already defined.` +
              `Please use a unique "id" for your bridged signals.`
          );
        }
        __state[id] = setValue;

        return () => {
          const { __state } = window;
          if (__state) {
            // Cleanup all the things!
            delete __state[id];
            if (Object.keys(__state).length === 0) {
              delete window.__state;
            }
          }
        };
      },
      // NOTE: Signal containers returned by `useSignal` never change.
      []
    );
    return [value, setValue];
  };

  return {
    use: useBridgedState,

    send: (page, value) =>
      page.evaluate(
        ([id, value]) =>
          new Promise((resolve, reject) => {
            try {
              window.__state![id]!(value);
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
