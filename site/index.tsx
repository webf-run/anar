import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { initAnar } from '../src/Anar.js';
import { App } from './App.js';

export function run() {
  initAnar();
  const domElm = document.createElement('div');
  const root = createRoot(domElm);

  domElm.className = 'root1';
  document.body.appendChild(domElm);

  root.render(createElement(App));
}

run();
