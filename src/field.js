'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

// 클래스에 상관없는 함수라면 클래스에 포함되지 않는것이 반복적으로 오브젝트에 만들어지지 않기때문에 효율적이다. => static 함수
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    /* 바인딩 첫번째 방법 :
    this.onClick = this.onClick.bind(this); => this.onClick에 바인딩된 값을 할당 : 맞는 방법이긴하지만, 이렇게는 잘 안씀
     this.field.addEventListener('click', this.onClick); */

    /* 두번째 방법 : arrow function을 사용(arrow function은 this값이 유지됨)
    this.field.addEventListener('click', (event) => this.onClick(event));
     */

    // 세번째 방법 (멤버함수인 onClick활용)
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, './img/carrot.png');
    this._addItem('bug', this.bugCount, './img/bug.png');
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }
  // 아직 자바스크립트에서는 프라이빗이 통용적으로 쓰여지고 있지 않기 때문에
  // 대부분 underscore(_)를 이용해서 외부에서는 부르지 않도록 표시해줄 수 있지만,
  // 별로 좋지 않은 방법들이다.
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  onClick = (event) => {
    const target = event.target;
    // matches API : https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
      /*
      this.onItemClick && this.onItemClick('carrot');
      실제로 onClick이 다른 곳으로 콜백으로 전달되어졌을 때에는 this라는 정보는
      존재하지 않기 때문에 아이템 클릭은 계속 undefined 상태.(this라는 정보가 더이상 class가 아니기 때문에) 
      
      자바스크립트에서는 클래스에 있는 함수를 누군가에게 전달해 줄 때는 클래스 정보가 무시되기때문에 그렇게 하지 
      않기 위해서는 해당 함수를 클래스와 바인딩 해줘야한다. => this 바인딩
      */
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
      sound.playBug();
    }
  };
}

// this 정리

/* 
this라는 것은 어떤 클래스 안에 있는 함수를 콜백으로 전달할 때는 그 함수가 포함되어져 있는 클래스의 정보가 사라짐

따라서 클래스와 콜백으로 전달할 함수를 묶을 수 있는 즉, this와 함수를 묶을 수 있는 바인딩 또는 arrow function을 활용.
*/
