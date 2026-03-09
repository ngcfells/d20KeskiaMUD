'use strict';

module.exports = {
  usage: 'scribe <spellId> into <spellbookId>',
  command: state => (player, args) => {
    const parts = args.split(' ').filter(Boolean);
    const intoIndex = parts.indexOf('into');

    if (intoIndex === -1) {
      return player.say('Usage: scribe <spellId> into <spellbookId>');
    }

    const spellId = parts[0];
    const spellbookId = parts[intoIndex + 1];

    const library = state.LibraryManager;
    const obj = library.getObject(spellbookId);

    if (!obj || obj.type !== 'spellbook') {
      return player.say('That is not a spellbook.');
    }

    // Must be deciphered
    if (!library.isDeciphered(player, spellbookId)) {
      return player.say('You cannot scribe into a spellbook you cannot read.');
    }

    const spell = state.SpellManager.get(spellId);
    if (!spell) {
      return player.say('No such spell exists.');
    }

    const level = spell.level || 0;

    // Blessed Book bypasses material cost
    if (!obj.spellbookData.isBlessedBook) {
      const cost = 25 * level; // RAW: 25 gp per spell level
      if (!player.hasGold(cost)) {
        return player.say(`You need ${cost} gp worth of inks and materials.`);
      }
      player.spendGold(cost);
    }

    const success = state.SpellbookSystem.scribeSpellIntoSpellbook(obj, spellId, level);

    if (!success) {
      return player.say('There is not enough space in the spellbook.');
    }

    return player.say(`<green>You scribe ${spellId} into ${obj.title}.</green>`);
  }
};
