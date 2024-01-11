import { css, CssString } from 'es-in-css';

import { htmlCl } from '../../lib/classNames.js';

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

// ---------------------------------------------------------------------------

type Opts = { child?: string; trigger?: string | null } | 'bare' | string;
// get SeenEffect options from opts object
const getOpts = (opts?: Opts) => {
  opts = opts === 'bare' ? {} : typeof opts === 'string' ? { child: opts } : opts || {};
  const { child, trigger } = opts;
  return {
    child: child || '',
    trigger: trigger === undefined ? '[data-seen-effect]' : trigger || '',
  };
};

/** Set up styling that should only apply if seen-effects are being applied */
export const SeenEffect__only = (opts?: Opts) => {
  const { child, trigger } = getOpts(opts);
  return (content: CssString | string) => {
    const childSel = pad(child);
    return css`
      ${[
        `&${trigger}[data-is-seen]${childSel}`,
        `${trigger}[data-is-seen] &${childSel}`,
      ].join(',')} {
        ${content}
      }
    `;
  };
};

export const SeenEffect__initial = (opts?: Opts) => {
  const { child, trigger } = getOpts(opts);
  return (content: CssString | string) => {
    const childSel = pad(child);
    return css`
      ${[
        `${htmlCl.beforeSprinkling} &${trigger}${childSel}`,
        `${htmlCl.beforeSprinkling} ${trigger} &${childSel}`,
        `&${trigger}[data-is-seen='false']${childSel}`,
        `${trigger}[data-is-seen='false'] &${childSel}`,
      ].join(',')} {
        ${content}
      }
    `;
  };
};

export const SeenEffect__seen = (opts?: Opts) => {
  const { child, trigger } = getOpts(opts);
  return (content: CssString | string) => {
    const sel = pad(child);
    return css`
      ${[
        `&${trigger}[data-is-seen='true']${sel}`,
        `${trigger}[data-is-seen='true'] &${sel}`,
        // By setting data-is-seen="" a developer can opt-out of the transitioning effect.
        `&${trigger}[data-is-seen='']${sel}`,
        `${trigger}[data-is-seen=''] &${sel}`,
      ].join(',')} {
        ${content}
      }
    `;
  };
};

export const SeenEffect__transition = (opts?: Opts) => {
  const { child, trigger } = getOpts(opts);
  return (content: CssString | string) => {
    const sel = pad(child);
    return css`
      ${[
        `&${trigger}[data-is-seen='true']${sel}`,
        `${trigger}[data-is-seen='true'] &${sel}`,
      ].join(',')} {
        ${content}
      }
    `;
  };
};

// ---------------------------------------------------------------------------

const transitionProperties = 'opacity, transform';

export const SeenEffect__fadein = (opts?: Opts) => css`
  ${SeenEffect__initial(opts)(css`
    opacity: 0;
  `)}
  ${SeenEffect__seen(opts)(css`
    opacity: 1;
  `)}
  ${SeenEffect__transition(opts)(css`
    ${Transition__medium};
    transition-property: ${transitionProperties};
  `)}
`;

export const SeenEffect__fadeup = (opts?: Opts) => css`
  ${SeenEffect__initial(opts)(css`
    opacity: 0;
    transform: translateY(200px);
  `)}
  ${SeenEffect__seen(opts)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__transition(opts)(css`
    ${Transition__medium};
    transition-property: ${transitionProperties};
  `)}
`;

export const SeenEffect__fadeleft = (opts?: Opts) => css`
  ${SeenEffect__initial(opts)(css`
    opacity: 0;
    transform: translateX(-200px);
  `)}
  ${SeenEffect__seen(opts)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__transition(opts)(css`
    ${Transition__medium};
    transition-property: ${transitionProperties};
  `)}
`;

// ---------------------------------------------------------------------------

export const SeenEffect__reset = (opts?: Opts) => css`
  ${SeenEffect__initial(opts)(css`
    opacity: 1;
    transform: none;
  `)}
  ${SeenEffect__seen(opts)(css`
    opacity: initial;
    transform: initial;
  `)}
  ${SeenEffect__transition(opts)(css`
    transition: none;
  `)}
`;

/**
 * Resets the default data-seen-effect="" styling of a target element
 * (or the current `&` selector) to override the default "fadeup" effect.
 *
 * This allows you to set an empty data-seen-effect="" attribute
 * (or use an unmodified "<SeenEffect />" component wrapper) to trigger
 * completely custom seen-effect styling on child nodes only.
 *
 * Otherwise a `data-seen-effect="custom"` attribute
 * (or `<SeenEffect effectType="custom" />`) would be required.
 */
export const SeenEffect__resetDefault = (
  opts?: string | { target?: string; child?: string }
) => {
  opts = typeof opts === 'string' ? { target: opts } : opts || {};
  const resetStyles = SeenEffect__reset({
    child: opts.child,
    trigger: '[data-seen-effect=""]',
  });
  if (opts.target) {
    return `${opts.target} { ${resetStyles} }`;
  }
  return resetStyles;
};

/** @deprecated  Remove this mixin in v0.9 */
export const SeenEffect__disallowNesting = () => css`
  ${htmlCl.beforeSprinkling} [data-is-seen] &,
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
