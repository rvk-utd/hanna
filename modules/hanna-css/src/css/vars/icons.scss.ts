import iconfonttokens from '../../lib/iconfont';

const iconVariables =
  Object.entries(iconfonttokens)
    .map(
      ([name, unicode]) =>
        `$icons-${name.replace(/^icon__/, '').replace(/_/g, '-')}: '${unicode}';`
    )
    .join('\n') + '\n';

export default iconVariables;
