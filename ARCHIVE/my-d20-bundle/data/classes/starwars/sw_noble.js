// bundles/my-d20-bundle/lib/classes/starwars/sw_noble.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_noble',
    name: 'Noble (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A charismatic leader skilled in diplomacy, influence, negotiation, and commanding allies across the galaxy.',

    hitDie: 6,

    classSkills: [
      'appraise',
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'intimidate',
      'knowledge_galactic',
      'knowledge_nobility',
      'linguistics',
      'perception',
      'perform',
      'profession',
      'sense_motive',
      'use_magic_device'
    ],

    abilities: {
      1: ['influence_1', 'noble_path_feature_1'],
      2: ['wealth_1'],
      3: ['command_1'],
      4: ['influence_2'],
      5: ['noble_path_feature_2'],
      6: ['leadership_1'],
      7: ['command_2'],
      8: ['influence_3'],
      9: ['noble_path_feature_3'],
      10: ['wealth_2'],
      11: ['command_3'],
      12: ['influence_4'],
      13: ['noble_path_feature_4'],
      14: ['leadership_2'],
      15: ['command_4'],
      16: ['influence_5'],
      17: ['noble_path_feature_5'],
      18: ['wealth_3'],
      19: ['command_5'],
      20: ['perfect_noble']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      diplomat: {
        id: 'diplomat',
        name: 'Diplomat Path',
        description: 'Masters of negotiation, treaties, and peaceful resolution.'
      },
      aristocrat: {
        id: 'aristocrat',
        name: 'Aristocrat Path',
        description: 'High‑born nobles with influence, wealth, and political leverage.'
      },
      commander: {
        id: 'commander',
        name: 'Commander Path',
        description: 'Battlefield leaders who inspire allies and coordinate tactics.'
      },
      underworld_broker: {
        id: 'underworld_broker',
        name: 'Underworld Broker Path',
        description: 'Deal‑makers who navigate criminal networks and illicit markets.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You rise to prominence as a Noble of the galaxy.');
      player.setMeta('class', 'sw_noble');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('noble_path')) {
        player.setMeta('noble_path', null);
      }

      // Influence bonuses
      if (!player.getMeta('influence')) {
        player.setMeta('influence', {
          bonus: 0
        });
      }

      // Wealth system
      if (!player.getMeta('wealth')) {
        player.setMeta('wealth', {
          tier: 1,
          credits: 0
        });
      }

      // Command bonuses
      if (!player.getMeta('command')) {
        player.setMeta('command', {
          bonus: 0
        });
      }

      // Leadership bonuses
      if (!player.getMeta('leadership')) {
        player.setMeta('leadership', {
          followers: 0,
          morale: 0
        });
      }
    }
  };
};
