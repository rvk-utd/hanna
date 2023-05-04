import './initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import htmlLang from '@hugsmidjan/qj/htmlLang';
import { defaultAlertTexts } from '@reykjavik/hanna-react/Alert';
import { getTexts } from '@reykjavik/hanna-utils/i18n';

window.Hanna.makeSprinkle({
  name: 'Alert',
  selector: '.Alert--closable',

  init: (alertElm: HTMLElement) => {
    if (alertElm.querySelector('.Alert__close')) {
      return;
    }
    const { closeLabel, closeLabelLong } = getTexts(
      { lang: htmlLang(alertElm) },
      defaultAlertTexts
    );

    alertElm.append(
      ' ',
      E(
        'button',
        {
          className: 'Alert__close',
          type: 'button',
          onClick: () => {
            alertElm.hidden = true;
          },
          'aria-label': closeLabelLong,
          title: closeLabelLong || closeLabel,
        },
        closeLabel
      )
    );
  },
});
