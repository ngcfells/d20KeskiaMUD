/**
 * PATH: bundles/my-d20-bundle/data/classes/base/monk.js
 */
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'monk',
    name: 'Monk',
    description: 'A martial artist who harnesses inner energy to achieve physical perfection.',
    hitDie: 8,
    skillPoints: 4,
    
    // Monk Alignment Restriction
    alignmentRequirement: ['lawful_good', 'lawful_neutral', 'lawful_evil'],

    classSkills: [
      'balance', 'climb', 'concentration', 'craft', 'diplomacy', 
      'escape_artist', 'hide', 'jump', 'knowledge_religion', 
      'listen', 'move_silently', 'perform', 'profession', 
      'sense_motive', 'spot', 'swim', 'tumble'
    ],

    abilities: {
      1: [
        'improved_unarmed_strike',
        'stunning_fist',
        'flurry_of_blows',
        'evasion'
      ]
    },

    setup: player => {
      Broadcast.sayAt(player, 'You have found focus. You are now a Monk.');
      player.setMeta('class', 'monk');
      player.setMeta('baseAttackBonus', 0);
      player.setMeta('base_fortitude', 2);
      player.setMeta('base_reflex', 2);
      player.setMeta('base_will', 2);
      player.setMeta('training_progress', {
        skills: {},     // e.g., { 'tumble': { exp: 450, goal: 1000 } }
        attributes: {}, // e.g., { 'strength': { exp: 50, goal: 5000 } }
        feats: { exp: 0, goal: 2500 }, // Global pool for earning "Bonus Feats"
        masteries: {}   // Progress toward Advanced Weapon Training groups
      });
    }
  };
};
