import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { styles } from './styles.js';

export class CustomMarquee extends LitElement {
  static styles = styles;

  static properties = {
    direction: {type: String},
    startPos: {type: String, attribute: "start-position"},
    duration: {type: Number},
    delay: {type: Number},
  };

  #movingElem;
  #animation;
  #_state;

  set #state(val) {
    this.#_state = val;
    this.setAttribute('state', this.#_state);
  }

  get #state() {
    return this.#_state;
  }

  set state(val) {
    throw new TypeError("\"state\" is read-only.");
  }

  get state() {
    return this.#_state;
  }

  constructor() {
    super();
    this.direction = 'left';
    this.startPos = 'offset';
    this.duration = 5000;
    this.delay = 0;
    this.#state = 'idle';
    this.#animation = 0;
    this.#movingElem = this.querySelector("[slot]");

    document.addEventListener('DOMContentLoaded', () => this.#resetCoords());
  }

  #getDirection() {
    return (['left', 'right'].includes(this.direction)) ? 'vertical' : 'horizontal';
  }

  /**
   * @returns {Array} x and y respectively
   */
  #getStartCoords(continueAnimation = false) {
    if(this.startPos === 'center' && !continueAnimation) return [
      this.offsetWidth / 2 - this.#movingElem.offsetWidth / 2,
      this.offsetHeight / 2 - this.#movingElem.offsetHeight / 2
    ];

    if(this.#getDirection() == 'vertical') return [
      (continueAnimation) ? +this.#movingElem.style.left.slice(0, -2) : -this.#movingElem.offsetWidth,
      this.offsetHeight / 2 - this.#movingElem.offsetHeight / 2
    ];
    else return [
      this.offsetWidth / 2 - this.#movingElem.offsetWidth / 2,
      (continueAnimation) ? +this.#movingElem.style.top.slice(0, -2) : -this.#movingElem.offsetHeight
    ];
  }

  #createDelay(delay) {
    if(delay) {
      this.stop();
      setTimeout(() => this.continue(), delay);
    }
  }

  /**
   * Checks for the boundaries and returns new values accordingly
   * @param {Number} x
   * @param {Number} y
   * @returns {Array} x, y and hitBoundary respectively 
   */
  #checkBoundaries(x, y) {
    const boundaries = {
      'left': -this.#movingElem.offsetWidth,
      'right': this.offsetWidth,
      'up': -this.#movingElem.offsetHeight,
      'down': this.offsetHeight
    };
    let newX = x, newY = y;

    if(x >= boundaries.right && this.direction === 'right') newX = -this.#movingElem.offsetWidth - 1;
    else if(x <= boundaries.left && this.direction === 'left') newX = this.offsetWidth + 1;
    if(y >= boundaries.down && this.direction === 'down') newY = -this.#movingElem.offsetHeight - 1;
    else if(y <= boundaries.up && this.direction === 'up') newY = this.offsetHeight + 1;

    return [newX, newY, (newX != x || newY != y)];
  }

  start(continueAnimation = false) {
    if(this.#state !== 'idle') return;
    this.#state = "moving";
    // Formula for calculating how many milliseconds are needed for movingElem to move by 1 pixel
    const speed = this.duration / ((this.#getDirection() == 'vertical') ? this.offsetWidth + this.#movingElem.offsetWidth : this.offsetHeight + this.#movingElem.offsetHeight);
    const delta = {
      x: (this.direction === 'right') - (this.direction === 'left'),
      y: (this.direction === 'down') - (this.direction === 'up')
    };
    let [x, y] = this.#getStartCoords(continueAnimation);
    let hitBoundary = false;
    this.#animation = setInterval(async () => {
      // Move the movingElem
      x += delta.x, y += delta.y;
      this.#movingElem.style.left = x + "px";
      this.#movingElem.style.top = y + "px";

      if(hitBoundary) this.#createDelay(this.delay);
      
      // Check boundaries and reset position of the movingElem
      [x, y, hitBoundary] = this.#checkBoundaries(x, y);
    }, speed);
  }

  continue() {
    if(this.#state !== 'idle') return;
    this.start(true);
  }

  stop() {
    if(!this.#animation) return;
    this.#state = "idle";
    clearInterval(this.#animation);
  }

  #resetCoords() {
    const [x, y] = this.#getStartCoords();
    this.#movingElem.style.left = x + "px";
    this.#movingElem.style.top = y + "px";
  }

  reset() {
    this.stop();
    this.#resetCoords();
  }

  render() {
    return html`
      <slot name="text">ENTER TEXT</slot>
    `;
  }
}

customElements.define('c-marquee', CustomMarquee);