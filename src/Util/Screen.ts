import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  let supportsMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function';

  let [matches, setMatches] = useState(() =>
    supportsMatchMedia ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!supportsMatchMedia) {
      return;
    }

    const controller = new AbortController();
    const media = window.matchMedia(query);

    media.addEventListener('change', (ev) => setMatches(ev.matches), {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [supportsMatchMedia, query]);

  return matches;
}
