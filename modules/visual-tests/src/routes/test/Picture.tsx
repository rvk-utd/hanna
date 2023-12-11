import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Picture } from '@reykjavik/hanna-react/Picture';

import { GhostLabel } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <div className="demobox">
        <GhostLabel black label="landscape" />
        <Picture {...photo.landscape} />
      </div>
      <div className="demobox">
        <GhostLabel black label="portrait" />
        <Picture {...photo.portrait} />
      </div>
      <div className="demobox">
        <GhostLabel black label="landscape, contain" />
        <Picture {...photo.landscape} contain />
      </div>
      <div className="demobox">
        <GhostLabel black label="portrait, contain" />
        <Picture {...photo.portrait} contain />
      </div>
      <div className="demobox">
        <GhostLabel black label="landscape, focalPoint" />
        <Picture {...photo.landscape} focalPoint="80% 88%" />
      </div>
      <div className="demobox">
        <GhostLabel black label="portrait, focalPoint" />
        <Picture {...photo.portrait} focalPoint="80% 88%" />
      </div>
      <div className="demobox">
        <GhostLabel black label="landscape, focalPoint contain" />
        <Picture {...photo.landscape} focalPoint="80% 88%" contain />
      </div>

      <style>{`
        .demobox {
          float: left;
          width: 250px;
          height: 250px;
          padding: 1px;
        }
      `}</style>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
