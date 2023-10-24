import '@h5web/app/styles.css';
import './index.css';

import { assertNonNull } from '@h5web/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

createRoot(rootElem).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
