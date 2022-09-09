import type { MetaFunction } from '@remix-run/node';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
import NameCards from '@reykjavik/hanna-react/NameCards';

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
            name: 'Anna Barbara Idzik',
            contactInfo: [{ href: 'tel:+3546903653', label: '690-3653' }],
            location: 'Skeljagrandi 7, 107',
            hours: 'Vinnutími: 08:00 - 14:00',

            updated: '22.02.2020',
            available: true,
          },
          {
            name: 'Jerzy Edward Brys',
            contactInfo: [{ href: 'tel:+3546903653', label: '690-3653' }],
            location: 'Skeljagrandi 7, \n\n107 Reykjavík',
          },
          {
            name: 'Anna Barbara Idzik',
            contactInfo: [
              { href: 'tel:+3546903653', label: '690 3653' },
              { href: 'tel:+3547700227', label: '770 0227' },
            ],
            location: 'Skeljagrandi 7, 107',
            hours:
              'Vinnutími: 08:00 - 14:00 \n\n(except on the first Wednesday of the month)',
            available: false,
          },
          {
            name: 'Álfhildur S. Jóhannsdóttir og Jón Jónsson',
            contactInfo: [
              { label: 'aogj@gmail.com', href: 'mailto:aogj@gmail.com' },
              { href: 'tel:+3546903653', label: '690-3653' },
              { href: 'tel:+3546903654', label: '690-3654' },
            ],
            location: 'Skeljagrandi 7,\n 107 Reykjavík',
            hours: 'Vinnutími: 08:00 - 14:00',
            aboutText: 'Eina 100% vegan daggæslan á stór-Skerjafjarðarsvæðinu.',
            updated: '22.02.2020',
          },
        ]}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page
      .locator('.NameCard__contactinfo__item[href="mailto:aogj@gmail.com"]')
      .hover();
  },
};
