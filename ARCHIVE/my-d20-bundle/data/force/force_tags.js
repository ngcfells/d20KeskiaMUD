'use strict';

/**
 * Force Power Alignment & Subsets
 * Path: ./bundles/my-d20-bundle/data/force/force_tags.js
 */
module.exports = {
  dark_side: [
    'dark_rage', 'force_grip', 'force_lightning', 'force_scream', 'fear',
    'horror', 'insanity', 'choke', 'wound', 'death_field', 'drain_life',
    'force_crush', 'force_destruction', 'transfer_essence'
  ],
  universal: [
    'burst_of_speed', 'force_jump', 'force_push', 'force_sense', 'mind_trick',
    'move_object', 'farseeing', 'telekinesis', 'force_shield'
  ],
  path_affinities: {
    rage_channeler: ['dark_rage', 'force_scream', 'burning_fury', 'force_destruction'],
    shadow_initiate: ['force_cloak', 'mind_trick', 'force_sight', 'mind_shard'],
    cultist: ['dark_side_scourge', 'transfer_essence', 'drain_energy', 'force_militia'],
    fallen_mystic: ['battle_meditation', 'shatterpoint', 'sever_force', 'force_dispel']
  }
};
