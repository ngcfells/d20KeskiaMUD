// path: d20Ranveir/bundles/my-d20-bundle/commands/general/indexing.js
'use strict';

module.exports = {
  usage: 'index <objectId>',
  command: state => (player, args) => {
    const objectId = args.trim();
    if (!objectId) return player.say('Index what?');

    const library = state.LibraryManager;
    const obj = library.getObject(objectId);

    if (!obj) return player.say('You cannot find that text.');

    // Must be deciphered
    if (!library.isDeciphered(player, objectId)) {
      return player.say('You cannot index a text you cannot read.');
    }

    // Spellbook index
    if (obj.type === 'spellbook') {
      const sb = obj.spellbookData;
      player.say(`<cyan>${obj.title} — Spell Index</cyan>`);
      for (const entry of sb.spells) {
        player.say(`• ${entry.id} (${entry.pages} pages)`);
      }
      return;
    }

    // Archive index
    if (obj.type === 'archive') {
      const a = obj.archiveData;
      player.say(`<cyan>${obj.title} — Archive Index</cyan>`);
      player.say(`Volumes: ${a.volumeCount}`);
      for (const topic of a.indexTopics) {
        player.say(`• ${topic}`);
      }
      return;
    }

    // Encyclopedia index
    if (obj.type === 'encyclopedia') {
      const e = obj.encyclopediaData;
      player.say(`<cyan>${obj.title} — Encyclopedia Index</cyan>`);
      for (const ref of e.crossReferences) {
        player.say(`• ${ref}`);
      }
      return;
    }

    return player.say('This text has no indexable structure.');
  }
};
