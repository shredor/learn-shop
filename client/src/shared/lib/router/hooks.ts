/**
 * Wouter hook which wraps location updates in `document.startViewTransition`
 * Based on wouter use-browser-location
 */

import { action, atom, onConnect, reatomBoolean, withInit } from '@reatom/framework';
import { useAction, useAtom } from '@reatom/npm-react';
import { BaseLocationHook } from 'wouter';
import { navigate } from 'wouter/use-browser-location';

const eventPopstate = 'popstate';
const eventPushState = 'pushState';
const eventReplaceState = 'replaceState';
const eventHashchange = 'hashchange';
const events = [eventPopstate, eventPushState, eventReplaceState, eventHashchange] as const;

type NavigationEvent = (typeof events)[number] | 'initial';

const getRouterState = (navigationId: number, event: NavigationEvent) => ({
  navigationId,
  pathname: location.pathname,
  event,
  historyState: history.state,
  search: location.search,
});

const routerStateAtom = atom(getRouterState(0, 'initial'), 'routerStateAtom').pipe(
  withInit(() => getRouterState(0, 'initial')),
);

export const navigationIdAtom = atom(
  (ctx) => ctx.spy(routerStateAtom).navigationId,
  'navigationIdAtom',
);

export const pathnameAtom = atom((ctx) => ctx.spy(routerStateAtom).pathname, 'pathnameAtom');

export const navigationEventAtom = atom(
  (ctx) => ctx.spy(routerStateAtom).event,
  'navigationEventAtom',
);
export const historyStateAtom = atom(
  (ctx) => ctx.spy(routerStateAtom).historyState,
  'historyStateAtom',
);

export const locationSearchAtom = atom(
  (ctx) => ctx.spy(routerStateAtom).search,
  'locationSearchAtom',
);

const shouldUseViewTransitionOnceAtom = reatomBoolean(false, 'shouldUseViewTransitionOnceAtom');

const scheduleUpdateRouterState = action((ctx, event: NavigationEvent) => {
  const isPathnameChanged = location.pathname !== ctx.get(pathnameAtom);
  const shouldUseViewTransition = ctx.get(shouldUseViewTransitionOnceAtom);
  const { startViewTransition } = document;

  const updateRouterState = () =>
    routerStateAtom(ctx, (state) => getRouterState(state.navigationId + 1, event));

  if (isPathnameChanged && shouldUseViewTransition && startViewTransition) {
    shouldUseViewTransitionOnceAtom(ctx, false);
    ctx.schedule(() => document.startViewTransition!(updateRouterState));
  } else {
    ctx.schedule(() => updateRouterState());
  }
}, 'scheduleUpdateRouterState');

onConnect(routerStateAtom, (ctx) => {
  const cleanupFns: (() => void)[] = [];

  events.forEach((event) => {
    const callback = () => scheduleUpdateRouterState(ctx, event);
    addEventListener(event, callback);
    cleanupFns.push(() => removeEventListener(event, callback));
  });

  return () => cleanupFns.forEach((fn) => fn());
});

export const useShouldUseViewTransitionOnce = () =>
  useAction(shouldUseViewTransitionOnceAtom.setTrue);
export const useNavigationId = () => useAtom(navigationIdAtom)[0];
export const usePathname = () => useAtom(pathnameAtom)[0];
export const useNavigationEvent = () => useAtom(navigationEventAtom)[0];
export const useHistoryState = () => useAtom(historyStateAtom)[0];
export const useLocationSearch = () => useAtom(locationSearchAtom)[0];
export const useWouterPathname: BaseLocationHook = () => [usePathname(), navigate];
