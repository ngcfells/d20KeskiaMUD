'use strict';

module.exports = srcPath => {
  return {
    usage: 'languages',
    command: state => (player, args) => {
      const lm = state.LanguageManager;
      if (!lm) return player.say('Languages are not configured.');

      player.say('<cyan>Your known languages:</cyan>');

      for (const lang of lm.getAllLanguages()) {
        const prog = lm.getProgress(player, lang.id);
        const status = prog.fluent ? 'fluent' : `${prog.progress | 0}%`;
        player.say(`• ${lang.name} (${status})`);
      }
    }
  };
};
