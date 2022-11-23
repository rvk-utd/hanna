import o from 'ospec';

import {
  buildVariables,
  getCssBundleUrl,
  setStyleServerUrl,
  styleServerUrl,
} from './cssutils';
import { CssVersionToken } from './style-server-info';

o.spec('buildVariables helper', () => {
  o('works', () => {
    o(buildVariables(['foo']).vars.foo + '').equals('var(--foo)');
    // Check if it is the version specifically configured for Hanna's naming patterns.
    o(buildVariables(['a$b_c']).vars.a$b_c + '').equals('var(--a_b-c)')(
      'maps "_" to "\'" and "$" to "_"'
    );
    o(typeof buildVariables.isVar).equals('function');
    o(typeof buildVariables.join).equals('function');
  });

  o('accepts custom `namespace` parameter', () => {
    o(buildVariables(['bar_baz'], 'FOO').vars.bar_baz + '').equals('var(--FOO--bar-baz)')(
      'appends double-dash to namespace'
    );
    o(buildVariables(['bar_baz'], 'FOO----').vars.bar_baz + '').equals(
      'var(--FOO--bar-baz)'
    )('collapses multiple trailing dashes');
    o(buildVariables(['bar_baz'], 'FOO__').vars.bar_baz + '').equals(
      'var(--FOO__bar-baz)'
    )('accepts double-underscores as a suffix');
  });
});

// ---------------------------------------------------------------------------

o.spec('getCssBundleUrl', () => {
  o('works', () => {
    o(getCssBundleUrl(' Foo, \nBar ')).equals(`${styleServerUrl}/bundle/dev?m=Foo,Bar`)(
      'Accepts string and trims them a bit'
    );
    o(getCssBundleUrl(['Foo ', '  Bar', 'A,B '])).equals(
      styleServerUrl + '/bundle/dev?m=Foo,Bar,A,B'
    )('Accepts Array and trims them also');
  });

  o('accepts a version token', () => {
    const version: CssVersionToken = 'v0.2';
    o(getCssBundleUrl('Foo', { version })).equals(
      `${styleServerUrl}/bundle/${version}?m=Foo`
    )('for known version');

    const newer = 'v0.8.99999';
    // TS check less safe "AcceptNewerVersion" option activated via type generics
    o(getCssBundleUrl<true>('Foo', { version: newer })).equals(
      `${styleServerUrl}/bundle/${newer}?m=Foo`
    )('Allows unsafe "newer version"');

    getCssBundleUrl<true>('Foo', {
      // @ts-expect-error  (Testing too-far-future version)
      version: 'v0.9',
    });
    getCssBundleUrl<true>('Foo', {
      // @ts-expect-error  (Testing too-far-future version)
      version: 'v1.0',
    });

    // @ts-expect-error  (Testing wonky input)
    const imaginary: CssVersionToken = 'imaginary/version';
    o(getCssBundleUrl('Foo', { version: imaginary })).equals(
      `${styleServerUrl}/bundle/${imaginary}?m=Foo`
    )('Allows bonkers versions even if TypeScript complains');
  });

  o('respects setStyleServerUrl updates', () => {
    const oldServerUrl = styleServerUrl;
    const newServerUrl = 'https://foo.bar/baz/';
    setStyleServerUrl(newServerUrl);
    o(getCssBundleUrl('Foo')).equals(`${newServerUrl}bundle/dev?m=Foo`);
    setStyleServerUrl.reset();
    o(styleServerUrl).equals(oldServerUrl)('resetting styleServerUrl works');
    o(getCssBundleUrl('Foo')).equals(`${oldServerUrl}/bundle/dev?m=Foo`);
  });
});
