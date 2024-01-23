import { sync as globSync } from 'glob';
import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import type blingJson from '../../hanna-css/src/assets/bling/files.json';
import type efnistaknJson from '../../hanna-css/src/assets/efnistakn/files.json';
import type formheimurJson from '../../hanna-css/src/assets/formheimur/files.json';
import type illustrationJson from '../../hanna-css/src/assets/illustrations/files.json';

import type { BlingType, Efnistakn, Formheimur, Illustration } from './assets.js';
import {
  blingTypes,
  efnistakn,
  formheimur,
  illustrations,
  setStyleServerUrl,
  styleServerUrl,
} from './assets.js';
import * as lib from './assets.js';
import { Equals, Expect } from './index.js';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils/assets', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      blingTypes: true,
      getBlingUrl: true,

      efnistakn: true,
      getEfnistaknUrl: true,

      formheimur: true,
      getFormheimurUrl: true,

      illustrations: true,
      getIllustrationUrl: true,

      getFavicon: true,

      getAssetUrl: true,

      setStyleServerUrl: true,
      styleServerUrl: true,

      getRvkLogoUrl: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

type _ = {
  BlingTypeIsExported: BlingType;
  EfnistaknIsExported: Efnistakn;
  FormheimurIsExported: Formheimur;
  IllustrationIsExported: Illustration;

  EfnistaknJsonKeysAreOK: Expect<Equals<keyof typeof efnistaknJson, Efnistakn>>;
  IllustrationJsonKeysAreOK: Expect<Equals<keyof typeof illustrationJson, Illustration>>;
  BlingJsonKeysAreOK: Expect<Equals<keyof typeof blingJson, BlingType>>;
  FormheimurJsonKeysAreOK: Expect<Equals<keyof typeof formheimurJson, Formheimur>>;
};

// ===========================================================================

const Default_URL = styleServerUrl; // Store initial default link for later comparison

const Url1 = 'http://blah.bar';
const Url2 = 'https://url3.com';
const Url3 = 'http://localhost:3000';

o.spec('setStyleServerUrl', () => {
  o('push', () => {
    o(styleServerUrl).equals(Default_URL)('Default_URL');
    o(lib.setStyleServerUrl(Url1)).equals(undefined)('push returns undefined');
    o(styleServerUrl).equals(Url1)('Url1');
    setStyleServerUrl(Url2);
    o(styleServerUrl).equals(Url2)('Url2');
    setStyleServerUrl(Url3);
    o(styleServerUrl).equals(Url3)('Url3');
  });
  o('pop', () => {
    o(styleServerUrl).equals(Url3)('Url3 state is retained between tests');
    o(setStyleServerUrl.pop()).equals(undefined)('pop returns undefined');
    o(styleServerUrl).equals(Url2)('Url2');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Url1)('Url1');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Default_URL)('Default_URL');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Default_URL)('overpopping is harmless');
    setStyleServerUrl(Url2);
    o(styleServerUrl).equals(Url2)('overpopping has no effect on next push');
  });
  o('repeat pushes', () => {
    setStyleServerUrl(Url3);
    setStyleServerUrl(Url3);
    setStyleServerUrl(Url3);
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Url3)('1st pop');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Url3)('2st pop');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Url2)('3st pop (back to start)');
  });
  o('seting default pushes to the stack', () => {
    setStyleServerUrl(undefined);
    setStyleServerUrl(undefined);
    o(styleServerUrl).equals(Default_URL)('Default_URL');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Default_URL)('2nd pop');
    setStyleServerUrl.pop();
    o(styleServerUrl).equals(Url2)('3rd pop (back to start)');
  });

  o('normalizes dirty URLs', () => {
    setStyleServerUrl('https://bar.baz/');
    o(styleServerUrl).equals('https://bar.baz');

    setStyleServerUrl(new URL('https://foo.bar/?query=yes'));
    o(styleServerUrl).equals('https://foo.bar');

    setStyleServerUrl(new URL('https://smu.ble:9999/#anchor'));
    o(styleServerUrl).equals('https://smu.ble:9999');

    setStyleServerUrl(new URL('https://testing:9999/some/peth/../path//#anchor'));
    o(styleServerUrl).equals('https://testing:9999/some/path');
  });

  o('accepts URL instances', () => {
    setStyleServerUrl(new URL('https://www.foo.bar'));
    o(styleServerUrl).equals('https://www.foo.bar');

    setStyleServerUrl(new URL('https://bar.baz:1234/path?query'));
    o(styleServerUrl).equals('https://bar.baz:1234/path');

    o(() => setStyleServerUrl('invalid-url')).throws(Error);
  });

  o('.reset() aliases .pop()', () => {
    o(setStyleServerUrl.pop).equals(
      setStyleServerUrl.reset // eslint-disable-line deprecation/deprecation
    );
  });
});

o.spec('hanna-css assets match asset arrays', () => {
  const objectify = (arr: Array<string>) =>
    arr.reduce((acc, key) => ({ ...acc, [key]: true }), {});

  o('efnistakn', () => {
    const efnistaknFiles = globSync('*.svg', {
      cwd: '../hanna-css/src/assets/efnistakn/',
    });
    const deprecatedEfnistakn = [
      'barnalaug',
      'eimbad',
      'heiturpottur',
      'kaldurpottur',
      'metralaug',
      'sauna',
      'sundfot',
      'utiklefi',
    ];
    reportKeyMismatch(
      objectify([...efnistakn, ...deprecatedEfnistakn].map((token) => `${token}.svg`)),
      objectify(efnistaknFiles)
    );
  });

  o('illustration', () => {
    const illustrationFiles = globSync('*.png', {
      cwd: '../hanna-css/src/assets/illustrations/',
    }).map((file) => file.replace(/---q\d{2}/, ''));
    const deprecatedIllustration: Array<string> = [];
    reportKeyMismatch(
      objectify(
        [...illustrations, ...deprecatedIllustration].map((token) => `${token}.png`)
      ),
      objectify(illustrationFiles)
    );
  });

  o('blingTypes', () => {
    const blingFiles = globSync('*.svg', {
      cwd: '../hanna-css/src/assets/bling/',
    });
    const deprecatedBlingTypes: Array<string> = [];
    reportKeyMismatch(
      objectify([...blingTypes, ...deprecatedBlingTypes].map((token) => `${token}.svg`)),
      objectify(blingFiles)
    );
  });

  o('formheimur', () => {
    const formheimurFiles = globSync('*.svg', {
      cwd: '../hanna-css/src/assets/formheimur/',
    });
    const deprecatedFormheimur: Array<string> = [];
    reportKeyMismatch(
      objectify([...formheimur, ...deprecatedFormheimur].map((token) => `${token}.svg`)),
      objectify(formheimurFiles)
    );
  });
});
