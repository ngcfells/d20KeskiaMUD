'use strict';

module.exports = srcPath => {
  return {
    listeners: {
      talk: state => function (player) {
        const lm = state.LanguageManager;
        const lang = 'elven';

        if (!lm || !lm.isFluent(player, lang)) {
          player.say('The sage speaks in flowing Elven, but you cannot understand the words.');
          lm && lm.gainExposure(player, lang, 2);
          return;
        }

        player.say('<cyan>The sage greets you in flawless Elven and shares ancient lore.</cyan>');
        // Extend with your dialogue tree here
      }
    }
  };
};
