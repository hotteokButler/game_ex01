const playBtn = document.querySelector('#play-btn');
const timmer = document.querySelector('#timmer');
const counter = document.querySelector('#counter');
const carrot = document.querySelector('#carrot');
const bug = document.querySelector('#bug');
const targetBox = document.querySelector('.targets');
const resetBtn = document.querySelector('#reset-btn');
const resetBox = document.querySelector('.game-lost');

let gameStart = false;
let carrotList = [];
let bugList = [];

function randomOffset(num) {
  return Math.floor(Math.random() * num) - 100;
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

function timeSet() {
  let time = 15;
  function start() {
    timmer.textContent = `00:${String(time).padStart(2, '0')}`;
    time--;
    if (time < 0) {
      clearInterval(start);
      resetBox.classList.remove('hidden');
      resetBox.classList.add('show');
      time = 0;
    }
  }
  setInterval(start, 1000);
}

function onPlayGame(event) {
  if (gameStart === false) {
    gameStart = true;
    targetBox.classList.remove('hidden');
    targetBox.classList.add('show');

    randomTargets(7);
    spreadTarget();
    timeSet();
  } else if (gameStart === ture) {
    playBtn.removeEventListener(onPlayGame);
  }
}
function rePlayGame() {
  gameStart = false;
  resetBox.classList.remove('show');
  resetBox.classList.add('hidden');
  onPlayGame();
}
playBtn.addEventListener('click', onPlayGame);
resetBtn.addEventListener('click', rePlayGame);
