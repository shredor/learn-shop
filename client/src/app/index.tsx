import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/app/App';
import { createStore } from '@/app/store/store';

import { StoreProvider } from '@/shared/lib/store';

import '@/app/styles/index.css';
import { useBrowserViewTransitionPathname } from '@/shared/lib/router';

import { Router } from 'wouter';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router hook={useBrowserViewTransitionPathname}>
      <StoreProvider value={store}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
);
