'use strict';

module.exports = {
  usage: 'translate <objectId>',
  command: state => (player, args) => {
    const objectId = args.trim();
    if (!objectId) return player.say('Translate what?');

    const library = state.LibraryManager;
    const obj = library.getObject(objectId);

    if (!obj) return player.say('You cannot find that text.');

    const languageId = obj.languageId || obj.language || null;
    const scriptId = obj.script || null;

    const baseDC =
      obj.tabletData?.translationDC ||
      (obj.datapadData?.encryptionLevel ? obj.datapadData.encryptionLevel * 5 : null) ||
      20;

    const result = state.SkillManager.executeSkillCheck(
      'linguistics',
      player,
      baseDC,
      languageId,
      scriptId
    );

    if (!result.success) {
      return player.say(`<red>You fail to translate ${obj.title}.</red>`);
    }

    library.markDeciphered(player, objectId, true);
    state.LanguageManager.gainExposure(player, languageId, 5);

    return player.say(`<green>You translate ${obj.title}.</green>`);
  }
};
