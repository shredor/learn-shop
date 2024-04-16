import { useSyncExternalStore } from 'react';

export const createStore = <T>(initialState: T) => {
  let state = initialState;

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
    update: (newState: Partial<T>) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    },
  };
};

export const useSelector = <T, R>(
  store: ReturnType<typeof createStore<T>>,
  selector: (state: T) => R,
) => useSyncExternalStore(store.subscribe, () => selector(store.getState()));
