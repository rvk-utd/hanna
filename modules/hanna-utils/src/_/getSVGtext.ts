import load from '@hugsmidjan/qj/load';

const isSvgUrl = (url: string) => /\.svg(?:$|\?|#)/i.test(url);

/**
 * Fetches a remote SVG file and returns its markup contents — exlcuding any
 * leading `
 */
export const getSVGtext = (url: string | undefined): Promise<string> => {
  return url && isSvgUrl(url)
    ? load(url)
        .then((res) => {
          const svgStart = res.search(/<svg/i);
          return svgStart > -1 ? res.slice(svgStart) : '';
        })
        .catch((error) => {
          console.error(error);
          return '';
        })
    : Promise.resolve('');
};

getSVGtext.isSvgUrl = isSvgUrl;
