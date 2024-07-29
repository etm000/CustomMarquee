import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { styles } from './styles.js';

export class CustomMarquee extends LitElement {
  static styles = styles;

  static properties = {
    direction: {type: String},
    startPos: {type: String, attribute: "start-position"},
    duration: {type: Number}
  };

  #movingElem;
  #animation;

  constructor() {
    super();
    this.direction = 'left';
    this.startPos = 'offset';
    this.duration = 5000;
    this.#animation = 0;
    this.#movingElem = this.querySelector("[slot]");

    document.addEventListener('DOMContentLoaded', () => this.resetCoords());
    this.addEventListener("CustomMarqueeStart", () => this.start());
    this.addEventListener("CustomMarqueeStop", () => this.stop());
    this.addEventListener("CustomMarqueeContinue", () => this.continue());
    this.addEventListener("CustomMarqueeReset", () => this.reset());
  }

  getDirection() {
    return (['left', 'right'].includes(this.direction)) ? 'vertical' : 'horizontal';
  }

  /**
   * @returns {Array} x and y respectively
   */
  getStartCoords(continueAnimation = false) {
    if(this.startPos === 'center' && !continueAnimation) return [
      this.offsetWidth / 2 - this.#movingElem.offsetWidth / 2,
      this.offsetHeight / 2 - this.#movingElem.offsetHeight / 2
    ];

    if(this.getDirection() == 'vertical') return [
      (continueAnimation) ? +this.#movingElem.style.left.slice(0, -2) : -this.#movingElem.offsetWidth,
      this.offsetHeight / 2 - this.#movingElem.offsetHeight / 2
    ];
    else return [
      this.offsetWidth / 2 - this.#movingElem.offsetWidth / 2,
      (continueAnimation) ? +this.#movingElem.style.top.slice(0, -2) : -this.#movingElem.offsetHeight
    ];
  }

  start(continueAnimation = false) {
    // Formula for calculating how many milliseconds are needed for movingElem to move by 1 pixel
    const speed = this.duration / ((this.getDirection() == 'vertical') ? this.offsetWidth + this.#movingElem.offsetWidth : this.offsetHeight + this.#movingElem.offsetHeight);
    const delta = {
      x: (this.direction === 'right') - (this.direction === 'left'),
      y: (this.direction === 'down') - (this.direction === 'up')
    };
    let [x, y] = this.getStartCoords(continueAnimation);
    this.#animation = setInterval(() => {
      // Move the movingElem
      x += delta.x, y += delta.y;
      this.#movingElem.style.left = x + "px";
      this.#movingElem.style.top = y + "px";

      // Check boundaries and reset position of the movingElem
      if(x >= this.offsetWidth) x = -this.#movingElem.offsetWidth;
      else if(x <= -this.#movingElem.offsetWidth) x = this.offsetWidth;
      if(y >= this.offsetHeight) y = -this.#movingElem.offsetHeight;
      else if(y <= -this.#movingElem.offsetHeight) y = this.offsetHeight;
    }, speed);
  }

  continue() {
    this.start(true);
  }

  stop() {
    if(!this.#animation) return;
    clearInterval(this.#animation);
  }

  resetCoords() {
    const [x, y] = this.getStartCoords();
    this.#movingElem.style.left = x + "px";
    this.#movingElem.style.top = y + "px";
  }

  reset() {
    this.stop();
    this.resetCoords();
  }

  render() {
    return html`
      <slot name="text">ENTER TEXT</slot>
    `;
  }
}

customElements.define('c-marquee', CustomMarquee);
