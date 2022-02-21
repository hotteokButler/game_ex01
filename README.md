# 게임만들기 예제 🥕🐞

- **practice exmaple project for internet lecture from DreamCoding**

- **All source of copyrights are followed in DreamCoding.(Images, musics)**

- **But, The All code is from 'hotteokButler'!**
- 
## 게임기능
  - 시간내에 랜덤으로 뿌려진 당근을 찾아 click!하세요!
  - 벌레를 클릭하게되면 'You lost!'

## 구현
  - only HTML CSS Vanilla.JS
  - git hub commit message 작성법 공부 
  - JavaScript API인 Audio()를 이용하여 배경음 재생 및 효과음 재생

## 진행중

## 중간 메모
  - git hub commit message 작성법을 공부하며 적용중인데 제대로 되는건지 모르겠다
  - [error1] : 플레이 버튼 클릭시 랜덤하게 뿌려지는 벌레와 당근들이 정해진 viewport를 벗어나는 오류가 생겼다
    - (해결) : 랜덤한 값에 100이상(-> 0으로 기준을 잡지않은 이유: 너무 많이 퍼지지 않게하기위해서)
  - [error2] : 리플레이 버튼을 누르게되면 기존에 추가된 타겟에 추가가되어 보여지는 오류가 생겼다
    - (해결) : while반복문을 이용해 타겟박스의 자식요소가 없어질때까지(false) 첫번째 자식요소를 지우는 명령을 추가해 해결
  ```JavaScript
  //[error2 : 수정전]
      function rePlayGame() {
  gameStart = false;
  resetBox.classList.remove('show');
  resetBox.classList.add('hidden');
  onPlayGame();
  }
  ```
  ```JavaScript
  //[error2 : 수정후]
  function rePlayGame() {
  gameStart = false;
  while (targetBox.hasChildNodes()) {
    targetBox.removeChild(targetBox.firstChild);
  }
  resetBox.classList.remove('show');
  resetBox.classList.add('hidden');  
  onPlayGame();
  }
 ```

## 개선사항
  - 게임 플레이 시작시 일시정지 버튼으로 바뀌게 조정하기
  - 게임 리플레이시 타이머가 1초가아니라 더 빨리 줄어드는 사항 개선하기
  - 코드 리펙토링
  - 
## 게임만들기는 아직 진행중 --img~~ 😎
