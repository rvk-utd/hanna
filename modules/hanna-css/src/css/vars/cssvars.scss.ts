import { hannaVars } from '../../lib/hannavars';

const scssCssVariables =
  Object.values(hannaVars)
    .map((printer) => `$var${printer.cssName}: ${printer};`)
    .join('\n') + '\n';

export default scssCssVariables;
