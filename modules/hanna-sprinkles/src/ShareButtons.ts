import './_/initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import {
  getDocMeta,
  getShareButtonLabel,
  openInPopup,
  ShareButtonPlatforms,
  shareButtonTexts,
  shareButtonTypes,
} from '@reykjavik/hanna-utils/shareButtonsUtils';

const getPlatforms = (buttonTypes?: string): Array<ShareButtonPlatforms> => {
  const typeList = (buttonTypes || '')
    .trim()
    .toLowerCase()
    .split(/\s*,\s*/)
    .filter((token) => token);
  const platforms = shareButtonTypes.filter((type) => typeList.includes(type));
  return platforms.length ? platforms : ['facebook', 'twitter'];
};

const makeShareButton = (type: ShareButtonPlatforms, href: string, label: string) => {
  const buttonText = getShareButtonLabel(type, label);
  const popup = type !== 'email';
  return E(
    'li',
    { className: 'ShareButtons__item' },
    E(
      'a',
      {
        className: 'ShareButtons__link ShareButtons__link--' + type,
        href,
        title: buttonText,
        rel: 'noopener noreferrer',
        target: popup ? '_blank' : undefined,
        onClick: popup ? openInPopup : undefined,
      },
      buttonText
    )
  );
};

window.Hanna.makeSprinkle({
  name: 'ShareButtons',

  init: (elm: HTMLElement) => {
    const elmData = elm.dataset;
    const emailSubject = elmData.emailsubject;
    const platforms = getPlatforms(elmData.buttonTypes);
    const docMeta = getDocMeta({ emailSubject });
    let label = elm.getAttribute('aria-label') || undefined;
    let buttonLabel = elmData.buttonlabel;

    if (label == null && buttonLabel == null && !emailSubject) {
      const txt = shareButtonTexts[docMeta.lang];
      if (txt) {
        label = txt.label;
        buttonLabel = txt.buttonLabel;
      }
    }

    elm.textContent = ''; // start by emptying the element

    if (label) {
      elm.append(E('strong', { className: 'ShareButtons__label' }, label));
    }
    const shareButtons = platforms.map((type) =>
      makeShareButton(type, docMeta.hrefs[type], buttonLabel || '')
    );
    elm.append(E('ul', { className: 'ShareButtons__list' }, shareButtons));

    delete elmData.buttonTypes;
    delete elmData.buttonlabel;
    delete elmData.emailsubject;
  },
});
