import { css, MsValue, RawCssString } from 'es-in-css';

const pad = (selector: string) => {
  return selector.startsWith(':') ? selector : ` ${selector}`;
};

// ---------------------------------------------------------------------------

// FIXME: Refactor these into a CSS variable
export const Transition__short = () => css`
  transition: all 200ms ease-in-out;
`;

export const Transition__medium = () => css`
  transition: all 400ms ease-in-out;
`;

export const Transition__long = () => css`
  transition: all 500ms ease-in-out;
`;

export const Transition__properties = (properties = 'opacity, transform') => css`
  transition-property: ${properties};
`;

// ---------------------------------------------------------------------------

export const SeenEffect__initial =
  (childSelector = '') =>
  (content: RawCssString) => {
    const sel = pad(childSelector);
    return css`
      .before-sprinkling &${sel}, &[data-is-seen='false']${sel} {
        ${content}
      }
    `;
  };

export const SeenEffect__seen =
  (childSelector = '') =>
  (content: RawCssString) => {
    // By setting data-is-seen="" a developer can opt-out of the transitioning effect.
    const sel = pad(childSelector);
    return css`
      &[data-is-seen='']${sel}, &[data-is-seen='true']${sel} {
        ${content}
      }
    `;
  };

export const SeenEffect__transition =
  (childSelector = '') =>
  (content: RawCssString) => {
    const sel = pad(childSelector);
    return css`
      &[data-is-seen='true']${sel} {
        ${content}
      }
    `;
  };

// ---------------------------------------------------------------------------

export const SeenEffect__fadein = (childSelector?: string) => css`
  ${SeenEffect__initial(childSelector)(css`
    opacity: 0;
  `)}
  ${SeenEffect__seen(childSelector)(css`
    opacity: 1;
  `)}
  ${SeenEffect__transition(childSelector)(css`
    ${Transition__long}
    ${Transition__properties}
  `)}
`;

export const SeenEffect__fadeup = (childSelector?: string) => css`
  ${SeenEffect__initial(childSelector)(css`
    opacity: 0;
    transform: translateY(200px);
  `)}
  ${SeenEffect__seen(childSelector)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__transition(childSelector)(css`
    ${Transition__long}
    ${Transition__properties}
  `)}
`;

export const SeenEffect__fadeleft = (childSelector?: string) => css`
  ${SeenEffect__initial(childSelector)(css`
    opacity: 0;
    transform: translateX(-200px);
  `)}
  ${SeenEffect__seen(childSelector)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__transition(childSelector)(css`
    ${Transition__long}
    ${Transition__properties}
  `)}
`;

// ---------------------------------------------------------------------------

export const SeenEffect__reset = (childSelector?: string) => css`
  ${SeenEffect__initial(childSelector)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__seen(childSelector)(css`
    opacity: initial;
    transform: initial;
  `)}
  ${SeenEffect__transition(childSelector)(css`
    transition: none;
  `)}
`;

export const SeenEffect__delay = (delay: MsValue) => css`
  transition-delay: ${delay};
`;

/** @deprecated  Remove this mixin in v0.9 */
export const SeenEffect__disallowNesting = () => css`
  .before-sprinkling [data-is-seen] &,
  [data-is-seen] &[data-is-seen='false'] {
    opacity: 1;
    transform: none;
  }

  [data-is-seen] & {
    ${SeenEffect__seen()(css`
      opacity: initial;
      transform: initial;
    `)}
    ${SeenEffect__transition()(css`
      transition: none;
    `)}
  }
`;
