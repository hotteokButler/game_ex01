# 게임만들기 예제 🥕🐞

- **practice exmaple project for internet lecture from DreamCoding**

- **All source of copyrights are followed in DreamCoding.(Images, musics)**

- **But, The All code is from 'hotteokButler'!**

## 1. 게임기능

- 시간내에 랜덤으로 뿌려진 당근을 찾아 click!하세요!
- 벌레를 클릭하게되면 'You lost!'

## 2. 구현

- only HTML CSS Vanilla.JS
- git hub commit message 작성법 공부
- 모듈화 연습
- Builder Pattern 적용

## 3. 파일 구조도

```
/carrot_game/
|
├- index.html
├- README.md
├- src => module
|   ├- all.min.js
|   ├- app.js
|   ├- game.js
|   ├- field.js
|   ├- popup.js
|   ⌊_ sound.js
|
├- css
|   ├- all.min.css
|   ├- reset.css
|   ⌊_ style.css
|
├- sound
|   ├- alert.wav
|   ├- bg.mp3
|   ├- bug_pull.mp3
|   ├- carrot_pull.mp3
|   ⌊_ game_win.mp3
|
├- img
|   ├- background.png
|   ├- bug.png
|   ⌊_ carrot.png
⌊_
```

## 4. 코드 정리

### 4-1. Builder Pattern

- Object를 생성하기위한 디자인 패턴으로, 복잡한 Object를 단순한 Object단위로 분리하여 단계별로 접근하기 위해서 사용된다.
- 분리된 object의 함수는 this를 리턴하고 이 this는 현재의 object를 참조한다.
  따라서 chaining을 이용해 call 할 수 있다.
- 생성자에 들어갈 매개 변수가 많든 적든 차례차례 매개 변수를 받아들이고 모든 매개 변수를 받은 뒤에 이 변수를 통합해서 한번에 사용한다.

> 참고1) : https://zetcode.com/javascript/builderpattern/
>
> 참고2) : https://jdm.kr/blog/217

```javascript
// ./src/game.js

export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount, //
      this.bugCount //
    );
  }
}
```

```javascript
// ./src/app.js

const game = new GameBuilder()
  .gameDuration(18) //
  .carrotCount(15) //
  .bugCount(15) //
  .build();
```

### 4-2. this 와 바인딩

- this :
  this라는 것은 어떤 클래스 안에 있는 함수를 콜백으로 전달할 때는 그 함수가 포함되어져 있는 클래스의 정보가 사라짐 따라서 클래스와 콜백으로 전달할 함수를 묶을 수 있는 즉, this와 함수를 묶을 수 있는 바인딩 또는 arrow function을 활용한다.

- carrot_game에서 적용할 수 있는 바인딩 방법

  - 1.  바인딩 첫번째 방법 : this.onClick에 바인딩된 값을 할당 : 맞는 방법이긴하지만, 이렇게는 잘 안씀

    ```javascript
    // ./src/field.js  class의 constructor내부에서 설정

    this.onClick = this.onClick.bind(this);
    this.field.addEventListener('click', this.onClick);
    ```

  - 2. 바인딩 두번째 방법 : arrow function을 사용(arrow function은 this값이 유지됨)

    ```javascript
    // ./src/field.js  class의 constructor내부에서 설정

    this.field.addEventListener('click', (event) => this.onClick(event));
    ```

  - 3. 바인딩 세번째 방법 : 멤버함수인 onClick활용 (arrow function)

    ```javascript
    // ./src/field.js  class의 constructor내부에서 설정

    this.field.addEventListener('click', this.onClick);

    // ./src/field.js  class의 onClick맴버함수설정
    onClick = (event) => {
      const target = event.target;
      if (target.matches('.carrot')) {
        target.remove();
        sound.playCarrot();
        this.onItemClick && this.onItemClick(ItemType.carrot);
      } else if (target.matches('.bug')) {
        sound.playBug();
        this.onItemClick && this.onItemClick(ItemType.bug);
      }
    };
    ```

  - 최종정리 :

  ```javascript
  this.onItemClick && this.onItemClick('carrot');
  ```

  실제로 onClick이 다른 곳으로 콜백으로 전달되어졌을 때에는 this라는 정보는
  존재하지 않기 때문에 아이템 클릭은 계속 undefined 상태.(this라는 정보가 더이상 class가 아니기 때문에)

  자바스크립트에서는 클래스에 있는 함수를 누군가에게 전달해 줄 때는 클래스 정보가 무시되기때문에 그렇게 하지않기 위해서는 해당 함수를 클래스와 바인딩 해줘야한다.=> **this 바인딩**

### 4-3. matches() API

- The matches() method checks to see if the Element would be selected by the provided selectorString -- in other words -- checks if the element "is" the selector.
- 정리 : matches() API는 해당 요소가 있는지 확인하는 API로, Boolean값 return , 셀렉터로 선택이 가능한 요소만을 사용할 수 있음!

> 참고 : matches API : https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
