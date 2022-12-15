import React from 'react';

/**
 * Props object ready to be ..spread onto an anchor element
 * */
export type LinkProps = JSX.IntrinsicElements['a'] & { href: string };
export type LinkRenderer = (props: LinkProps) => JSX.Element;

const DefaultLinkRenderer: LinkRenderer = (props) => React.createElement('a', props);

export let Link = DefaultLinkRenderer;

const history: Array<LinkRenderer> = [];

/**
 * Allows you to set a callback function to wrapp <a href=""/> links with
 * a custom routing component.
 *
 * Example use:
 *
 * ```js
 * import { Link } from 'remix'; // or whatever :-)
 *
 * setLinkRenderer((linkProps) =>
 *   <Link to={linkProps.href}><a {...linkProps} /></Link>);
 * ```
 *
 * The link renderers are pushed to a simple stack, and if you want to unset
 * a custom renderer, use the `setLinkRenderer.pop()` method to go back to
 * the previous one. Example:
 *
 * ```js
 * const BlockLinks = (props) =>
 *   <span className={props.className}>[Link temporarily out of order]</span>
 *
 * setLinkRenderer(BlockLinks);
 * // ...render some Hanna components...
 * setLinkRenderer.pop(); // reset link rendering
 * ```
 *
 * The Default linkrenderer defined as:
 * ```js
 * 	(linkProps) => React.createElement('a', linkProps);
 * ```
 *
 * ...and you can explicitly switch to using this default by passing `undefined`
 * as an argument — like so:
 *
 * ```js
 * setLinkRenderer(undefined);
 * ```
 */
export const setLinkRenderer = (linkRenderer: LinkRenderer | undefined) => {
  Link = linkRenderer || DefaultLinkRenderer;
  history.unshift(Link);
};

/**
 *
 */
setLinkRenderer.pop = () => {
  history.shift();
  Link = history[0] || DefaultLinkRenderer;
};
