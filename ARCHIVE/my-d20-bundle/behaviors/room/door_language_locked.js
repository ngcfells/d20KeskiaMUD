'use strict';

module.exports = srcPath => {
  return {
    config: {
      languageId: 'elven'
    },
    listeners: {
      use: state => function (player, command) {
        const lm = state.LanguageManager;
        const langId = this.getMeta('languageId') || this.config.languageId;

        if (!lm || !lm.isFluent(player, langId)) {
          player.say('The runes on the door glow faintly, but you cannot speak the words of opening.');
          lm && lm.gainExposure(player, langId, 2);
          return false;
        }

        player.say('You speak the words of opening and the door unlocks.');
        if (this.open) this.open();
        return true;
      }
    }
  };
};
