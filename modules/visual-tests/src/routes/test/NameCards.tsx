import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import NameCards from '@reykjavik/hanna-react/NameCards';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <NameCards
        items={[
          {
            name: 'George Clooney',
            contactInfo: [{ href: 'tel:+3543546372', label: '555-8736' }],
            location: 'Breiðstræti 4, 107',
            hours: 'Vinnutími: 08:00 - 20:00',

            updated: '22.02.2020',
            available: true,
          },
          {
            name: 'Jón Jónsson',
            contactInfo: [{ href: 'tel:+3549219283', label: '490-3223' }],
            location: 'Vegamót 18, \n\n107 Reykjavík',
          },
          {
            name: 'Hanna Hönnudóttir',
            contactInfo: [
              { href: 'tel:+3541119912', label: '550 0081' },
              { href: 'tel:+354792837', label: '770 0192' },
            ],
            location: 'Fjöruborð 6, 101',
            hours: 'Vinnutími: 08:00 - 14:00 \n\n(extra text info)',
            available: false,
          },
          {
            name: 'Jóna Jónsdóttir og James Bond',
            contactInfo: [
              { label: '007@spy.com', href: 'mailto:007@spy.com' },
              { href: 'tel:+3549384753', label: '598-6565' },
              { href: 'tel:+0000007', label: '007-0070' },
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
