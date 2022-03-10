// 공통적으로 쓸 수 있는 함수와 변수들이기때문에, 굳이 클래스로 정의하지 않음

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
  playSound(carrotSound);
}
export function playBug() {
  playSound(bugSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playWin() {
  playSound(winSound);
}
export function stopBackground() {
  stopSound(bgSound);
}
export function playBackground() {
  playSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
