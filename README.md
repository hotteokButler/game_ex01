# 게임만들기 예제 🥕🐞

- **practice exmaple project for internet lecture from DreamCoding**

- **All source of copyrights are followed in DreamCoding.(Images, musics)**

- **But, The All code is from 'hotteokButler'!**

## 게임기능

- 시간내에 랜덤으로 뿌려진 당근을 찾아 click!하세요!
- 벌레를 클릭하게되면 'You lost!'

## 구현

- only HTML CSS Vanilla.JS
- git hub commit message 작성법 공부
- 모듈화 연습
- Builder Pattern 적용

## 파일 구조도

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

## Builder Pattern

### BuilderPatter이란?

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
