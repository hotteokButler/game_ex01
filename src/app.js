'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

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
      case Reason.win:
        message = 'You Won!👏👏👏';
        sound.playWin();
        break;
      case Reason.lose:
        message = 'You Lost!💩💩💩';
        sound.playBug();
        break;
      case Reason.cancel:
        message = 'REPLAY?😲';
        sound.playAlert();

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
