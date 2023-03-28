import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { TagPill } from '@reykjavik/hanna-react/TagPill';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const handler = () => alert('closing');

// ---------------------------------------------------------------------------

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <div>
        <TagPill id="simple-static">Static</TagPill>
        <TagPill id="simple-button" onClick={handler}>
          Button
        </TagPill>
        <TagPill id="simple-link" href="">
          Link
        </TagPill>
      </div>
      <div>
        <TagPill large>Static Large</TagPill>{' '}
        <TagPill large onClick={handler}>
          Button Large
        </TagPill>
        <TagPill large href="">
          Link Large
        </TagPill>
      </div>
      <div>
        <TagPill id="removable-static" removable onRemove={handler}>
          Static Removable
        </TagPill>{' '}
        <TagPill id="removable-button" onClick={handler} removable>
          Button Removable
        </TagPill>{' '}
        <TagPill id="removable-link" href="" removable>
          Link Removable
        </TagPill>{' '}
      </div>
      <div>
        <TagPill large removable onRemove={handler}>
          Static Removable Large
        </TagPill>
        <TagPill large onClick={handler} removable>
          Button Removable Large
        </TagPill>{' '}
        <TagPill large href="" removable>
          Link Removable Large
        </TagPill>{' '}
      </div>
      <div>
        <TagPill id="dual-area-button" onClick={handler} removable onRemove={handler}>
          Button AND Removable
        </TagPill>{' '}
        <TagPill id="dual-area-link" href="" removable onRemove={handler}>
          Link AND Removable
        </TagPill>{' '}
        <TagPill large onClick={handler} removable onRemove={handler}>
          Button AND Removable Large
        </TagPill>{' '}
        <TagPill large href="" removable onRemove={handler}>
          Link AND Removable Large
        </TagPill>{' '}
      </div>
      <div>
        <TagPill
          id="colored-green"
          color="green"
          onClick={handler}
          removable
          onRemove={handler}
        >
          Green Button Removable
        </TagPill>{' '}
        <TagPill
          id="colored-yellow"
          color="yellow"
          onClick={handler}
          removable
          onRemove={handler}
        >
          Yellow Button Removable
        </TagPill>{' '}
        <TagPill
          id="colored-orange"
          color="orange"
          onClick={handler}
          removable
          onRemove={handler}
        >
          Orange Button Removable
        </TagPill>{' '}
        <TagPill
          id="colored-red"
          color="red"
          onClick={handler}
          removable
          onRemove={handler}
        >
          Red Button Removable
        </TagPill>{' '}
      </div>
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    for (const id of [
      'simple-static',
      'simple-button',
      'simple-link',
      'removable-static',
      'removable-button',
      'removable-link',
      'dual-area-button',
      'dual-area-link',
      'colored-green',
      'colored-yellow',
      'colored-orange',
      'colored-red',
    ]) {
      const tagPill = page.locator('#' + id);
      const tagPillElm = (await tagPill.elementHandle())!;
      const removeBtn = await tagPillElm.$('.TagPill__remove');
      await tagPillElm.hover();
      await localScreenshot(tagPill, id + '-hover');
      if (removeBtn) {
        await removeBtn.hover();
        await localScreenshot(tagPill, id + '-remove-hover');
      }
    }
  },
};
