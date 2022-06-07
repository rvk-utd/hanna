import getScrollbarWidth from '@hugsmidjan/qj/getScrollbarWidth';
import { useOnMount } from '@hugsmidjan/react/hooks';

export const useScrollbarWidthCSSVar = () =>
  useOnMount(() => getScrollbarWidth.setCSSvar());
