import { hannaVars } from '../../lib/hannavars';

export default Object.values(hannaVars)
  .map((printer) => `$var${printer.cssName}: ${printer};`)
  .join('\n') + '\n';
