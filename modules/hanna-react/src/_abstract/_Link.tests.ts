import { createElement as h } from 'react';
import o from 'ospec';

import { Link, setLinkRenderer } from './_Link';

const Default_Link = Link; // Store initial default link for later comparison

const Lnk1: typeof Link = () => h('a');
const Lnk2: typeof Link = () => h('a');
const Lnk3: typeof Link = () => h('a');

o.spec('setLinkRenderer', () => {
  o('push', () => {
    o(Link).equals(Default_Link)('Default_Link');
    o(setLinkRenderer(Lnk1)).equals(undefined)('push returns undefined');
    o(Link).equals(Lnk1)('Lnk1');
    setLinkRenderer(Lnk2);
    o(Link).equals(Lnk2)('Lnk2');
    setLinkRenderer(Lnk3);
    o(Link).equals(Lnk3)('Lnk3');
  });
  o('pop', () => {
    o(Link).equals(Lnk3)('Link3 state is retained between tests');
    o(setLinkRenderer.pop()).equals(undefined)('pop returns undefined');
    o(Link).equals(Lnk2)('Link2');
    setLinkRenderer.pop();
    o(Link).equals(Lnk1)('Link1');
    setLinkRenderer.pop();
    o(Link).equals(Default_Link)('Default_Link');
    setLinkRenderer.pop();
    o(Link).equals(Default_Link)('overpopping is harmless');
    setLinkRenderer(Lnk2);
    o(Link).equals(Lnk2)('overpopping has no effect on next push');
  });
  o('repeat pushes', () => {
    setLinkRenderer(Lnk3);
    setLinkRenderer(Lnk3);
    setLinkRenderer(Lnk3);
    setLinkRenderer.pop();
    o(Link).equals(Lnk3)('1st pop');
    setLinkRenderer.pop();
    o(Link).equals(Lnk3)('2st pop');
    setLinkRenderer.pop();
    o(Link).equals(Lnk2)('3st pop (back to start)');
  });
  o('seting default pushes to the stack', () => {
    setLinkRenderer(undefined);
    setLinkRenderer(undefined);
    o(Link).equals(Default_Link)('Default_Link');
    setLinkRenderer.pop();
    o(Link).equals(Default_Link)('2nd pop');
    setLinkRenderer.pop();
    o(Link).equals(Lnk2)('3rd pop (back to start)');
  });
});
