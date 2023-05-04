import qq from '@hugsmidjan/qj/qq';
import { getSVGtext } from '@reykjavik/hanna-utils';

/*
	This util script looks for <img/> elements that (should) point to a
	SVG image. (for example the colorful geometric shape „Formheimur“ graphics).

	For each such <img> element, it fetches its source and inlines its <svg/> tag
	in place of the <img/>.
	This way SVG illustrations can pick up any global CSS
	color-theme variables etc.

	If the SVG was already inlined (e.g. via server-side rendering)
	then the sprinkle does nothing.
*/

export const inlineSVG = (imgSelector: string, elm: Element) => {
  qq<HTMLImageElement>(imgSelector, elm)
    .filter((imgElm) => !imgElm.dataset.sprinkled)
    .forEach((imgElm) => {
      // if the supplied selector does not return an image element
      // we're not going to touch it
      if (imgElm.tagName !== 'IMG') {
        return;
      }
      imgElm.dataset.sprinkled = 'true';
      imgElm.style.visibility = 'hidden'; // hide while fetching
      getSVGtext(imgElm.src).then((svgText) => {
        if (svgText) {
          const parent = imgElm.parentElement;
          if (parent && parent.nodeName === 'PICTURE') {
            // Replace <picture> with <div> because
            // <svg> is not an allowed child element of <picture>.
            const parentClass = parent.className;
            const classAttr = parentClass ? ` class="${parentClass}"` : '';
            parent.outerHTML = `<span${classAttr}>${svgText}</span>`;
          } else {
            imgElm.outerHTML = svgText;
          }
        }
        imgElm.style.visibility = ''; // show again - in case things failed
      });
    });
};
