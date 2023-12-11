import 'hanna-test-helpers/polyfill-document';
import './ShareButtons.js';

import E from '@hugsmidjan/qj/E';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { ShareButtonPlatforms } from '@reykjavik/hanna-utils/shareButtonsUtils';
import o from 'ospec';

const defaultButtonTypes = ['facebook', 'twitter'] as const;

const numButtons = (elm: Element) => qq('.ShareButtons__link', elm).length;

const hasButtonTypes = (elm: Element, types: ReadonlyArray<ShareButtonPlatforms>) =>
  numButtons(elm) === types.length &&
  types.every((type) => q(`.ShareButtons__link--${type}`, elm) != null);

const getButton = (elm: Element, type: ShareButtonPlatforms) =>
  q<HTMLAnchorElement>(`.ShareButtons__link--${type}`, elm);

// ---------------------------------------------------------------------------

const htmlElm = document.documentElement;

const beforeLang = htmlElm.getAttribute('lang');
const resetDocLang = () => {
  beforeLang == null
    ? htmlElm.removeAttribute('lang')
    : htmlElm.setAttribute('lang', beforeLang);
};
const setDocLang = (lang?: string) => {
  lang == null ? htmlElm.removeAttribute('lang') : htmlElm.setAttribute('lang', lang);
};

// NOTE: Test specs run in parallel and wiping `document.body`
// may therefore result in killing tests in another spec suite
const specBody = E('div');
document.body.append(specBody);

// ---------------------------------------------------------------------------

o.spec('ShareButtons', () => {
  o.afterEach(() => {
    resetDocLang();
    specBody.textContent = '';
  });

  const H = window.Hanna;

  const appendAndSprinkle = (elm: Element) => {
    specBody.append(elm);
    H.sprinkles.ShareButtons!();
    return elm;
  };

  o('injects default share buttons into pre-existing div', () => {
    const preExistingText = 'Existing text content';
    const elm = appendAndSprinkle(
      E('div', { className: 'ShareButtons' }, preExistingText)
    );

    o(elm.textContent!.includes(preExistingText)).equals(false)(
      'strips away pre-existing text'
    );

    o(q('.ShareButtons__label', elm)).equals(undefined)('Has no label element');
    o(qq('ul.ShareButtons__list', elm).length).equals(1)('Has an <ul> element');
    o(qq('li.ShareButtons__item', elm).length).equals(2)('has two <li> elements');
    o(hasButtonTypes(elm, defaultButtonTypes)).equals(true)('has the default links');
    o(qq('*', elm).length).equals(1 + 2 * defaultButtonTypes.length)(
      'has no extra elements'
    );
    o(getButton(elm, 'twitter')?.textContent).equals('Twitter')(
      'Buttons have textContent'
    );
    o(getButton(elm, 'twitter')?.target).equals('_blank')(
      'Buttons have target attribute'
    );
  });

  o('Makes aria-label visible label/title element', () => {
    const labelText = 'Deildu fréttinni';
    const elm = appendAndSprinkle(
      E('div', { className: 'ShareButtons', 'aria-label': labelText })
    );
    o(q('.ShareButtons__label', elm)?.textContent).equals('Deildu fréttinni')(
      'Has label element'
    );
  });

  o(
    'Sets default label value based on document language *IF* no label-attributes are set',
    () => {
      setDocLang('is-IS');
      const elm1 = appendAndSprinkle(E('div', { className: 'ShareButtons' }));
      o(q('.ShareButtons__label', elm1)?.textContent).equals('Deila síðu á')(
        'Has default label element if document language is supported'
      );
      const elm2 = appendAndSprinkle(
        E('div', { className: 'ShareButtons', 'data-buttonlabel': '' })
      );
      o(q('.ShareButtons__label', elm2)).equals(undefined)(
        'ignores document-language based defaults if `data-buttonlabel` is set'
      );
      const elm3 = appendAndSprinkle(
        E('div', { className: 'ShareButtons', 'data-emailsubject': '' })
      );
      o(q('.ShareButtons__label', elm3)?.textContent).equals('Deila síðu á')(
        'Sets default label element if `data-emailsubject` is empty'
      );
      const elm4 = appendAndSprinkle(
        E('div', { className: 'ShareButtons', 'data-emailsubject': 'Something' })
      );
      o(q('.ShareButtons__label', elm4)).equals(undefined)(
        'ignores document-language based defaults if `data-emailsubject` is set'
      );

      setDocLang('ru');
      const elm_ru = appendAndSprinkle(E('div', { className: 'ShareButtons' }));
      o(q('.ShareButtons__label', elm_ru)).equals(undefined)(
        'Has no label element when document language is not supported'
      );
    }
  );

  o('accepts a custom button label templates', () => {
    const elm1 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-buttonlabel': ' Deila á',
      })
    );
    o(getButton(elm1, 'twitter')?.textContent).equals('Deila á Twitter')(
      'trims the label and appends the platform name'
    );

    const elm2 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-buttonlabel': 'Ofur  ${name} deiling',
      })
    );
    o(getButton(elm2, 'twitter')?.textContent).equals('Ofur  Twitter deiling')(
      'replaces the first `${name}` token with the platform name'
    );

    const elm3 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-buttonlabel': '${name} - ${name} - ${name}${name}',
      })
    );
    o(getButton(elm3, 'twitter')?.textContent).equals(
      'Twitter - ${name} - ${name}${name}'
    )('ingores successive `${name}` tokens');
  });

  o('accepts list of custom button types', () => {
    const elm = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': 'linkedin,twitter,email',
      })
    );
    o(hasButtonTypes(elm, ['linkedin', 'twitter', 'email'])).equals(true);
  });

  o('non-email buttons open in new window', () => {
    const elm = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': 'email,twitter',
      })
    );
    o(getButton(elm, 'email')?.target).equals('');
    o(getButton(elm, 'twitter')?.target).equals('_blank');
  });

  o('gracefully ignores empty and/or invalid tokens and trims spaces', () => {
    const elm1 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': '',
      })
    );
    o(hasButtonTypes(elm1, defaultButtonTypes)).equals(true)(
      'replaces empty type list with defaults'
    );

    const elm2 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': 'blah,, bork-bork, bjork',
      })
    );
    o(hasButtonTypes(elm2, defaultButtonTypes)).equals(true)(
      'replaces nonsense type list with defaults'
    );

    const elm3 = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': 'bork, twitter ,bork-bork,   email',
      })
    );
    o(hasButtonTypes(elm3, ['twitter', 'email'])).equals(true)(
      'trims dirty lists down to just the valid tokens'
    );
  });

  o('removes custom data-attributes after sprinkling', () => {
    const elm = appendAndSprinkle(
      E('div', {
        className: 'ShareButtons',
        'data-button-types': '',
        'data-buttonlabel': 'Foo',
      })
    );
    o(elm.hasAttribute('data-button-types')).equals(false);
    o(elm.hasAttribute('data-buttonlabel')).equals(false);
  });
});
