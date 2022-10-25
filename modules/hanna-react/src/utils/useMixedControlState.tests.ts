import 'hanna-test-helpers/polyfill-document';

import { Equals, Expect } from '@reykjavik/hanna-utils';
import o from 'ospec';

import { useMixedControlState } from './useMixedControlState';
import { createTest } from './useMixedControlState.tests.privates';

// ---------------------------------------------------------------------------

const undef = undefined;

const DUAL = "Don't mix";
const C_to_U = 'from controlled to uncontrolled mode';
const U_to_C = 'from uncontrolled to controlled mode';

const C = 'controlled';
const U = 'uncontrolled';

// ---------------------------------------------------------------------------

o.spec('useMixedControlState', () => {
  o.specTimeout(5000);

  o.beforeEach(() => {
    o.timeout(2000);
  });
  // o.after(() => {
  //   document.documentElement.textContent = '';
  //   window.close();
  // });

  o('no intialProps ', () =>
    createTest({ value: undef }, ({ render, assert, props, localState }) =>
      render
        .then(assert({ value: undef, mode: undef }))
        .then(localState('yo', { value: 'yo', mode: U }))
        .then(localState('yo!', { value: 'yo!', mode: U }))
        // setting defaultValue doesn't work because localState has been changed
        .then(props(undefined, 'ho!', { value: 'yo!', mode: U }))
        // passing a "value" prop turns the component to controlled mode
        .then(props('hello', undef, { value: 'hello', mode: C, warning: U_to_C }))
        // 'stays controlled if undef value is passed'
        .then(props(undef, undef, { value: undef, mode: C }))
        // 'Stays controlled even if a new default value is passed'
        .then(props(undef, 'Jón', { value: undef, mode: C, warning: C_to_U }))
        // 'Warns about dual mode'
        .then(props('Gunna', 'Pétur', { value: 'Gunna', mode: C, warning: DUAL }))
    )
  );

  o('controlled value', () =>
    createTest({ value: 'Orange' }, ({ render, assert, props, localState }) =>
      render
        .then(assert({ value: 'Orange', mode: C }))
        .then(props('Apple', undef, { value: 'Apple', mode: C }))
        .then(localState('Platypus', { value: 'Apple', mode: C }))
        .then(props(undef, 'Red', { value: undef, mode: C, warning: C_to_U }))
    )
  );

  o('intial defaultValue', () =>
    createTest({ defaultValue: 'Keyboard' }, ({ render, assert, props, localState }) =>
      render
        .then(assert({ value: 'Keyboard', mode: U }))
        .then(props(undef, 'Mouse', { value: 'Mouse', mode: U }))
        .then(props(undef, 'Touch', { value: 'Touch', mode: U }))
        .then(localState('Mic', { value: 'Mic', mode: U }))
        .then(props(undef, 'WebCam', { value: 'Mic', mode: U }))
        .then(props('Foo!', undef, { value: 'Foo!', mode: C, warning: U_to_C }))
    )
  );

  o('defaultDefault', () =>
    createTest({ emptyValue: '-empty-' }, ({ render, assert, props, localState }) =>
      render
        .then(assert({ value: '-empty-', mode: undef }))
        .then(props(undef, 'AltaVista', { value: 'AltaVista', mode: U }))
        .then(props(undef, undef, { value: '-empty-', mode: U }))
        .then(localState('Yahoo', { value: 'Yahoo', mode: U }))
        .then(localState(() => undefined, { value: '-empty-', mode: U }))
        .then(localState('Yahoo', { value: 'Yahoo', mode: U }))
        .then(localState(undefined, { value: '-empty-', mode: U }))
        .then(props(undef, 'GeoCities', { value: '-empty-', mode: U }))
    )
  );
});

/* eslint-disable @typescript-eslint/no-unused-vars */

const useTypeTests = () => {
  type Foo = Array<number>;
  type MaybeFoo = Foo | undefined;
  type FooProps = {
    open?: Foo;
    defaultOpen?: Foo;
  };

  const numArrProps: FooProps = {};

  {
    const [open, setOpenArray, mode] = useMixedControlState(numArrProps, 'open');
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
    setOpenArray((prevOpen) => {
      type TestPrevOpen = Expect<Equals<typeof prevOpen, MaybeFoo>>;
      return prevOpen;
    });
    setOpenArray(open);
  }
  {
    const [open, setOpenArray, mode] = useMixedControlState(
      numArrProps,
      'open',
      undefined
    );
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
    setOpenArray((prevOpen) => {
      type TestPrevOpen = Expect<Equals<typeof prevOpen, MaybeFoo>>;
      return prevOpen;
    });
    setOpenArray(open);
  }
  {
    const [open, setOpenArray, mode] = useMixedControlState(numArrProps, 'open', []);
    type TestOpen = Expect<Equals<typeof open, Foo>>;
    setOpenArray((prevOpen) => {
      type TestPrevOpen = Expect<Equals<typeof prevOpen, Foo>>;
      return prevOpen;
    });
    setOpenArray(open);
  }
  {
    const [open, setOpenArray, mode] = useMixedControlState(
      numArrProps,
      'open',
      [] as MaybeFoo
    );
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
    setOpenArray((prevOpen) => {
      type TestPrevOpen = Expect<Equals<typeof prevOpen, MaybeFoo>>;
      return prevOpen;
    });
    setOpenArray(open);
  }

  const o = numArrProps.open;
  const dO = numArrProps.defaultOpen;
  {
    const [open] = useMixedControlState.raw(o, dO, 'open');
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
  }
  {
    const [open] = useMixedControlState.raw(o, dO, 'open', undefined);
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
  }
  {
    const [open] = useMixedControlState.raw(o, dO, 'open', []);
    type TestOpen = Expect<Equals<typeof open, Foo>>;
  }
  {
    const [open] = useMixedControlState.raw(o, dO, 'open', [] as MaybeFoo);
    type TestOpen = Expect<Equals<typeof open, MaybeFoo>>;
  }
};

/* eslint-enable @typescript-eslint/no-unused-vars */
