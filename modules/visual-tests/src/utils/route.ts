import { HeadersFunction } from '@remix-run/node';
import { CssModuleToken } from '@reykjavik/hanna-css';

export const copyCacheControl: HeadersFunction = ({ loaderHeaders }) => ({
  'Cache-Control': loaderHeaders.get('Cache-Control') || '',
});

export const cssTokens = (...cssTokens: Array<CssModuleToken>) => ({ cssTokens });
