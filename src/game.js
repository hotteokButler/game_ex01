'use strict';
import Field from './field.js';
import * as sound from './sound.js';

// Builder Pattern
/* 무언가 오브젝트를 만들 때 Builder Pattern을 이용해서 오브젝트를 간단명료하게
읽기 쉽게 만들  수 있다.
*/
export default class GameBuilder {
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
        this.stop();
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
  start = () => {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  };
  stop = () => {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.hideTimerAndScore();
    sound.stopBackground();
    sound.playAlert();
    this.onGameStop && this.onGameStop('cancel');
  };
  finish = (win) => {
    this.started = false;
    this.score = 0;
    this.hideGameButton();
    this.hideTimerAndScore();
    // finishGame에서 한번 더 stopGameTimer을 호출해줘야지 중복되어 성공 후 리플레이시 타임이 빠르게 줄어드는 오류를 제거
    this.stopGameTimer(this.timer);
    if (win) {
      sound.playWin();
    } else {
      sound.playAlert();
      sound.stopBackground();
    }
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  };

  //this 정보에 접근해야하기때문에 arrow function으로

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.score++;

      this.updateScoreBoard(this.score, this.carrotCount);
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.stopGameTimer();
      this.finish(false);
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
        this.finish(this.carrotCount === this.score);
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
