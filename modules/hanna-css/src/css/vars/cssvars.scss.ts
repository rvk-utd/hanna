import { cssVars } from '../../lib/cssvars';

const scssCssVariables =
  Object.values(cssVars)
    .map((printer) => `$var${printer.cssName}: ${printer};`)
    .join('\n') + '\n';

export default scssCssVariables;
