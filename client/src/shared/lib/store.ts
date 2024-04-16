import { createContext, useContext } from 'react';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) throw new Error('useStore must be used within a StoreProvider');

  return store;
};
