// bundles/my-d20-bundle/data/classes/psionic/soulknife.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'soulknife',
    name: 'Soulknife',
    description: 'A warrior who shapes raw psychic energy into a deadly mind blade.',
    hitDie: 10,

    classSkills: [
      'autohypnosis',
      'climb',
      'concentration',
      'craft',
      'jump',
      'knowledge_psionics',
      'profession',
      'psicraft',
      'ride',
      'swim'
    ],

    abilities: {
      1: ['mind_blade', 'weapon_focus_mind_blade'],
      2: ['blade_skill_1', 'throw_mind_blade'],
      3: ['psychic_strike_1d8'],
      4: ['blade_skill_2', 'mind_blade_enhancement_1'],
      5: ['free_draw', 'shape_mind_blade'],
      6: ['blade_skill_3', 'mind_blade_enhancement_2'],
      7: ['psychic_strike_2d8'],
      8: ['blade_skill_4', 'mind_blade_enhancement_3'],
      9: ['greater_weapon_focus_mind_blade'],
      10: ['blade_skill_5', 'mind_blade_enhancement_4'],
      11: ['psychic_strike_3d8'],
      12: ['blade_skill_6', 'mind_blade_enhancement_5'],
      13: ['knife_to_the_soul'],
      14: ['blade_skill_7', 'mind_blade_enhancement_6'],
      15: ['psychic_strike_4d8'],
      20: ['mind_blade_mastery']
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your will shapes the Mind Blade — you are a Soulknife.');
      player.setMeta('class', 'soulknife');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
