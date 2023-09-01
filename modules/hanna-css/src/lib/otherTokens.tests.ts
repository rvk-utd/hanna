import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import { formFieldVars } from './otherTokens.js';

o.spec('formFieldVars', () => {
  o('exposes known CSS variable tokens', () => {
    const expectedTokens: Record<keyof typeof formFieldVars, true> = {
      input__background_color: true,
      input__border_color: true,
      input__border_radius: true,
      input__border_inner_radius: true,
      input__height: true,
      input__height_inner: true,
      input__padding_top: true,
      input__padding_bottom: true,
      input__font_size: true,
      input__color: true,
      input__color_placeholder: true,
      input__line_height: true,
      input__paddingH: true,
    };

    reportKeyMismatch(formFieldVars, expectedTokens);
  });
});
