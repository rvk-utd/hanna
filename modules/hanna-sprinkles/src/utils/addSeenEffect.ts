import { getObserver } from '../../../hanna-react/src/utils/seenEffect.js';

export default getObserver;

/**
  Inciates that the `-legacy-AutoSeenEffects` CSS module token is loaded
*/
export const hasLegacySeenEffectsCSS = !!document.querySelector(
  'link[rel="stylesheet"][href*="/bundle/"][href*="-legacy-AutoSeenEffects"]'
);

console.log({ hasLegacySeenEffectsCSS });

export const autoSeenEffectsRefresh = hasLegacySeenEffectsCSS
  ? () => {
      const H = window.Hanna;
      if (H.sprinkles.SeenEffects) {
        H.sprinkles.SeenEffects();
      } else {
        H.loadSprinkles('SeenEffects');
      }
    }
  : () => undefined;

export const autoSeenEffectWrapperProps = hasLegacySeenEffectsCSS
  ? (elm: HTMLElement) => {
      const { isSeen, seenEffect } = elm.dataset;

      return isSeen != null
        ? { 'data-is-seen': '', 'data-seen-effect': 'none' } // make it instantly seen
        : { 'data-seen-effect': seenEffect ?? true };
    }
  : () => undefined;

export const autoSeenEffectPrepare = hasLegacySeenEffectsCSS
  ? (elm: HTMLElement | SVGElement) => {
      const elmData = elm.dataset;
      if (elmData.seenEffect == null && elmData.isSeen == null) {
        elmData.seenEffect = 'true';
      }
    }
  : () => undefined;
