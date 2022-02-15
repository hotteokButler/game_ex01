# 게임만들기 예제 🥕🐞

**practice exmaple project for internet lecture from DreamCoding
All source of copyrights are followed in DreamCoding.**

## 게임기능
  - 시간내에 랜덤으로 뿌려진 당근을 찾아 click!하세요!
  - 벌레를 클릭하게되면 'You lost!'

## 구현
  - only HTML CSS Vanilla.JS
  - git hub commit message 작성법 공부 

## 진행중

## 중간 메모
  - git hub commit message 작성법을 공부하며 적용중인데 제대로 되는건지 모르겠다
  - [error1] : 플레이 버튼 클릭시 랜덤하게 뿌려지는 벌레와 당근들이 정해진 viewprot를 벗어나는 오류가 생겼다
    - (해결) : 랜덤한 값에 100이상(-> 0으로 기준을 잡지않은 이유: 너무 많이 퍼지지 않게하기위해서)
  - [error2] : 리플레이 버튼을 누르게되면 기존에 추가된 타겟에 추가가되어 보여지는 오류가 생겼다
    - (해결) : while반복문을 이용해 타겟박스의 자식요소가 없어질때까지(false) 첫번째 자식요소를 지우는 명령을 추가해 해결
## 게임만들기는 아직 진행중 --img~~ 😎
