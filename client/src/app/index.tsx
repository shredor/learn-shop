import { createCtx } from '@reatom/core';
import { connectLogger } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'wouter';

import { App } from '@/app/App';

import '@/app/styles/index.css';
import { useWouterPathname } from '@/shared/lib/router/hooks';

const ctx = createCtx();

connectLogger(ctx, {
  skipUnnamed: false,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router hook={useWouterPathname}>
      <reatomContext.Provider value={ctx}>
        <App />
      </reatomContext.Provider>
    </Router>
  </React.StrictMode>,
);
