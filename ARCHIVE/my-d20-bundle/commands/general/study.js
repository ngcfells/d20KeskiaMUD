'use strict';

module.exports = {
  usage: 'study <objectId>',
  command: state => (player, args) => {
    const objectId = args.trim();
    if (!objectId) {
      return player.say('Study what?');
    }

    const library = state.LibraryManager;
    const obj = library.getObject(objectId);

    if (!obj) {
      return player.say('You cannot find that text.');
    }

    if (library.isDeciphered(player, objectId)) {
      return player.say('You have already deciphered this text.');
    }

    const isMagical = obj.magical || ['spellbook','grimoire','scroll'].includes(obj.type);

    const options = {
      forCasting: isMagical,
      difficulty: isMagical ? null : 'ancient'
    };

    const success = library.attemptDecipher(player, objectId, options);

    if (success) {
      return player.say(`<green>You make progress studying ${obj.title}.</green>`);
    } else {
      return player.say(`<red>You fail to make progress studying ${obj.title}.</red>`);
    }
  }
};
