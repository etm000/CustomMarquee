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
    this.startPos = 'offset';
    this.duration = 5000;
    this.#animation = 0;
    this.#movingElm = this.querySelector("[slot]");

    document.addEventListener('DOMContentLoaded', () => {
      this.style.lineHeight = this.offsetHeight / this.#movingElm.offsetHeight;
      this.start();
    });
  }

  getDirection() {
    return (['left', 'right'].includes(this.direction)) ? 'vertical' : 'horizontal';
  }

  /**
   * @returns {Array} x and y respectively
   */
  getStartCoords(continueAnimation) {
    if(this.startPos === 'center') return [
      this.offsetWidth / 2 - this.#movingElm.offsetWidth / 2,
      this.offsetHeight / 2 - this.#movingElm.offsetHeight / 2
    ];

    if(this.getDirection() == 'vertical') return [
      (continueAnimation) ? this.#movingElm.offsetLeft : -this.#movingElm.offsetWidth,
      this.offsetHeight / 2 - this.#movingElm.offsetHeight / 2
    ];
    else return [
      this.offsetWidth / 2 - this.#movingElm.offsetWidth / 2,
      (continueAnimation) ? this.#movingElm.offsetTop : -this.#movingElm.offsetHeight
    ];
  }

  start(continueAnimation = false) {
    // Formula for calculating how many milliseconds are needed for movingElm to move by 1 pixel
    const speed = this.duration / ((this.getDirection() == 'vertical') ? this.offsetWidth + this.#movingElm.offsetWidth : this.offsetHeight + this.#movingElm.offsetHeight);
    const delta = {
      x: (this.direction === 'right') - (this.direction === 'left'),
      y: (this.direction === 'down') - (this.direction === 'up')
    };
    let [x, y] = this.getStartCoords(continueAnimation);
    this.#animation = setInterval(() => {
      // Move the movingElm
      x += delta.x, y += delta.y;
      this.#movingElm.style.left = x + "px";
      this.#movingElm.style.top = y + "px";

      // Check boundaries and reset position of the movingElm
      if(x >= this.offsetWidth) x = -this.#movingElm.offsetWidth;
      else if(x <= -this.#movingElm.offsetWidth) x = this.offsetWidth;
      if(y >= this.offsetHeight) y = -this.#movingElm.offsetHeight;
      else if(y <= -this.#movingElm.offsetHeight) y = this.offsetHeight;
    }, speed);
  }

  continue() {
    this.start(true);
  }

  stop() {
    if(!this.#animation) return;
    clearInterval(this.#animation);
  }

  reset() {
    this.stop();
    const [x, y] = this.getStartCoords();
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
