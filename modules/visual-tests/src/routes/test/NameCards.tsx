import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { NameCards } from '@reykjavik/hanna-react/NameCards';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <NameCards
        items={[
          {
            name: 'George Clooney',
            contactInfo: [{ href: 'tel:+3545674321', label: '567-4321' }],
            location: 'Breiðstræti 4, 107',
            hours: 'Vinnutími: 08:00 - 20:00',

            updated: '22.02.2020',
            available: true,
          },
          {
            name: 'Jón Jónsson',
            contactInfo: [{ href: 'tel:+3549876543', label: '987-6543' }],
            location: 'Vegamót 18, \n\n107 Reykjavík',
          },
          {
            name: 'Hanna Hönnudóttir',
            contactInfo: [
              { href: 'tel:+3545674321', label: '567 4321' },
              { href: 'tel:+3549876543', label: '987 6543' },
            ],
            location: 'Fjöruborð 6, 101',
            hours: 'Vinnutími: 08:00 - 14:00 \n\n(extra text info)',
            available: false,
          },
          {
            name: 'Jóna Jónsdóttir og James Bond',
            contactInfo: [
              { label: '007@spy.com', href: 'mailto:007@spy.com' },
              { href: 'tel:+3548765432', label: '876-5432' },
              { href: 'tel:+4407007007007', label: '+44 0700 700-7007' },
            ],
            location: 'Skeljagrandi 7,\n 107 Reykjavík',
            hours: 'Vinnutími: 08:00 - 14:00',
            aboutText: lorem.tiny,
            updated: '22.02.2020',
          },
        ]}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.NameCard__contactinfo__item[href="mailto:007@spy.com"]',
};
