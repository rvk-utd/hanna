import React from 'react';
import ReactDOM from 'react-dom';
import aquireId from '@hugsmidjan/qj/aquireId';
import zapElm from '@hugsmidjan/qj/zapElm';
import {
  VerticalTabsTOC,
  VerticalTabsTOCItem,
  VerticalTabsTOCProps,
} from '@reykjavik/hanna-react/VerticalTabsTOC';

import { autoSeenEffectsRefresh, hasLegacySeenEffectsCSS } from '../_/addSeenEffect.js';
import ensureCSS from '../_/ensureCSS.js';
import { getLang } from '../_/getLang.js';

const setPanelVisibility = (panelElm: HTMLElement, isActive: boolean) => {
  if (isActive) {
    panelElm.hidden = false;
    panelElm.tabIndex = 0;
  } else {
    panelElm.hidden = true;
    panelElm.removeAttribute('tabindex');
  }
};

/* * /
const hasPrecedingTextContent = (elm: HTMLElement): boolean => {
  let node = elm.previousSibling;
  while (node) {
    if (node.textContent!.trim()) {
      return true;
    }
    node = node.previousSibling;
  }
  return false;
};
/* */

type ContentSources = string | HTMLElement | Array<HTMLElement> | NodeListOf<HTMLElement>;

const getContainers = (source: ContentSources): Array<HTMLElement> => {
  const containers =
    typeof source === 'string'
      ? Array.from(document.querySelectorAll<HTMLElement>(source))
      : source instanceof HTMLElement
      ? [source]
      : Array.isArray(source)
      ? source.sort((a, b) => {
          // ensure elements are in source order
          return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        })
      : Array.from(source);

  let lastElm: HTMLElement | undefined;
  return containers.filter((elm, idx) => {
    // Weed out decendant elements.
    // (NOTE: This simple check is sufficient as the containers
    // list is already in source-order.)
    if (lastElm && lastElm.contains(elm)) {
      console.warn(
        'Content containers must not overlap. Ignoring ',
        elm,
        'because it is a decendant of',
        lastElm
      );
      return false;
    }
    lastElm = containers[idx];
    return true;
  });
};

const getHeadingTagLevels = (container: HTMLElement, generateMissing: boolean) => {
  let firstH = container.querySelector<HTMLElement>('h1, h2, h3');
  // // NOTE: Let's just ignore any preceeding content.
  // // This decision was made after dealing with CMS-injected controls at the
  // // start of `.TextBlock` containers, which caused lots of wonky .Tabs being made.
  // if (!firstH || firstH.previousElementSibling || hasPrecedingTextContent(firstH)) {
  if (!firstH) {
    if (generateMissing) {
      firstH = document.createElement('h2');
      firstH.dataset.vttocInserted = '';
      firstH.hidden = true;
      firstH.textContent = 'Untitled';
      container.prepend(firstH);
    } else {
      return [] as const;
    }
  }
  const headings = ['H1', 'H2', 'H3', 'H4'] as const;
  type HeadingTag = (typeof headings)[number];
  const pos = headings.indexOf(firstH.nodeName as HeadingTag) || 1;

  return headings.slice(pos, pos + 2) as [first: HeadingTag, second: HeadingTag];
};

type PanelElement = HTMLElement & {
  $container: HTMLElement;
  $merged?: Array<HTMLElement & { $container: HTMLElement }>;
};

const makePanels = (containers: Array<HTMLElement>) => {
  const panelElms: Array<PanelElement> = [];
  const items: Array<VerticalTabsTOCItem> = [];
  const ids: Array<string> = [];

  containers.forEach((containerElm, i) => {
    const [hTop, hSub] = getHeadingTagLevels(containerElm, i === 0);

    if (!hTop) {
      // handle containers without any headings.
      // Those should have their child nodes merged into the
      // preceding panelElm
      const lastPanel = panelElms[panelElms.length - 1]!;
      const $merged = lastPanel.$merged || (lastPanel.$merged = []);
      const thinPanel = document.createElement('div') as unknown as PanelElement;
      thinPanel.$container = containerElm;
      thinPanel.append(...Array.from(containerElm.childNodes));
      lastPanel.append(thinPanel);
      $merged.push(thinPanel);
      return;
    }

    let tHeading = containerElm.querySelector(hTop as `${Lowercase<typeof hTop>}`); // guaranteed by getHeadingTagLevels to be a hTop element
    while (tHeading) {
      const groupNodes: Array<Node> = [];
      let nextHeading = tHeading.nextSibling;
      while (
        nextHeading &&
        nextHeading.nodeName !== hTop &&
        nextHeading.nodeName !== hSub
      ) {
        groupNodes.push(nextHeading);
        nextHeading = nextHeading.nextSibling;
      }

      const label = tHeading.textContent!;
      const panelElm = document.createElement('div') as unknown as PanelElement;
      panelElm.$container = containerElm;
      panelElm.className = 'TabPanel';
      panelElm.hidden = true;
      panelElm.dataset.sprinkled = 'true';
      panelElm.setAttribute('aria-label', label);
      const hId = tHeading.id;
      if (hId) {
        tHeading.removeAttribute('id');
        tHeading.dataset.domid = hId;
      }
      panelElm.id = hId || aquireId(label);
      ids.push(panelElm.id);
      panelElm.append(...groupNodes);
      const panelHasContent = !!panelElm.textContent!.trim();
      tHeading.before(panelElm);
      panelElm.prepend(tHeading);

      panelElms.push(panelElm);
      if (tHeading.nodeName === hTop) {
        items.push({
          label,
          longLabel: tHeading.getAttribute('aria-label') || undefined,
          items: [],
        });
      }

      // add an item to the sub-items list
      // Do so for every tHeading — except hTop ones with no content.
      // hTop headings with content serve as their own (first) sub-item.
      if (tHeading.nodeName === hSub || panelHasContent) {
        const lastItem = items[items.length - 1]!;
        lastItem.items!.push({
          label,
          href: `#${panelElm.id}`,
          'aria-controls': panelElm.id,
        });
      }

      tHeading = nextHeading as HTMLHeadingElement | null;
    }
  });

  // Remove empty or single-item sub-item lists
  items.forEach((item) => {
    const subItems = item.items || [];
    if (subItems.length < 2) {
      const subItem = subItems[0] || item;
      item.href = subItem.href;
      item['aria-controls'] = subItem['aria-controls'];
      delete item.items;
    }
  });

  return { items, panelElms, ids };
};

