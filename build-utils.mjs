import { writeFileSync } from 'fs';
import { access, mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

export const opts = process.argv.slice(2).reduce(
  /* <Record<string,unknown>> */ (map, arg) => {
    const [key, value] = arg.replace(/^-+/, '').split('=');
    map[key] = value == null ? true : value;
    return map;
  },
  {}
);

// ---------------------------------------------------------------------------

export const exit1 = (err) => {
  console.error(err);

  process.exit(1);
};

// ---------------------------------------------------------------------------

export const makePackageJson = (pkg, outdir, extras) => {
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
export const isNewFile = ({ path }) => {
  if (path in fileMem) {
    return false;
  }
  fileMem[path] = true;
  return true;
};

// ---------------------------------------------------------------------------

export const writeOnlyAffected = (res, err) => {
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
