import React from 'react';

/**
 * Props object ready to be ..spread onto an anchor element
 * */
export type LinkProps = JSX.IntrinsicElements['a'] & { href: string };
export type LinkRenderer = (props: LinkProps) => JSX.Element;

const DefaultLinkRenderer: LinkRenderer = (props) => React.createElement('a', props);

export let Link = DefaultLinkRenderer;

/**
 * Allows you to set a callback function to wrapp <a href=""/> links with
 * a custom routing component.
 *
 * Example use:
 *
 * ```js
 *   import { Link } from 'remix'; // or whatever :-)
 *
 *   setLinkRenderer((linkProps) =>
 *     <Link to={linkProps.href}><a {...linkProps} /></Link>);
 * ```
 *
 * The Default linkrenderer defined as:
 * ```js
 * 	(linkProps) => React.createElement('a', linkProps);
 * ```
 */
export const setLinkRenderer = (linkRenderer: LinkRenderer | undefined) => {
  Link = linkRenderer || DefaultLinkRenderer;
};
