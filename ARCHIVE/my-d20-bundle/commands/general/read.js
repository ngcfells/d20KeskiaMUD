// path: ./bundles/my-d20-bundle/commands/general/read.js
'use strict';

module.exports = srcPath => {
  return {
    aliases: ['examine', 'peruse'],
    usage: 'read <objectId>',
    command: state => (player, args) => {
      const objectId = args.trim();
      if (!objectId) {
        return player.say('Read what?');
      }

      const library = state.LibraryManager;
      const obj = library.getObject(objectId);

      if (!obj) {
        return player.say('You see no such text.');
      }

      // Already deciphered
      if (library.isDeciphered(player, objectId)) {
        if (obj.languageId) {
          state.LanguageManager.gainExposure(player, obj.languageId, 1);
        }
        return player.say(`<cyan>You read:</cyan> ${obj.description || 'The text is readable.'}`);
      }

      const isMagical = obj.magical || ['spellbook','grimoire','scroll'].includes(obj.type);

      // 1. Check for Cryptic Text (Phantasm)
      if (obj.getMeta('isCryptic')) {
        const isCreator = obj.getMeta('crypticCreator') === player.uuid;
        const hasCrypticEffect = player.hasEffect('cryptic_writing_active');
        
        if (isCreator || hasCrypticEffect) {
          // Reveal the hidden originalText metadata
          const decrypted = obj.getMeta('originalText');
          return player.say(`<green>The swirling symbols resolve into your own secret script:</green>\n${decrypted}`);
        }
      
        // Per the source: even Read Magic and Comprehend Languages fail here.
        return player.say('<yellow>The page is covered in a dense, swirling mess of geometric symbols and nonsensical chicken-scratch that defies all attempts at translation.</yellow>');
      }
      
      // Magical text requires Read Magic
      if (isMagical) {
        if (player.hasEffect('read_magic')) {
          library.markDeciphered(player, objectId, true);
          return player.say(`<cyan>You read the magical script with Read Magic.</cyan>`);
        }

        return player.say('The magical script is indecipherable without Read Magic or study.');
      }

      // Non-magical → attempt Linguistics recognition
      if (obj.languageId) {
        state.LanguageManager.gainExposure(player, obj.languageId, 1);
      }

      return player.say('You cannot read this text yet. Try STUDY or TRANSLATE to decipher it.');
    }
  };
};
