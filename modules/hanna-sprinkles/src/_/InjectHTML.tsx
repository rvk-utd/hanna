import React, { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
/** Hack component to inject innerHTML without an element wrapper */
export const InjectHTML = ({ html }: { html: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.outerHTML = ref.current.innerHTML;
  }, []);
  return <span ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
};
