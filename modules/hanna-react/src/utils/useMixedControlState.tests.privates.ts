import { createElement, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { wait } from '@hugsmidjan/qj/wait';
import o, { Spy } from 'ospec';

import { useMixedControlState } from './useMixedControlState.js';

type CtrlMode = ReturnType<typeof useMixedControlState>[2];

type TestProps = {
  value?: string;
  defaultValue?: string;
};

type State = {
  value: string | undefined;
  mode: CtrlMode;
  warning?: string | boolean;
};

type MakeCfg = TestProps & {
  emptyValue?: string;
};

type AssertFn = (expected: State, message?: string) => (actual: State) => State;

type ChangePropsFn = (
  value?: string,
  defaultValue?: string,
  expected?: State,
  customMessage?: string
) => () => Promise<State>;

type SetLocalStateFn<V = State['value']> = (
  newLocalState: V | ((prevState: V) => V),
  expected?: State,
  customMessage?: string
) => () => Promise<State>;

type TestCallback = (tools: {
  render: Promise<State>;
  assert: AssertFn;
  props: ChangePropsFn;
  localState: SetLocalStateFn;
}) => Promise<unknown>;

type WL = NonNullable<typeof useMixedControlState.$warningLogger>;
type WarningLoggerSpy = Spy<Parameters<WL>, undefined>;

// ---------------------------------------------------------------------------

export const createTest = (config: MakeCfg, callback: TestCallback) => {
  let containerElm: HTMLElement | undefined;

  const cleanup = () => {
    if (!containerElm) {
      return;
    }
    unmountComponentAtNode(containerElm);
    containerElm.remove();
    containerElm = undefined;
  };

  const state: State = { value: undefined, mode: undefined };
  let _setProps: (newProps: TestProps) => void;
  type V = State['value'];
  let _setLocalState: (newLocalState: V | ((x: V) => V)) => void;

  let warningLogger: WarningLoggerSpy;

  const assert: AssertFn =
    ({ value, mode, warning }, message = '') =>
    (actual) => {
      const ret = o(actual).deepEquals({ value, mode });
      if (message) {
        ret(message);
      }

      const msg = warningLogger.args[0] || undefined;
      if (typeof warning === 'string') {
        const match = msg && msg.replace(/\s\s+/g, '').includes(warning);
        o(msg).equals(match ? msg : warning)(`${message} warning`);
      } else {
        o(msg || undefined).equals(warning ? msg || 'warning logged' : undefined)(
          `${message} warning`
        );
      }

      return state;
    };

  const waitForState = (expected?: State, message?: string): Promise<State> =>
    wait(30).then(() => {
      if (expected) {
        return assert(expected, message)(state);
      }
      return state;
    });

  const renderComponent = () => {
    containerElm = document.createElement('div');

    render(
      createElement(() => {
        const [props, setProps] = useState(config);
        useMixedControlState.$warningLogger = warningLogger = o.spy();
        const [value, setValue, mode] = useMixedControlState(
          props,
          'value',
          config.emptyValue
        );
        delete useMixedControlState.$warningLogger;

        state.value = value;
        state.mode = mode;
        _setProps = setProps;
        _setLocalState = setValue;

        // we're only testing the hook
        return null;
      }),
      containerElm
    );
    return waitForState();
  };

  const props: ChangePropsFn = (value, defaultValue, expected, customMessage) => () => {
    _setProps({ value, defaultValue });
    return waitForState(expected, customMessage || `props: ${value} | ${defaultValue}`);
  };
  const localState: SetLocalStateFn = (newLocalState, expected, customMessage) => () => {
    _setLocalState(newLocalState);
    return waitForState(expected, customMessage || `localState: ${newLocalState}`);
  };

  return Promise.resolve({
    render: renderComponent(),
    assert,
    props,
    localState,
  })
    .then(callback)
    .then(cleanup);
};
