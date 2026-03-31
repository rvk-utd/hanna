import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Picture } from '@reykjavik/hanna-react/Picture';

import { GhostLabel } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { photo, svgPicture } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {[
        {
          img: photo,
          label: 'Photo',
        },
        {
          img: svgPicture,
          label: 'Inlined SVG',
          extra: { inline: true },
        },
        {
          img: svgPicture,
          label: 'Inlined SVG (ssr)',
          extra: { wrapperProps: { className: 'Picture--inlined' } },
        },
      ].map(({ img, extra, label }, i) => (
        <div key="i" className="democontainer">
          <div className="demobox">
            <GhostLabel black label={`${label}, landscape`} />
            <Picture {...img.landscape} {...extra} />
          </div>
          <div className="demobox">
            <GhostLabel black label={`${label}, portrait`} />
            <Picture {...img.portrait} {...extra} />
          </div>
          <div className="demobox">
            <GhostLabel black label={`${label}, landscape, contain`} />
            <Picture {...img.landscape} {...extra} contain />
          </div>
          <div className="demobox">
            <GhostLabel black label={`${label}, portrait, contain`} />
            <Picture {...img.portrait} {...extra} contain />
          </div>
          {!extra && (
            <>
              <div className="demobox">
                <GhostLabel black label={`${label}, landscape, focalPoint`} />
                <Picture {...img.landscape} focalPoint="80% 88%" />
              </div>
              <div className="demobox">
                <GhostLabel black label={`${label}, portrait, focalPoint`} />
                <Picture {...img.portrait} focalPoint="80% 88%" />
              </div>
              <div className="demobox">
                <GhostLabel black label={`${label}, landscape, focalPoint contain`} />
                <Picture {...img.landscape} focalPoint="80% 88%" contain />
              </div>
            </>
          )}
        </div>
      ))}

      <style>{`
        .democontainer {
          display: flex;
          flex-flow: row wrap;
        }
        .demobox {
          width: 250px;
          height: 250px;
          padding: 1px;
        }
      `}</style>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
