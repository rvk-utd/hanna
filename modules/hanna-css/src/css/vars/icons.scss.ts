import iconfont from '../../lib/iconfont';

const iconVariables =
  Object.entries(iconfont)
    .map(([name, unicode]) => `$icons-${name.replace(/_/g, '-')}: '${unicode}';`)
    .join('\n') + '\n';

export default iconVariables;
