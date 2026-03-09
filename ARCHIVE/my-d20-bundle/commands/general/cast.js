/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/cast.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');

module.exports = {
  usage: 'cast <spell> <target> [from <item>]',
  command: state => (args, player) => {

    const parts = args.split(' ').filter(Boolean);
    if (!parts.length) return player.say('Cast what?');

    const spellId = parts[0];
    const fromIndex = parts.indexOf('from');

    const targetName = fromIndex !== -1
      ? parts.slice(1, fromIndex).join(' ')
      : parts[1];

    if (!targetName) return player.say('Cast it on who?');

    const target = getTarget(state, player, targetName);
    if (!target) return player.say('They are not here.');

    // CASTING FROM TEXT
    if (fromIndex !== -1) {
      const objectId = parts[fromIndex + 1];

      const item = player.inventory && player.inventory.find(i => i.id === objectId);
      if (!item) return player.say('You do not possess such a magical text.');

      const library = state.LibraryManager;
      const obj = library.getObject(objectId);

      if (!obj) return player.say('This text is not registered in the library system.');

      if (!library.isDeciphered(player, objectId)) {
        return player.say('You cannot cast from a text you cannot read.');
      }

      if (obj.type === 'scroll') {
        return state.ScrollSystem.castFromScroll(state, player, obj, spellId, target);
      }

      if (obj.type === 'spellbook') {
        return state.SpellbookSystem.castFromSpellbook(state, player, obj, spellId, target);
      }

      return player.say('You cannot cast spells from that object.');
    }

    // NORMAL CASTING
    const spell = state.SpellManager.get(spellId);
    if (!spell) return player.say('You do not know that spell.');

    const { castSpell } = require('../../lib/combat/spellcasting');
    return castSpell(state, player, target, spell);
  }
};
