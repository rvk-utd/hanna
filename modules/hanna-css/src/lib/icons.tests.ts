import { Expect, Extends, NotExtends } from '@reykjavik/hanna-utils';
import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import { iconfont_raw, IconName_old, icons } from './icons.js';

o.spec('icons', () => {
  o('icon names match predetermined list', () => {
    const expectedIcons = {
      calendar: true,
      chat: true,
      checkmark: true,
      close: true,
      data: true,
      document: true,
      edit: true,
      external: true,
      file_pdf: true,
      home: true,
      info: true,
      link: true,
      location: true,
      pen: true,
      search: true,
      text: true,
      time: true,
      user: true,
      globe: true,
    };

    // eslint-disable-next-line deprecation/deprecation
    reportKeyMismatch(icons, expectedIcons);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
{
  // eslint-disable-next-line deprecation/deprecation
  type TrimmedIconName = keyof typeof icons;

  type Test_IconName = Expect<Extends<IconName_old, TrimmedIconName>>;
  // IconName should remove some icons from TrimmedIconName
  type Test_IconName2 = Expect<
    NotExtends<Record<IconName_old, true>, Record<keyof typeof iconfont_raw.chars, true>>
  >;
}

/* eslint-enable @typescript-eslint/no-unused-vars */
