import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { styles } from './styles.js';

export class CustomMarquee extends LitElement {
  static styles = styles;

  static properties = {
    direction: {type: String},
    startPos: {type: String, attribute: "start-position"},
    duration: {type: Number}
  };

  #movingElm;
  #animation;

  constructor() {
    super();
    this.direction = 'left';
    this.startPos = 'left';
    this.duration = 5000;
    this.#animation = 0;
    this.#movingElm = this.querySelector("[slot]");

    document.addEventListener('DOMContentLoaded', () => {
      if(this.getDirection() == 'vertical') this.#movingElm.style.left = -this.#movingElm.offsetWidth + "px";
      else this.#movingElm.style.top = -this.#movingElm.offsetHeight + "px";
      this.style.lineHeight = this.offsetHeight / this.#movingElm.offsetHeight;
      this.start();
    });
  }

  getDirection() {
    return (['left', 'right'].includes(this.direction)) ? 'vertical' : 'horizontal';
  }

  start() {
    const speed = this.duration / (this.offsetWidth + this.#movingElm.offsetWidth);
    const delta = {
      x: (this.direction === 'right') - (this.direction === 'left'),
      y: (this.direction === 'down') - (this.direction === 'up')
    };
    let x, y;
    if(this.getDirection() == 'vertical') x = this.#movingElm.offsetLeft, y = this.offsetHeight / 2 - this.#movingElm.offsetHeight / 2;
    else y = this.offsetWidth / 2 - this.#movingElm.offsetHeight / 2, y = this.#movingElm.offsetTop;
    this.#animation = setInterval(() => {
      x += delta.x, y += delta.y;
      this.#movingElm.style.left = x + "px";
      this.#movingElm.style.top = y + "px";
      if(x >= this.offsetWidth) x = -this.#movingElm.offsetWidth;
      if(y >= this.offsetHeight) y = -this.#movingElm.offsetHeight;
    }, speed);
  }

  stop() {
    if(!this.#animation) return;
    clearInterval(this.#animation);
  }

  reset() {
    this.stop();
    if(this.getDirection() == 'vertical') x = this.#movingElm.offsetLeft, y = this.offsetHeight / 2 - this.#movingElm.offsetHeight / 2;
    else y = this.offsetWidth / 2 - this.#movingElm.offsetHeight / 2, y = this.#movingElm.offsetTop;
    this.#movingElm.style.left = x + "px";
    this.#movingElm.style.top = y + "px";
  }

  render() {
    return html`
      <slot name="text">ENTER TEXT</slot>
    `;
  }
}

customElements.define('c-marquee', CustomMarquee);
