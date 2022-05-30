import FormatChange from 'formatchange';

export const formatMonitor =
  // When running in CommonJS context (e.g. during server-side rendering)
  // FormatChange exports undefined
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  FormatChange &&
  new FormatChange({
    Hamburger: {
      phone: true,
      phablet: true,
      tablet: true,
    },
    Topmenu: {
      netbook: true,
      // desktop: true,
      wide: true,
    },
  });

export type MediaFormat = typeof formatMonitor.media;
