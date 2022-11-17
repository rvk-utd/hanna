import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Picture from '@reykjavik/hanna-react/Picture';

import { GhostLabel } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

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
        <Picture {...photo.landscape} focalPoint={'80% 88%'} />
      </div>
      <div className="demobox">
        <GhostLabel black label="portrait, focalPoint" />
        <Picture {...photo.portrait} focalPoint={'80% 88%'} />
      </div>
      <div className="demobox">
        <GhostLabel black label="landscape, focalPoint contain" />
        <Picture {...photo.landscape} focalPoint={'80% 88%'} contain />
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
