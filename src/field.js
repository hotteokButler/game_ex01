'use strict';

export default class Field {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.item = document.createElement('img');
    this.fieldRect = this.field.getBoundingClientRect();
    this.carrotSize = 80;
    this.field.addEventListener('click', (e) => {
      this.onClick && this.onClick(e);
    });
  }

  setTargetListner(onClick) {
    this.onClick = onClick;
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  addItem(className, imgPath) {
    const item = this.item;
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - this.carrotSize;
    const y2 = this.fieldRect.height - this.carrotSize;
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = this.randomNumber(x1, x2);
    const y = this.randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    this.field.appendChild(item);
  }
}
