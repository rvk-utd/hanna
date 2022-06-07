import { useEffect, useRef, useState } from 'react';
import { getSVGtext } from '@reykjavik/hanna-utils';

type SVGMeta = { imageSrc: string; code: string };

export const useGetSVGtext = (imageSrc: string | undefined): SVGMeta | undefined => {
  const [inlineSvg, setInlineSvg] = useState<SVGMeta>();
  const srcRef = useRef(imageSrc);
  useEffect(() => {
    if (imageSrc) {
      getSVGtext(imageSrc).then((code) => {
        if (imageSrc === srcRef.current) {
          setInlineSvg({ imageSrc, code });
        }
      });
    }
    srcRef.current = imageSrc;
    setInlineSvg(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  return inlineSvg;
};
