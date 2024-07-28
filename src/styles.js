import { css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
export const styles = css` 
* {
  margin: 0;
  padding: 0;
}

:host {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 2em;
  position: relative;
  overflow: hidden;
}

::slotted(*) {
  display: block;
  position: absolute;
  white-space: nowrap;
} `;
