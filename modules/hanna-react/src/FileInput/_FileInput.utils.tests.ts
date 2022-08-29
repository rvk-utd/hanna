import o from 'ospec';

import { getFileListUpdate } from './_FileInput.utils';

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
