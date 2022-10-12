import { Expect, Extends, NotExtends } from 'hanna-test-helpers';
import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import { iconfont_raw, IconName, icons } from './icons';

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
    };

    reportKeyMismatch(icons, expectedIcons);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
{
  type TrimmedIconName = keyof typeof iconfont_raw.chars;

  type Test_IconName = Expect<Extends<IconName, TrimmedIconName>>;
  type Bar = Extends<TrimmedIconName, IconName>;
  // IconName should remove some icons from TrimmedIconName
  type Test_IconName2 = Expect<
    NotExtends<Record<IconName, true>, Record<TrimmedIconName, true>>
  >;
}

/* eslint-enable @typescript-eslint/no-unused-vars */
