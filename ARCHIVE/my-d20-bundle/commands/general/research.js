'use strict';

module.exports = {
  usage: 'research <objectId>',
  command: state => (player, args) => {
    const objectId = args.trim();
    if (!objectId) return player.say('Research what?');

    const library = state.LibraryManager;
    const obj = library.getObject(objectId);

    if (!obj) return player.say('You cannot find that text.');

    const languageId = obj.languageId || obj.language || null;
    const scriptId = obj.script || null;

    const dc = 15 + (obj.rarity === 'rare' ? 5 : 0);

    const result = state.SkillManager.executeSkillCheck(
      'linguistics',
      player,
      dc,
      languageId,
      scriptId
    );

    if (!result.success) {
      return player.say(`<red>Your research yields no new insights.</red>`);
    }

    library.markDeciphered(player, objectId, true);

    player.addEffect('research_insight', {
      duration: 600,
      bonuses: { intelligence: 1 }
    });

    state.LanguageManager.gainExposure(player, languageId, 10);

    return player.say(`<green>You uncover new insights from ${obj.title}.</green>`);
  }
};
