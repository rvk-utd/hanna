import React from 'react';

type HTMLAnchorProps = JSX.IntrinsicElements['a'];

type LinkProps = HTMLAnchorProps & { href: string };
type _LinkRenderer_internal = (props: LinkProps) => JSX.Element;

const DefaultLinkRenderer: _LinkRenderer_internal = (props) =>
  React.createElement('a', props);
export let Link = DefaultLinkRenderer;

/**
 * Props object ready to be ..spread onto an anchor element
 * */
export type LinkRendererProps = Omit<LinkProps, 'ref'> & {
  ref: Exclude<HTMLAnchorProps['ref'], string>;
};

export type LinkRenderer = (props: LinkRendererProps) => JSX.Element;

const history: Array<_LinkRenderer_internal> = [];

/**
 * Allows you to set a callback function to wrapp <a href=""/> links with
 * a custom routing component.
 *
 * Example use:
 *
 * ```js
 * import { Link } from '@remix-run/react'; // or whatever :-)
 *
 * setLinkRenderer((linkProps) => <Link to={props.href} {...linkProps} />);
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
 * The default linkrenderer is defined as:
 *
 * ```js
 * 	(linkProps) => React.createElement('a', linkProps);
 * ```
 *
 * ...and you can explicitly switch to using this default by passing `undefined`
 * as an argument — like so:
 *
 * ```js
 * setLinkRenderer(undefined); // pushes the default linkrenderer to the stack
 * ```
 */
export const setLinkRenderer = (linkRenderer: LinkRenderer | undefined) => {
  // Here we tell a "white" lie. Nobody uses string-type `ref` attributes
  // anymore. With this lie we're able to provide nice type signature for modern
  // use-cases (e.g. Next.js and Remix.run <Link> elements) while still
  // providing easy to use (easy to Type `JSX.IntrinsicElements['a']` signatures)
  // internally within the hanna-react codebase.
  //
  // This decision may need to be reversed if scream-test results are negative.
  //
  // TODO: Add a project-global `HTMLAnchorProps` with modern `ref` and use it
  // everywhere, and then remove this hack.
  Link = (linkRenderer as _LinkRenderer_internal) || DefaultLinkRenderer;
  history.unshift(Link);
};

/**
 * Unsets the last pushed custom renderer
 */
setLinkRenderer.pop = () => {
  history.shift();
  Link = history[0] || DefaultLinkRenderer;
};
