const o = require('ospec');
const { existsSync, rmdirSync } = require('fs');
const glob = require('glob').sync;
const { cssVersion, publishCssFolder, devDistCssFolder } = require('./config.js');

// ---------------------------------------------------------------------------

o.spec('Publishing', () => {
  o('package has a valid CSS version', () => {
    o(cssVersion != null).equals(true);
    o(/^\d+\.\d+/.test(cssVersion)).equals(true); // Technically redundant, but hey!
  });

  o('no CSS folder exists for the current CSS version', () => {
    let cssFolderDoesntExist = !existsSync(publishCssFolder);
    if (!cssFolderDoesntExist && glob(publishCssFolder + '/*').length === 0) {
      try {
        rmdirSync(publishCssFolder);
        cssFolderDoesntExist = true;
      } catch (e) {
        console.error(e);
      }
    }
    o(cssFolderDoesntExist).equals(true);
  });

  o('Built CSS files exist in dev folder', () => {
    const devFilesExist =
      existsSync(devDistCssFolder) && glob(devDistCssFolder + '/*.css').length > 0;
    o(devFilesExist).equals(true);
  });

  // // FIXME: Add parseModules check - via cssserve
  //
  // const validateCssDepsInFolder = require('cssserve/validateCssDeps');
  //
  // o('CSS files in dev folder have valid /*!@deps */ tokens', () => {
  // 	o(validateCssDepsInFolder(devDistCssFolder)).deepEquals({ valid: true });
  // });
});
