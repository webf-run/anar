import type { BreakpointMap, BreakpointQueryMap } from './Breakpoint';

export type GlobalContext = {
  breakpoints: BreakpointMap;
  queries: BreakpointQueryMap;
};

const ANAR = Symbol.for('@webf/anar');

export function getGlobalContext(): GlobalContext {
  return (globalThis as any)[ANAR] as GlobalContext;
}

export function setGlobalContext(context: GlobalContext) {
  (globalThis as any)[ANAR] = context;
}
