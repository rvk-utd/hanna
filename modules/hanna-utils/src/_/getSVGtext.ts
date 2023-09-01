import load from '@hugsmidjan/qj/load';

const isSvgUrl = (url: string) => /\.svg(?:$|\?|#)/i.test(url);

/**
 * Fetches a remote SVG file and returns its markup contents — exlcuding any
 * leading `<?xml />` directives or "Generator" comments.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#getsvgtext
 */
export const getSVGtext = (
  url: string | undefined,
  altText?: string
): Promise<string> => {
  return url && isSvgUrl(url)
    ? load(url)
        .then((res) => {
          const svgStart = res.search(/<svg/i);
          if (svgStart === -1) {
            return '';
          }
          if (svgStart > 0) {
            // remove possible <?xml ?> and Generator comments
            res = res.slice(svgStart);
          }
          if (altText) {
            res = res
              // replace opening <svg>, spanning multiple lines with the word "<svg>"
              .replace(/<title[^]*?>[^]*?<\/title>/i, '')
              // Insert the altText as a <title> element after the first occurance of `>`
              // (which is the closing `>` of the opening <svg> tag)
              .replace(/>/, `><title>${altText}</title>`);
          }
          return res;
        })
        .catch((error) => {
          console.error(error);
          return '';
        })
    : Promise.resolve('');
};

getSVGtext.isSvgUrl = isSvgUrl;
