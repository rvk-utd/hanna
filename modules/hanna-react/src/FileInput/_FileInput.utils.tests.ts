import o from 'ospec';

import { formatBytes, getFileListUpdate } from './_FileInput.utils.js';

o.spec('getFileListUpdate', () => {
  class MockFile {
    constructor(_: unknown, name: string) {
      this.name = name;
    }
    name: string;
  }
  const file = (name: string) => new MockFile([], name) as File;

  const myCV = file('cv.pdf');
  const myCV2 = file('cv.pdf');
  const myPhoto = file('photo.jpg');
  const myPhoto2 = file('photo.jpg');
  const myCoverLetter = file('coverletter.pdf');

  o('replace mode', () => {
    o(getFileListUpdate([myCV], [myPhoto], true)).deepEquals({
      fileList: [myPhoto],
      diff: { added: [myPhoto], deleted: [myCV] },
    })('adding a file deletes the old file');

    o(getFileListUpdate([myCV], [myCV2], true)).deepEquals({
      fileList: [myCV2],
      diff: { added: [myCV2], deleted: [myCV] },
    })('New file trumps the old one in case of identically named files');

    o(getFileListUpdate([myCV], [myCV], true)).deepEquals({
      fileList: [myCV],
      diff: { added: [myCV], deleted: [myCV] },
    })(
      'Behaves the same even in the new and old files are literally/referentially the same'
    );

    // edge case:
    o(getFileListUpdate([myPhoto, myCoverLetter], [myCV, myPhoto2], true)).deepEquals({
      fileList: [myCV, myPhoto2],
      diff: { added: [myCV, myPhoto2], deleted: [myPhoto, myCoverLetter] },
    })('Does not validate length of the added array in replace Mode');

    // edge case:
    o(getFileListUpdate([myCV], [], true)).deepEquals({
      fileList: [],
      diff: { added: [], deleted: [myCV] },
    })('Adding an empty array is tolerated and implicitly empties the file list');
  });

  // ---------------------------------------------------------------------------

  o('merge files mode', () => {
    o(getFileListUpdate([myCV], [myPhoto, myCoverLetter], false)).deepEquals({
      fileList: [myCV, myPhoto, myCoverLetter],
      diff: { added: [myPhoto, myCoverLetter] },
    })('adding a file appends it to the file list');

    o(getFileListUpdate([myCV, myPhoto], [myPhoto2, myCoverLetter], false)).deepEquals({
      fileList: [myCV, myPhoto2, myCoverLetter],
      diff: { added: [myPhoto2, myCoverLetter], deleted: [myPhoto] },
    })('New file trumps the old one in case of identically named files');

    o(getFileListUpdate([myCV, myPhoto], [myCV2], false)).deepEquals({
      fileList: [myPhoto, myCV2],
      diff: { added: [myCV2], deleted: [myCV] },
    })(
      'New files are always appended to the file list, even when replacing existing files'
    );

    o(getFileListUpdate([myCV, myPhoto], [myCV], false)).deepEquals({
      fileList: [myPhoto, myCV],
      diff: { added: [myCV], deleted: [myCV] },
    })(
      'Behaves the same even in the new and old files are literally/referentially the same'
    );

    // edge case:
    o(getFileListUpdate([myCV], [], false)).deepEquals({
      fileList: [myCV],
      diff: { added: [] },
    })('Adding an empty array is tolerated and does nothing');
  });
});

// ---------------------------------------------------------------------------

o.spec('formatBytes', () => {
  o('works', () => {
    o(formatBytes(0)).equals('0 Bytes');
    o(formatBytes(1.5)).equals('1,5 Bytes'); // silly but still
    o(formatBytes(500)).equals('500 Bytes');
    o(formatBytes(965)).equals('965 Bytes');
    o(formatBytes(980)).equals('0,96 KB'); // snaps up a unit-level just below 1_000 units
    o(formatBytes(1024)).equals('1 KB');
    o(formatBytes(1024)).equals('1 KB');
    o(formatBytes(1530)).equals('1,49 KB');
    o(formatBytes(1536)).equals('1,5 KB');
    o(formatBytes(1024 * 1024)).equals('1 MB');
    o(formatBytes(980 * 1024)).equals('0,96 MB');
    o(formatBytes(3.5 * 1024 * 1024 * 1024)).equals('3,5 GB');
    o(formatBytes(54.4 * 1024 * 1024 * 1024 * 1024)).equals('54,4 TB');
    o(formatBytes(2097152.45 * 1024 * 1024 * 1024 * 1024 * 1024)).equals('2097152,45 PB')(
      'Petabyte is the largest supported unit'
    );
  });
  o('custom decimsals', () => {
    o(formatBytes(1530, undefined, 0)).equals('1 KB')('0 decimals');
    o(formatBytes(1530, undefined, 1)).equals('1,5 KB')('1 decimal');
    o(formatBytes(1530, undefined, 2)).equals('1,49 KB')('2 decimal'); // this is the default
    o(formatBytes(1530, undefined, 3)).equals('1,494 KB')('3 decimals'); // ack! weird
    o(formatBytes(1530, undefined, 4)).equals('1,4941 KB')('4 decimals'); // this is just silly
    o(formatBytes(1538, undefined, 0)).equals('2 KB')('Rounds up to the nearest KB');
  });
  o('locale aware', () => {
    o(formatBytes(999, 'is')).equals('0,98 KB');
    o(formatBytes(999, 'en')).equals('0.98 KB');
    o(formatBytes(999, 'pl')).equals('0,98 KB');
    o(formatBytes(999, 'jp')).equals('0.98 KB');
  });
  o('displays negative file sizes 🤷', () => {
    o(formatBytes(-0)).equals('0 Bytes');
    o(formatBytes(-11)).equals('-11 Bytes');
    o(formatBytes(-1.5 * 1024, undefined, 0)).equals('-2 KB')(
      'Rounds negative numbers away from zero'
    );
    o(formatBytes(-999, 'en')).equals('-0.98 KB');
  });
});
