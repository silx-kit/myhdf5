import '@h5web/app/styles.css';
import './index.css';

import { assertNonNull, enableBigIntSerialization } from '@h5web/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

enableBigIntSerialization();

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

createRoot(rootElem).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
