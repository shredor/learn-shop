/**
 * Wouter hook which wraps location updates in `document.startViewTransition`
 * Based on wouter use-browser-location
 */

import { BaseLocationHook } from 'wouter';
import { navigate } from 'wouter/use-browser-location';

import { createStore, useSelector } from '@/shared/lib/store';

const eventPopstate = 'popstate';
const eventPushState = 'pushState';
const eventReplaceState = 'replaceState';
const eventHashchange = 'hashchange';
const events = [eventPopstate, eventPushState, eventReplaceState, eventHashchange];

const subscribeToLocationUpdates = (callback: (event: string) => void) => {
  const cleanupFns: (() => void)[] = [];

  for (const event of events) {
    const eventCallback = () => callback(event);

    addEventListener(event, eventCallback);

    cleanupFns.push(() => removeEventListener(event, eventCallback));
  }

  return () => cleanupFns.forEach((fn) => fn());
};

let shouldUseViewTransitionOnce = false;

export const enableViewTransitionOnce = () => {
  shouldUseViewTransitionOnce = true;
};

const store = createStore({
  pathname: location.pathname,
  id: 0,
  event: 'initial',
  historyState: history.state,
});

const setPathname = (pathname: string, event: string = 'manual') => {
  const state = store.getState();
  const isChanged = pathname !== state.pathname;

  if (isChanged && shouldUseViewTransitionOnce && document.startViewTransition) {
    shouldUseViewTransitionOnce = false;

    return document.startViewTransition(() => {
      store.update({ id: state.id + 1, pathname, event });
    });
  }

  store.update({ id: state.id + 1, pathname, event });
};

subscribeToLocationUpdates((event) => setPathname(location.pathname, event));

export const usePathname = () => useSelector(store, ({ pathname }) => pathname);

export const useHistoryState = () => useSelector(store, ({ historyState }) => historyState);

export const useBrowserViewTransitionPathname: BaseLocationHook = () => [usePathname(), navigate];
