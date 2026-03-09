// bundles/my-d20-bundle/data/classes/npc/aristocrat.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'aristocrat',
    name: 'Aristocrat',
    description: 'A noble-born individual trained in etiquette, leadership, and diplomacy.',
    hitDie: 8,

    classSkills: [
      'appraise',
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'intimidate',
      'knowledge_history',
      'knowledge_local',
      'knowledge_nobility',
      'listen',
      'perform',
      'profession',
      'ride',
      'sense_motive',
      'spot'
    ],

    abilities: {
      1: ['noble_presence'],
      3: ['courtly_grace'],
      5: ['wealthy_connections'],
      7: ['influence'],
      10: ['noble_command']
    },

    setup: player => {
      Broadcast.sayAt(player, 'You assume the mantle of the Aristocrat.');
      player.setMeta('class', 'aristocrat');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
