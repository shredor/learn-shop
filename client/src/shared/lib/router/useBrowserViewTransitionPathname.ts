/**
 * Wouter hook which wraps location updates in `document.startViewTransition`
 * Based on wouter use-browser-location
 */

import { useEffect, useSyncExternalStore } from 'react';
import { useEvent } from 'react-use-event-hook';
import { BaseLocationHook } from 'wouter';
import { navigate } from 'wouter/use-browser-location';

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

const store = (() => {
  let state = {
    pathname: location.pathname,
    id: 0,
    event: 'initial',
    historyState: history.state,
  };

  let listeners: (() => void)[] = [];

  const subscribe = (cb: () => void) => {
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((listener) => listener !== cb);
    };
  };

  return {
    subscribe,
    getState: () => state,
    updatePathname: (pathname: string, event: string) => {
      state = { pathname, id: state.id + 1, event, historyState: history.state };
      listeners.forEach((listener) => listener());
    },
  };
})();

const setPathname = (pathname: string, event: string = 'manual') => {
  const isChanged = pathname !== store.getState().pathname;

  if (isChanged && shouldUseViewTransitionOnce && document.startViewTransition) {
    shouldUseViewTransitionOnce = false;

    return document.startViewTransition(() => {
      store.updatePathname(pathname, event);
    });
  }

  store.updatePathname(pathname, event);
};

subscribeToLocationUpdates((event) => setPathname(location.pathname, event));

export const usePathname = () =>
  useSyncExternalStore(store.subscribe, () => store.getState().pathname);

export const useNavigationId = () =>
  useSyncExternalStore(store.subscribe, () => store.getState().id);

export const useHistoryState = () =>
  useSyncExternalStore(store.subscribe, () => store.getState().historyState);

export const usePushStateEffect = (fn: () => void) => {
  const id = useNavigationId();

  const fnStable = useEvent(fn);

  useEffect(() => {
    if (store.getState().event !== eventPushState) return;

    fnStable();
  }, [id, fnStable]);
};

export const useBrowserViewTransitionPathname: BaseLocationHook = () => [usePathname(), navigate];
