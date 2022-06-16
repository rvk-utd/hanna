import React, { CSSProperties } from 'react';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';

import { Link } from '../_abstract/_Link';
import type { MegaMenuPanel } from '../MainMenu';

// ---------------------------------------------------------------------------

export type AuxilaryPanelIllustration =
  | 'hanna-veitiggi'
  | 'hanna-vandro'
  | 'hanna-hugsi'
  | 'hanna-hissa'
  | 'hanna-hahaha'
  | 'hanna-hae'
  | 'hanna-god_spurning'
  | 'hanna-gjuggiborg'
  | 'hanna-benda';

export type AuxiliaryPanelProps = MegaMenuPanel & {
  image?: AuxilaryPanelIllustration;
};

export const AuxiliaryPanel = (props: AuxiliaryPanelProps) => {
  const { title, id, items, image } = props;
  const imageUrl = image ? getIllustrationUrl(image) : image;
  return (
    <li
      className="AuxiliaryPanel"
      id={id}
      style={
        imageUrl
          ? ({ '--menu-auxiliary-image': `url(${imageUrl})` } as CSSProperties)
          : undefined
      }
    >
      <h3 className="AuxiliaryPanel__title">{title}</h3>
      <ul className="AuxiliaryPanel__items">
        {items.map((item, i) => (
          <li
            key={i}
            className="AuxiliaryPanel__item"
            aria-current={item.current || undefined}
          >
            <Link
              className="AuxiliaryPanel__link"
              href={item.href}
              target={item.target}
              lang={item.lang}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
