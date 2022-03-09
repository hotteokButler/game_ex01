'use strict';

import PopUp from './popup.js';
import Field from './field.js';

(function () {
  // const CARROT_SIZE = 80;
  const CARROT_COUNT = 15;
  const BUG_COUNT = 15;
  const GAME_DURATION_SEC = 18;

  const gameBtn = document.querySelector('.game__button');
  const gameTimer = document.querySelector('.game__timer');
  const gameScore = document.querySelector('.game__score');

  const carrotSound = new Audio('./sound/carrot_pull.mp3');
  const bugSound = new Audio('./sound/bug_pull.mp3');
  const alertSound = new Audio('./sound/alert.wav');
  const bgSound = new Audio('./sound/bg.mp3');
  const winSound = new Audio('./sound/game_win.mp3');

  let started = false;
  let score = 0;
  let timer = undefined;

  const gameFinishBanner = new PopUp();
  const gameField = new Field();

  gameFinishBanner.setClickListener(() => {
    startGame();
    showGameButton();
  });

  gameField.setTargetListner((e) => {
    onFieldClick(e);
  });
  // field.addEventListener('click', onFieldClick);

  gameBtn.addEventListener('click', () => {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  });

  // 이렇게 함수 단위로 정의하면서 하나 하나씩 메꿔가면서 코딩해나가면된다

  function startGame() {
    started = true;
    initGame(CARROT_COUNT, BUG_COUNT);
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
  }
  function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY????');
    hideTimerAndScore();
    stopSound(bgSound);
    playSound(alertSound);
  }
  function finishGame(win) {
    started = false;
    score = 0;
    hideGameButton();
    hideTimerAndScore();
    // finishGame에서 한번 더 stopGameTimer을 호출해줘야지 중복되어 성공 후 리플레이시 타임이 빠르게 줄어드는 오류를 제거
    stopGameTimer(timer);
    if (win) {
      playSound(winSound);
    } else {
      playSound(alertSound);
      stopSound(bgSound);
    }
    gameFinishBanner.showWithText(win ? 'YOU WON!!!!😎' : 'YOU LOST!!💩');
  }
  function stopGameTimer() {
    clearInterval(timer);
  }
  function showStopButton() {
    const stopIcon = gameBtn.querySelector('.game__button-stop');
    const palyIcon = gameBtn.querySelector('.game__button-play');
    stopIcon.classList.remove('game__button--hide');
    palyIcon.classList.add('game__button--hide');
  }
  function showGameButton() {
    gameBtn.style.visibility = 'visible';
  }
  function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
  }
  function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
  }
  function hideTimerAndScore() {
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
  }

  function startGameTimer() {
    let remaingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remaingTimeSec);
    timer = setInterval(() => {
      if (remaingTimeSec <= 0) {
        clearInterval(timer);
        started = false;
        //finishGame의 argument가 boolean값으로 전달되고있으므로 조건식을 전달하여 중단유무
        finishGame(CARROT_COUNT === score);
        return;
      }
      updateTimerText(--remaingTimeSec);
    }, 1000);
  }
  // 왜 분단위로 계산 후에 초단위로 다시 나눠주는걸까?
  // -> 카운팅에 분단위도 들어있어서
  function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes} :${seconds}`;
  }

  function initGame(CARROT_COUNT, BUG_COUNT) {
    // 게임이 다시 시작할때, field 안의 내용들을 다 지워주기위해 비워주는 과정!
    gameField.field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해준다

    for (let i = 0; i < BUG_COUNT; i++) {
      const bug = new Field();
      bug.addItem('bug', './img/bug.png');
    }
    for (let i = 0; i < CARROT_COUNT; i++) {
      const carrot = new Field();
      carrot.addItem('carrot', './img/carrot.png');
    }

    // addItem('carrot', CARROT_COUNT, './img/carrot.png');
    // addItem('bug', BUG_COUNT, './img/bug.png');
  }
  function onFieldClick(e) {
    if (!started) {
      return;
    }
    const target = e.target;
    // matches API : https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (target.matches('.carrot')) {
      target.remove();
      score++;
      playSound(carrotSound);
      updateScoreBoard();
      if (score === CARROT_COUNT) {
        finishGame(true);
      }
    } else if (target.matches('.bug')) {
      stopGameTimer();
      finishGame(false);
      playSound(bugSound);
      stopSound(bgSound);
    }
  }

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }
  function stopSound(sound) {
    sound.pause();
  }
  function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
  }

  // function addItem(className, count, imgPath) {
  //   const x1 = 0;
  //   const y1 = 0;
  //   const x2 = fieldRect.width - CARROT_SIZE;
  //   const y2 = fieldRect.height - CARROT_SIZE;
  //   for (let i = 0; i < count; i++) {
  //     const item = document.createElement('img');
  //     item.setAttribute('class', className);
  //     item.setAttribute('src', imgPath);
  //     item.style.position = 'absolute';
  //     const x = randomNumber(x1, x2);
  //     const y = randomNumber(y1, y2);
  //     item.style.left = `${x}px`;
  //     item.style.top = `${y}px`;
  //     field.appendChild(item);
  //   }
  // }

  // function randomNumber(min, max) {
  //   return Math.random() * (max - min) + min;
  // }
})();
