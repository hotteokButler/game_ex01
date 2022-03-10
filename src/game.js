'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
/* 무언가 오브젝트를 만들 때 Builder Pattern을 이용해서 오브젝트를 간단명료하게
읽기 쉽게 만들 수 있다.
*/
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

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stopOrFinish(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListner(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stopOrFinish(reason) {
    this.started = false;
    this.score = 0;
    this.stopGameTimer();
    this.hideGameButton();
    this.hideTimerAndScore();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  //this 정보에 접근해야하기때문에 arrow function으로

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;

      this.updateScoreBoard(this.score, this.carrotCount);
      if (this.score === this.carrotCount) {
        this.stopOrFinish(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stopGameTimer();
      this.stopOrFinish(Reason.lose);
    }
  };

  stopGameTimer() {
    clearInterval(this.timer);
  }

  startGameTimer() {
    let remaingTimeSec = this.gameDuration;
    this.updateTimerText(remaingTimeSec);
    this.timer = setInterval(() => {
      if (remaingTimeSec <= 0) {
        clearInterval(this.timer);
        this.started = false;
        //finishGame의 argument가 boolean값으로 전달되고있으므로 조건식을 전달하여 중단유무
        this.stopOrFinish(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remaingTimeSec);
    }, 1000);
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  showStopButton() {
    const stopIcon = this.gameBtn.querySelector('.game__button-stop');
    const palyIcon = this.gameBtn.querySelector('.game__button-play');
    stopIcon.classList.remove('game__button--hide');
    palyIcon.classList.add('game__button--hide');
  }

  showGameButton() {
    this.gameBtn.style.visibility = 'visible';
  }
  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }
  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  hideTimerAndScore() {
    this.gameTimer.style.visibility = 'hidden';
    this.gameScore.style.visibility = 'hidden';
  }
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} :${seconds}`;
  }
  updateScoreBoard(score, carrotCount) {
    this.gameScore.innerText = carrotCount - score;
  }
}
