import iconfonttokens from '../../lib/iconfonttokens';

export default Object.entries(iconfonttokens)
  .map(
    ([name, unicode]) =>
      `$icons-${name.replace(/^icon__/, '').replace(/_/g, '-')}: '${unicode}';`
  )
  .join('\n') + '\n';
