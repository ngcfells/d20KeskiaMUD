'use strict';

module.exports = srcPath => {
  return {
    config: {
      languageId: 'first_tongue',
      solvedFlag: 'puzzle:first_tongue_obelisk'
    },
    listeners: {
      examine: state => function (player) {
        const lm = state.LanguageManager;
        const langId = this.config.languageId;

        if (!lm || !lm.isFluent(player, langId)) {
          player.say('The obelisk is covered in ancient glyphs you cannot read.');
          lm && lm.gainExposure(player, langId, 4);
          return;
        }

        player.say('<cyan>You read the inscription and understand the riddle it poses.</cyan>');
        player.setMeta(this.config.solvedFlag, true);
      }
    }
  };
};
