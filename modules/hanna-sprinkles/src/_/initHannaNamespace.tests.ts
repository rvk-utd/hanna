/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-condition */
import 'hanna-test-helpers/polyfill-document';
import './initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import o from 'ospec';

// NOTE: Test specs run in parallel and wiping `document.body`
// may therefore result in killing tests in another spec suite
const specBody = E('div');
document.body.append(specBody);

// ---------------------------------------------------------------------------

o.spec('initHannaNamespace', () => {
  const H = window.Hanna;

  o('sets up window.Hanna correctly', () => {
    o(typeof H).equals('object');
    o(typeof H.sprinkles).equals('object');
    o(H.refresh && !!H.refresh.call).equals(true);
    o(H.makeSprinkle && !!H.makeSprinkle.call).equals(true);
  });
});

o.spec('makeSprinkle', () => {
  const H = window.Hanna;

  const fooElm1 = E('div', { class: 'Foo' }, 'foo 1');
  const fooElm2 = E('div', { class: 'Foo' }, 'foo 2');
  const fooElm3 = E('div', { class: 'Foo' }, 'foo 3');
  const barElm = E('div', { class: 'Bar' }, 'world');

  specBody.append(fooElm1, fooElm2, barElm);

  const fooInit = o.spy((elm: HTMLElement) => elm.textContent);
  const fooRefresh = o.spy();
  const fooUnmount = o.spy();

  const barInit = o.spy((elm: HTMLElement) => elm.textContent);
  const barRefresh = o.spy();

  o('creates sprinkle and instantly runs it', () => {
    const Foo = H.makeSprinkle({
      name: 'Foo',
      init: fooInit,
      refresh: fooRefresh,
      unmount: fooUnmount,
    });
    o(Foo && !!Foo.call).equals(true)('returns the sprinkle function for convenience');
    o(H.sprinkles.Foo && !!H.sprinkles.Foo.call).equals(true)('sets Hanna.sprinkles.Foo');
    o(Foo).equals(H.sprinkles.Foo!)(
      'The returned function is the same as Hanna.sprinkles.Foo'
    );

    o(fooInit.calls).deepEquals([
      // @ts-expect-error  (pending @types/ospec fix)
      { this: undefined, args: [fooElm1] },
      // @ts-expect-error  (pending @types/ospec fix)
      { this: undefined, args: [fooElm2] },
    ])('calls init called for each .Foo element in the document');
    o(fooRefresh.callCount).equals(0)('refresh methods are not called instantly');

    H.sprinkles.Foo!();
    o(fooInit.callCount).equals(2)('inits are only called once');
    o(fooRefresh.calls).deepEquals([
      // @ts-expect-error  (pending @types/ospec fix)
      { this: undefined, args: [fooElm1, 'foo 1'] },
      // @ts-expect-error  (pending @types/ospec fix)
      { this: undefined, args: [fooElm2, 'foo 2'] },
    ])('calls refresh called for each .Foo and passes `data`');

    specBody.append(fooElm3);

    const oldInitCallCount = fooInit.callCount;
    H.sprinkles.Foo!();
    o(fooInit.callCount).equals(oldInitCallCount + 1)(
      'newly added elements are detected and inited'
    );
    o(fooInit.args).deepEquals([fooElm3])('newly added elements are detect');
    o(fooRefresh.callCount).equals(4)('refresh methods are called again');

    fooElm1.remove();
    H.sprinkles.Foo!();
    o(fooUnmount.calls).deepEquals([
      // @ts-expect-error  (pending @types/ospec fix)
      { this: undefined, args: [fooElm1, 'foo 1'] },
    ])('calls unmount for removed .Foo elements');
    o(fooRefresh.callCount).equals(6)(
      'refresh methods are not called for removed elements'
    );

    H.sprinkles.Foo!();
    o(fooUnmount.callCount).equals(1)('only called once for removed elements');
  });

  o('Gracefully handles repeated/same-name Sprinkle building', () => {
    const oldFooSprinkle = H.sprinkles.Foo;
    const newFooInit = o.spy();
    const newFoo = H.makeSprinkle({
      name: 'Foo',
      init: newFooInit,
    });
    o(newFoo && !!newFoo.call).equals(true)('returns the new sprinkle function ');
    o(H.sprinkles.Foo).equals(oldFooSprinkle)('The global sprinkle remains untouched');
    o(newFoo).notEquals(H.sprinkles.Foo!)(
      'The returned function is NOT the same as Hanna.sprinkles.Foo'
    );
    o(newFooInit.callCount).equals(0)('New Foo sprinkle is NOT instantly inited');
  });

  o('creates Bar sprinkle and instantly runs it', () => {
    const oldFooRefreshCount = fooRefresh.callCount;

    H.makeSprinkle({
      name: 'Bar',
      init: barInit,
      refresh: barRefresh,
    });
    o(barInit.callCount).equals(1)('calls Bar init');
    o(fooRefresh.callCount).equals(oldFooRefreshCount)(
      'creating Bar does not affect Foo sprinkles'
    );

    H.sprinkles.Bar!();
    o(barRefresh.callCount).equals(1)('calls Bar refresh');
    o(fooRefresh.callCount).equals(oldFooRefreshCount)(
      'refreshing Bar does not affect Foo sprinkles'
    );
  });

  o('Hanna.refresh() refreshes all sprinkles', () => {
    const oldFooRefreshCount = fooRefresh.callCount;
    const oldBarRefreshCount = barRefresh.callCount;
    H.refresh();
    o(fooRefresh.callCount).equals(oldFooRefreshCount + 2)('Foos are refreshed');
    o(barRefresh.callCount).equals(oldBarRefreshCount + 1)('Bars are refreshed');
  });

  o('init marks elements with `data-sprinkled=""`', () => {
    const bazElm = E('div', { class: 'Baz' }, 'baz!');
    specBody.append(bazElm);

    H.makeSprinkle({
      name: 'Baz',
      init: (elm) => {
        o(elm.hasAttribute('data-sprinkled')).equals(false)('not set before init');
      },
    });
    o(bazElm.getAttribute('data-sprinkled')).equals('')('set after init');
    H.sprinkles.Baz!();
    o(bazElm.getAttribute('data-sprinkled')).equals('')('untouched on refresh');
    bazElm.remove();
    H.sprinkles.Baz!();
    o(bazElm.hasAttribute('data-sprinkled')).equals(false)('removed on unmount');
  });

  o('data-sprinkled attribute manually set during init is preserved', () => {
    const bazElm = E('div', { class: 'Baz2' }, 'baz2!');
    specBody.append(bazElm);

    H.makeSprinkle({
      name: 'Baz2',
      init: (elm) => {
        elm.setAttribute('data-sprinkled', 'baaa');
      },
    });
    o(bazElm.getAttribute('data-sprinkled')).equals('baaa');
    H.sprinkles.Baz!();
    o(bazElm.getAttribute('data-sprinkled')).equals('baaa')('untouched on refresh');
  });

  o(
    'ignores elements already marked as `data-sprinkled="true"` by SSR/React/etc.',
    () => {
      const preSprinkledElm = E('div', { class: 'SSR', 'data-sprinkled': true }, '');
      specBody.append(preSprinkledElm);

      H.makeSprinkle({
        name: 'SSR',
        init: (elm) => {
          elm.textContent = 'Inited';
        },
        refresh: (elm) => {
          elm.textContent = 'Refreshed';
        },
        unmount: (elm) => {
          elm.textContent = 'Unmounted';
        },
      });
      o(preSprinkledElm.textContent).equals('')('ingnored on init');
      H.sprinkles.SSR!();
      o(preSprinkledElm.textContent).equals('')('ignored on refresh');
      preSprinkledElm.remove();
      H.sprinkles.SSR!();
      o(preSprinkledElm.textContent).equals('')('ignored on unmount');
    }
  );

  o('Accepts a custom `dataAttr` name', () => {
    const bazElm = E('div', { class: 'Smu' }, 'Smu!!');
    specBody.append(bazElm);

    H.makeSprinkle({
      name: 'Smu',
      dataAttr: 'smu',
      init: () => undefined,
    });
    o(bazElm.getAttribute('data-smu')).equals('')('set on init');
    o(bazElm.getAttribute('data-sprinkled')).equals(null)('does not set data-sprinkled');
    bazElm.setAttribute('data-smu', 'moo');
    H.sprinkles.Smu!();
    o(bazElm.getAttribute('data-smu')).equals('moo')('untouched on refresh');
    bazElm.remove();
    H.sprinkles.Smu!();
    o(bazElm.getAttribute('data-smu')).equals(null)('removed on unmount');
  });
});
