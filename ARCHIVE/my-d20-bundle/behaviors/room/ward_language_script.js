'use strict';

module.exports = srcPath => {
  return {
    config: {
      languageId: 'celestial'
    },
    listeners: {
      attemptDispel: state => function (player) {
        const lm = state.LanguageManager;
        const langId = this.config.languageId;

        if (!lm || !lm.isFluent(player, langId)) {
          player.say('The ward’s script is incomprehensible; you cannot find the anchor glyphs.');
          lm && lm.gainExposure(player, langId, 3);
          return false;
        }

        player.say('You read the ward’s script and identify the anchor glyphs.');
        return true;
      }
    }
  };
};
