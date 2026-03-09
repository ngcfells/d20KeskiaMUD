// bundles/my-d20-bundle/data/classes/base/bard.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const bardSpellList = require('../../spelllists/bard');

  return {
    id: 'bard',
    name: 'Bard',
    description: 'A performer and jack-of-all-trades who weaves magic through music and lore.',
    hitDie: 6,
    classSkills: [
      'balance',
      'bluff',
      'climb',
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'disguise',
      'escape_artist',
      'gather_information',
      'hide',
      'jump',
      'knowledge_arcana',
      'knowledge_history',
      'knowledge_local',
      'knowledge_nobility',
      'listen',
      'move_silently',
      'perform',
      'profession',
      'sense_motive',
      'sleight_of_hand',
      'spellcraft',
      'swim',
      'tumble',
      'use_magic_device'
    ],
    abilities: {
      1: ['bardic_music', 'bardic_knowledge', 'countersong', 'fascinate', 'inspire_courage_1'],
      3: ['inspire_competence'],
      6: ['suggestion'],
      9: ['inspire_greatness'],
      12: ['song_of_freedom'],
      15: ['inspire_heroics'],
      18: ['mass_suggestion']
    },
    spellcasting: {
      mode: 'spontaneous',
      ability: 'charisma',
      spellSlots: {
        1:  { 0: 2, 1: 0 },
        2:  { 0: 3, 1: 1 },
        3:  { 0: 3, 1: 2 },
        4:  { 0: 3, 1: 3, 2: 0 },
        5:  { 0: 3, 1: 3, 2: 1 },
        6:  { 0: 3, 1: 3, 2: 2 },
        7:  { 0: 3, 1: 3, 2: 3, 3: 0 },
        8:  { 0: 3, 1: 3, 2: 3, 3: 1 },
        9:  { 0: 3, 1: 3, 2: 3, 3: 2 },
        10: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 0 },
        11: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 1 },
        12: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 2 },
        13: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 0 },
        14: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 1 },
        15: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 },
        16: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        17: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        18: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        19: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        20: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 }
      },
      spellList: bardSpellList
    },
    setup: player => {
      Broadcast.sayAt(player, 'You take up the path of the Bard.');
      player.setMeta('class', 'bard');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('knownSpells')) {
        player.setMeta('knownSpells', {});
      }

      if (!player.getMeta('bardic_music')) {
        player.setMeta('bardic_music', {
          roundsPerDay: 0,
          usedRounds: 0
        });
      }
    }
  };
};
