'use strict';

import PopUp from './popup.js';
import Field from './field.js';

(function () {
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
  const gameField = new Field(CARROT_COUNT, BUG_COUNT);

  gameFinishBanner.setClickListener(() => {
    startGame();
    showGameButton();
  });

  gameField.setClickListner(onItemClick);

  function onItemClick(item) {
    if (!started) {
      return;
    }
    if (item === 'carrot') {
      score++;
      updateScoreBoard();
      if (score === CARROT_COUNT) {
        finishGame(true);
      }
    } else if (item === 'bug') {
      stopGameTimer();
      finishGame(false);
    }
  }

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
    initGame();
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

  function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
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
})();