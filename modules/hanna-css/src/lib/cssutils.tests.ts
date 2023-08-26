import o from 'ospec';

import {
  buildVariables,
  getCssBundleUrl,
  setStyleServerUrl,
  styleServerUrl,
  targetCssVersion,
} from './cssutils.js';
import { CssVersionToken } from './style-server-info.js';

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
  // default version folder depends on NODE_ENV
  const ver = process.env.NODE_ENV === 'production' ? `v${targetCssVersion}` : 'dev';

  o('works', () => {
    o(getCssBundleUrl(['-basics', 'ButtonPrimary'])).equals(
      `${styleServerUrl}/bundle/${ver}?m=-basics,ButtonPrimary`
    )('Accepts CssModuleToken array');

    o(getCssBundleUrl(' Foo, \nBar ')).equals(
      `${styleServerUrl}/bundle/${ver}?m=Foo,Bar`
    )('Accepts string and trims them a bit');

    // @ts-expect-error  (Testing wonky input)
    const borkedTokenArr: Array<CssModuleToken> = ['Foo ', '  Bar', 'A,B '];
    o(getCssBundleUrl(borkedTokenArr)).equals(
      `${styleServerUrl}/bundle/${ver}?m=Foo,Bar,A,B`
    )('Also trims wonky array items a bit');
  });

  o('accepts a version token', () => {
    const version: CssVersionToken = 'v0.8';

    o(getCssBundleUrl('Foo', { version })).equals(
      `${styleServerUrl}/bundle/${version}?m=Foo`
    )('for known version');

    const newer = `${version}.99999` as const;
    // TS check less safe "AcceptNewerVersion" option activated via type generics
    o(getCssBundleUrl<true>('Foo', { version: newer })).equals(
      `${styleServerUrl}/bundle/${newer}?m=Foo`
    )('Allows unsafe "newer version"');

    if (false as boolean) {
      const outdatedVersion = 'v0.7';
      const futureVersion = 'v0.9';
      const farFutureVersion = 'v1.0';

      getCssBundleUrl<true>('Foo', {
        // @ts-expect-error  (Testing bad input)
        version: outdatedVersion,
      });
      getCssBundleUrl<true>('Foo', {
        // @ts-expect-error  (Testing bad input)
        version: futureVersion,
      });
      getCssBundleUrl<true>('Foo', {
        // @ts-expect-error  (Testing bad input)
        version: farFutureVersion,
      });
    }

    // @ts-expect-error  (Testing wonky input)
    const imaginaryVersion: CssVersionToken = 'imaginary/version';
    o(getCssBundleUrl('Foo', { version: imaginaryVersion })).equals(
      `${styleServerUrl}/bundle/${imaginaryVersion}?m=Foo`
    )('Allows bonkers versions even if TypeScript complains');
  });

  o('respects setStyleServerUrl updates', () => {
    const oldServerUrl = styleServerUrl;
    const newServerUrl = 'https://foo.bar/baz/';
    setStyleServerUrl(newServerUrl);
    o(getCssBundleUrl('Foo')).equals(`${newServerUrl}bundle/${ver}?m=Foo`);
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(oldServerUrl)('resetting styleServerUrl works');
    o(getCssBundleUrl('Foo')).equals(`${oldServerUrl}/bundle/${ver}?m=Foo`);
  });
});
