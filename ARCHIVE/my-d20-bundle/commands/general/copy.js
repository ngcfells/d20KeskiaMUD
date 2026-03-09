/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/copy.js
 * PURPOSE: Fill me out.
 */

'use strict';

module.exports = {
  usage: 'copy <sourceId> into <targetId>',
  command: state => (player, args) => {
    const parts = args.split(' ').filter(Boolean);
    const intoIndex = parts.indexOf('into');

    if (intoIndex === -1) {
      return player.say('Usage: copy <sourceId> into <targetId>');
    }

    const sourceId = parts[0];
    const targetId = parts[intoIndex + 1];

    const library = state.LibraryManager;
    const source = library.getObject(sourceId);
    const target = library.getObject(targetId);

    if (!source || !target) {
      return player.say('You cannot find one of the texts.');
    }

    // Must be deciphered
    if (!library.isDeciphered(player, sourceId)) {
      return player.say('You cannot copy from a text you cannot read.');
    }

    // Spellbook → Spellbook copying
    if (source.type === 'spellbook' && target.type === 'spellbook') {
      const spells = source.spellbookData.spells || [];
      if (spells.length === 0) {
        return player.say('The source spellbook contains no spells.');
      }

      for (const entry of spells) {
        const spell = state.SpellManager.get(entry.id);
        if (!spell) continue;

        const success = state.SpellbookSystem.scribeSpellIntoSpellbook(
          target,
          entry.id,
          spell.level
        );

        if (!success) {
          player.say(`Not enough space to copy ${entry.id}.`);
        } else {
          player.say(`You copy ${entry.id} into ${target.title}.`);
        }
      }

      return;
    }

    // Scroll → Spellbook copying
    if (source.type === 'scroll' && target.type === 'spellbook') {
      const spells = source.scrollData.spells || source.spells || [];
      for (const spellId of spells) {
        const spell = state.SpellManager.get(spellId);
        if (!spell) continue;

        const success = state.SpellbookSystem.scribeSpellIntoSpellbook(
          target,
          spellId,
          spell.level
        );

        if (!success) {
          player.say(`Not enough space to copy ${spellId}.`);
        } else {
          player.say(`You copy ${spellId} into ${target.title}.`);
        }
      }
      return;
    }

    // Lore copying (book → journal, tablet → journal, etc.)
    if (source.containsLore && target.type === 'journal') {
      const topics = source.loreTopics || [];
      target.journalData = target.journalData || {};
      target.journalData.entries = target.journalData.entries || [];

      for (const topic of topics) {
        target.journalData.entries.push(topic);
      }

      return player.say(`You copy lore from ${source.title} into your journal.`);
    }

    return player.say('You cannot copy between those objects.');
  }
};
