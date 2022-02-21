const playBtn = document.querySelector('#play-btn');
const timmer = document.querySelector('#timmer');
const counter = document.querySelector('#counter');
const carrot = document.querySelector('#carrot');
const bug = document.querySelector('#bug');
const targetBox = document.querySelector('.targets');
const resetBtn = document.querySelector('#reset-btn');
const resetBox = document.querySelector('.game-lost');
const gameLost = document.querySelector('.game-lost__txt');
const gameWin = document.querySelector('.game-win__txt');

const GAME_RESULT_CLASS = 'game-result-display';

let gameStart = false;
let carrotList = [];
let bugList = [];
let time;
let count;

const audioBk = new Audio('sound/bg.mp3');
audioBk.volume = 0.7;

const audioAlert = new Audio('sound/alert.mp3');
audioAlert.volume = 0.7;

const audioWin = new Audio('sound/game_win.mp3');
audioAlert.volume = 0.7;

const audioCarrot = new Audio('sound/carrot_pull.mp3');
audioAlert.volume = 0.4;

const audioBug = new Audio('sound/bug_pull.mp3');
audioAlert.volume = 0.4;

function randomOffset(length) {
  let randomValue = Math.floor(Math.random() * length);

  if (randomValue < 100) {
    return;
  } else {
    return randomValue - 100;
  }
}

function spreadTarget() {
  targetBox.childNodes.forEach((i) => {
    if (i.nodeName === 'P') {
      i.style.top = `${randomOffset(targetBox.clientHeight)}px`;
      i.style.left = `${randomOffset(targetBox.clientWidth)}px`;
    }
  });
}

function randomTargets(num) {
  const carrot = document.createElement('p');
  const bug = document.createElement('p');
  count = num;

  for (let i = 0; i < num + 1; i++) {
    carrot.classList.add('game-item__carrot');
    carrot.setAttribute('id', 'carrot');
    bug.classList.add('game-item__bug');
    bug.setAttribute('id', 'bug');
    carrotList.push(carrot);
    bugList.push(bug);
  }

  for (let i = 0; i < num + 1; i++) {
    targetBox.innerHTML += carrotList[i].outerHTML;
    targetBox.innerHTML += bugList[i].outerHTML;
  }
}

function start() {
  timmer.textContent = `00:${String(time).padStart(2, '0')}`;
  time--;
  if (time < 0) {
    clearInterval(start);
    audioBk.pause();
    resetBox.classList.remove('hidden');
    resetBox.classList.add('show');
    audioAlert.play();
    time = 0;
  }
}

function removeTarget(event) {
  let killTarget = event.target;

  if (killTarget.id === 'bug') {
    gameStart = true;
    gameLost.classList.remove(GAME_RESULT_CLASS);
    gameWin.classList.add(GAME_RESULT_CLASS);
    resetBox.classList.add('show');
    resetBox.classList.remove('hidden');
    clearInterval(start);
    time = 0;
    audioBug.play();
    audioBk.pause();
    audioAlert.play();
  } else if (killTarget.id === 'carrot') {
    targetBox.removeChild(killTarget);
    counter.textContent = `${count}`;
    count--;
    audioCarrot.load();
    audioCarrot.play();

    if (count < 0) {
      gameStart = true;
      audioBk.pause();
      audioWin.play();

      gameWin.classList.remove(GAME_RESULT_CLASS);
      gameLost.classList.add(GAME_RESULT_CLASS);
      resetBox.classList.add('show');
      resetBox.classList.remove('hidden');
      clearInterval(start);
      time = 0;
      targetBox.removeEventListener(removeTarget);
    }
  }
}

function onPlayGame(event) {
  if (gameStart === false) {
    gameStart = true;

    audioBk.play();

    targetBox.classList.remove('hidden');
    targetBox.classList.add('show');

    randomTargets(7);
    spreadTarget();
    clearInterval(start);

    time = 15;
    setInterval(start, 1000);
    counter.textContent = `${count + 1}`;

    targetBox.addEventListener('click', removeTarget);
  } else if (gameStart === true) {
    audioBk.pause();
    rePlayGame();
    playBtn.removeEventListener(onPlayGame);
    targetBox.removeEventListener(removeTarget);
    clearInterval(start);
    time = 0;
  }
}

function rePlayGame() {
  gameStart = false;
  while (targetBox.hasChildNodes()) {
    targetBox.removeChild(targetBox.firstChild);
  }
  resetBox.classList.remove('show');
  resetBox.classList.add('hidden');
  onPlayGame();
  window.location.reload();
}

playBtn.addEventListener('click', onPlayGame);
resetBtn.addEventListener('click', rePlayGame);
