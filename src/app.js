'use strict';

import PopUp from './popup.js';
import Game from './game.js';
import GameBuilder from './game.js';

(function () {
  const gameFinishBanner = new PopUp();
  const game = new GameBuilder()
    .gameDuration(18) //
    .carrotCount(15) //
    .bugCount(15) //
    .build();

  game.setGameStopListner((reason) => {
    let message;

    switch (reason) {
      case 'win':
        message = 'You Won!👏👏👏';
        break;
      case 'lose':
        message = 'You Lost!💩💩💩';
        break;
      case 'cancel':
        message = 'REPLAY?😲';
        break;
      default:
        throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
  });

  gameFinishBanner.setClickListener(() => {
    game.start();
    game.showGameButton();
  });
})();
