const { writeFileSync } = require('fs');
const { access, mkdir, writeFile } = require('fs/promises');
const { dirname } = require('path');

exports.opts = process.argv.slice(2).reduce(
  /* <Record<string,unknown>> */ (map, arg) => {
    const [key, value] = arg.replace(/^-+/, '').split('=');
    map[key] = value == null ? true : value;
    return map;
  },
  {}
);

// ---------------------------------------------------------------------------

exports.exit1 = (err) => {
  console.error(err);

  process.exit(1);
};

// ---------------------------------------------------------------------------

exports.makePackageJson = (pkg, outdir, extras) => {
  const pkgOverloads = pkg.npm_lib_package_json;
  const newPkg = { ...pkg };
  delete newPkg.npm_lib_package_json;

  delete newPkg.scripts;
  delete newPkg.hxmstyle;
  delete newPkg.private;
  delete newPkg.devDependencies;
  Object.assign(newPkg, pkgOverloads, extras);

  writeFileSync(outdir + 'package.json', JSON.stringify(newPkg, null, '\t'));
};

// ---------------------------------------------------------------------------

const fileMem = {};
const isNewFile = (exports.isNewFile = ({ path }) => {
  if (path in fileMem) {
    return false;
  }
  fileMem[path] = true;
  return true;
});

// ---------------------------------------------------------------------------

exports.writeOnlyAffected = (res, err) => {
  if (err) {
    return;
  }
  return res.outputFiles.filter(isNewFile).forEach((res) => {
    const targetDir = dirname(res.path);
    return access(targetDir)
      .catch(() => mkdir(targetDir, { recursive: true }))
      .then(() => writeFile(res.path, res.text));
  });
};
