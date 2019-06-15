import { storiesOf } from '@storybook/html';
import { component } from 'haunted';
import { html } from 'lit-element';

import notes from './Ripple.md';

export const RippleDemo: any = component(function RippleDemo(this: HTMLElement) {

  return html`
    <style>
      wf-surface-ripple { margin: 8px; }
    </style>
    <div>
      <h2>Simple buttons - with ripple</h2>
      <wf-surface-ripple>
        <wf-button .variant=${'unelevated'}>Open</wf-button>
      </wf-surface-ripple>
    </div>
  `;
});

customElements.define('wf-surface-ripple-demo', RippleDemo);

storiesOf('Effects', module)
  .addParameters({ notes })
  .add('Ripple', () => {
    return new RippleDemo();
  });
