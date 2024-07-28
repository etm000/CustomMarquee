import { css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
export const styles = css` 
* {
  margin: 0;
  padding: 0;
}

:host {
  --cmq-width: 100%;
  --cmq-height: 2em;
  display: block;
  box-sizing: border-box;
  width: var(--cmq-width);
  height: var(--cmq-height);
  position: relative;
  overflow: hidden;
}

::slotted(*) {
  display: block;
  position: absolute;
  white-space: nowrap;
} `;
