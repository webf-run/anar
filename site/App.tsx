import { StrictMode } from 'react';

import { Anar } from '../src/Anar.js';

function getElm() {
  return document.querySelector(':root') as HTMLElement;
}

export function App() {
  return (
    <StrictMode>
      <Anar colorScheme='dark' getRootElement={getElm}>
        <h1>Hello, world!</h1>
      </Anar>
    </StrictMode>
  );
};
