import { ensurePosInt } from '@reykjavik/hanna-utils/_/ensure';
import { css, ms, MsValue, RawCssString } from 'es-in-css';

const pad = (selector: string) => {
  return selector.indexOf(':') === 1 ? selector : ` ${selector}`;
};

const Transition__long = () => css`
  transition: all 500ms ease-in-out;
`;

const Transition__properties = (properties = 'opacity, transform') => css`
  transition-property: ${properties};
`;

const SeenEffect__initial = (childSelector = '', content: RawCssString) => {
  const sel = pad(childSelector);
  return css`
    .before-sprinkling &${sel}, &[data-is-seen='false']${sel} {
      ${content}
    }
  `;
};

const SeenEffect__seen = (childSelector = '', content: RawCssString) => {
  // By setting data-is-seen="" a developer can opt-out of the transitioning effect.
  const sel = pad(childSelector);
  return css`
    &[data-is-seen='']${sel}, &[data-is-seen='true']${sel} {
      ${content}
    }
  `;
};

const SeenEffect__transition = (childSelector = '', content: RawCssString) => {
  const sel = pad(childSelector);
  return css`
    &[data-is-seen='true']${sel} {
      ${content}
    }
  `;
};

export const SeenEffect__fadein = (childSelector = '') =>
  SeenEffect__initial(
    childSelector,
    css`
      opacity: 0;
      transform: translateY(200px);
    `
  );

export const SeenEffect__fadeup = (childSelector = '') => {
  return css`
    ${SeenEffect__initial(
      childSelector,
      css`
        opacity: 0;
        transform: translateY(200px);
      `
    )}
    ${SeenEffect__seen(
      childSelector,
      css`
        opacity: 1;
        transform: none;
      `
    )}
    ${SeenEffect__transition(
      childSelector,
      css`
        ${Transition__long()}
        ${Transition__properties()}
      `
    )}
  `;
};

export const SeenEffect__fadeleft = (childSelector = '') => {
  return css`
    ${SeenEffect__initial(
      childSelector,
      css`
        opacity: 0;
        transform: translateX(-200px);
      `
    )}
    ${SeenEffect__seen(
      childSelector,
      css`
        opacity: 1;
        transform: none;
      `
    )}
    ${SeenEffect__transition(
      childSelector,
      css`
        ${Transition__long()}
        ${Transition__properties()}
      `
    )}
  `;
};

export const SeenEffect__delay = (delay: MsValue | number) => {
  if (ensurePosInt(delay) === undefined) {
    throw new Error('delay must be PositiveInteger');
  }
  return css`
    transition-delay: ${ms(delay)};
  `;
};
