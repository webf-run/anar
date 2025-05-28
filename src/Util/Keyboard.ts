import type { KeyboardEvent, KeyboardEventHandler, RefObject } from 'react';

export type KeyboardKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';
export type KeyboardKeyHandlerMap = Partial<Record<KeyboardKey, KeyboardEventHandler>>;

/**
 * Returns a event handler function that can be used with onKeyDown, onKeyUp or onKeyPress event.
 * The handler executes only if the key is present in the map.
 * */
export function useKeyHandler(map: KeyboardKeyHandlerMap): KeyboardEventHandler {
  return (event: KeyboardEvent) => {
    const key = event.key as KeyboardKey;

    if (map[key]) {
      event.preventDefault();
      map[key](event);
    }
  };
}

export function useGridKeyboardNavigation(ref: RefObject<HTMLElement>, selector: string, columns: number): KeyboardEventHandler {
  return useKeyHandler({
    ArrowLeft: (event) => {
      const elms = getElements(ref, selector);
      const activeIndex = findActiveIndex(elms, event);
      const nextIndex = activeIndex > 0 ? activeIndex - 1 : elms.length - 1;

      elms.at(nextIndex)?.focus();
    },
    ArrowRight: (event) => {
      const elms = getElements(ref, selector);
      const activeIndex = findActiveIndex(elms, event);
      const nextIndex = activeIndex < elms.length - 1 ? activeIndex + 1 : 0;

      elms.at(nextIndex)?.focus();
    },
    ArrowUp: (event) => {
      const elms = getElements(ref, selector);
      const activeIndex = findActiveIndex(elms, event);
      const nextIndex = activeIndex - columns >= 0 ? activeIndex - columns : elms.length - columns + activeIndex;

      elms.at(nextIndex)?.focus();
    },
    ArrowDown: (event) => {
      const elms = getElements(ref, selector);
      const activeIndex = findActiveIndex(elms, event);
      const nextIndex = activeIndex + columns < elms.length ? activeIndex + columns : activeIndex - (elms.length - columns);

      elms.at(nextIndex)?.focus();
    },
  });
}


function getElements(ref: RefObject<HTMLElement>, selector: string): HTMLElement[] {
  return Array.from(ref.current?.querySelectorAll<HTMLElement>(selector) ?? []);
}

function findActiveIndex(elms: HTMLElement[], event: KeyboardEvent): number {
  return elms.findIndex((elm) => elm === event.target);
}