// ===========================================================================

type ContentMeta = {
  props: VerticalTabsTOCProps;
  panelElms: Array<HTMLElement>;
  ids: Array<string>;
};

const parseAndPrepareContent = (source: ContentSources): ContentMeta => {
  const containers = getContainers(source);
  const { items, panelElms, ids } = makePanels(containers);
  const setPanelElmsDisplay = (targetId: string) => {
    let activeContainer: HTMLElement;
    panelElms.forEach((panelElm) => {
      const isActive = !!targetId && panelElm.id === targetId;
      if (isActive) {
        activeContainer = panelElm.$container;
      }
      setPanelVisibility(panelElm, isActive);
    });
    containers.forEach((container) => {
      container.hidden = container !== activeContainer;
    });
    if (containers.length === 1) {
      containers[0]!.hidden = false;
    }
  };

  return {
    props: {
      items,
      onItemSelect: setPanelElmsDisplay,
    },
    panelElms,
    ids,
  };
};

// ===========================================================================

type ReadyArgs = {
  rootElm: HTMLDivElement;
  panelElms: Array<HTMLElement>;
  unmount: () => void;
};

type MakeTOCMeta = Promise<ReadyArgs> &
  ReadyArgs & {
    /* Convenience pointer to the promise itself */
    whenReady: Promise<ReadyArgs>;
  };

const makeVerticalTabsTOC = (
  contentSource: ContentSources,
  tocLabel?: string
): MakeTOCMeta => {
  const { props, panelElms, ids } = parseAndPrepareContent(contentSource);
  props['aria-label'] =
    tocLabel ||
    { is: 'Efnisyfirlit', en: 'Table of Contents', pl: 'Spis treści' }[getLang()];

  const rootElm = document.createElement('div');

  let initialId = decodeURIComponent(location.href.split('#')[1] || '');
  if (!initialId || !ids.includes(initialId)) {
    const firstItem = props.items[0]!;
    if (firstItem.items) {
      initialId = firstItem.items[0]!['aria-controls'] || '';
    } else {
      initialId = firstItem['aria-controls'] || '';
    }
  }
  props.onItemSelect(initialId);

  const readyArgs: ReadyArgs = {
    rootElm: rootElm,
    panelElms: panelElms,
    unmount: () => {
      ReactDOM.unmountComponentAtNode(rootElm);
      rootElm.remove();

      (panelElms as Array<PanelElement>)
        .flatMap((panelElm) => {
          const { $merged } = panelElm;
          if ($merged) {
            delete panelElm.$merged;
            return [panelElm, ...$merged];
          }
          return [panelElm];
        })
        .forEach((panelElm) => {
          const insertedHeading = panelElm.querySelector<HTMLElement>(
            '[data-vttoc-inserted]'
          );
          insertedHeading?.remove();
          const disabledIdElm = panelElm.querySelector<HTMLElement>('[data-domid]');
          if (disabledIdElm) {
            disabledIdElm.id = disabledIdElm.dataset.domid!;
            disabledIdElm.removeAttribute('data-domid');
          }
          zapElm(panelElm);
          panelElm.$container.hidden = false;
        });
    },
  };

  const whenReady = ensureCSS('Tabs').then(() => {
    ReactDOM.render(<VerticalTabsTOC {...props} ssr={false} />, rootElm);
    return readyArgs;
  }) as MakeTOCMeta;

  if (hasLegacySeenEffectsCSS) {
    whenReady.then(() => {
      setTimeout(autoSeenEffectsRefresh, 100);
    });
  }

  Object.assign(whenReady, readyArgs, { whenReady });

  return whenReady;
};

export default makeVerticalTabsTOC;
