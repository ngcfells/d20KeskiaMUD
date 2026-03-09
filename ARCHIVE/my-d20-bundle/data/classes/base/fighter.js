/**
 * PATH: bundles/my-d20-bundle/data/classes/base/fighter.js
 */
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'fighter',
    name: 'Fighter',
    description: 'A master of martial combat, skilled with all forms of weapons and armor.',
    hitDie: 10,
    skillPoints: 2, 
    
    classSkills: [
      'climb', 'craft', 'handle_animal', 'intimidate', 'jump', 'ride', 'swim'
    ],

    abilities: {
      1: [
        'armor_proficiency_heavy',
        'armor_proficiency_medium',
        'armor_proficiency_light',
        'shield_proficiency',
        'martial_weapon_proficiency',
        'simple_weapon_proficiency'
      ],
      3: ['armor_training'],
      5: ['weapon_training'],
      9: ['advanced_weapon_training'],
      13: ['advanced_weapon_training'],
      17: ['advanced_weapon_training']
    },

    bonusFeatLevels: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],

    setup: player => {
      Broadcast.sayAt(player, 'You have taken up the path of the Fighter.');
      player.setMeta('class', 'fighter');
      
      // Fighters start with a Base Attack Bonus of 1
      player.setMeta('baseAttackBonus', 1);
      
      // Initialize saving throw bonuses (Standard d20 Good/Poor progression)
      player.setMeta('base_fortitude', 2);
      player.setMeta('base_reflex', 0);
      player.setMeta('base_will', 0);

      player.setMeta('training_progress', {
        skills: {},     // e.g., { 'tumble': { exp: 450, goal: 1000 } }
        attributes: {}, // e.g., { 'strength': { exp: 50, goal: 5000 } }
        feats: { exp: 0, goal: 2500 }, // Global pool for earning "Bonus Feats"
        masteries: {}   // Progress toward Advanced Weapon Training groups
      });

      /**
       * WEAPON TRAINING INITIALIZATION
       * Required for the 50% weight discount in lib/d20/movement.js
       */
      if (!player.getMeta('classFeatures.weaponTraining')) {
        player.setMeta('classFeatures.weaponTraining', {
          groups: {},       // Key: Group ID (e.g., 'heavy_blades'), Value: Bonus (+1, +2)
          specialties: [],  // Used by Advanced Weapon Training hooks
          activeGroup: null
        });
      }

      /**
       * ARMOR TRAINING INITIALIZATION
       * Required for ACP reduction and speed preservation in lib/d20/movement.js
       */
      if (!player.getMeta('classFeatures.armorTraining')) {
        player.setMeta('classFeatures.armorTraining', {
          rank: 0,          // Increases every 4 levels starting at 3
          mediumSpeed: true, // Fighter Level 3+ ignores speed penalty for medium armor
          heavySpeed: false  // Fighter Level 7+ ignores speed penalty for heavy armor
        });
      }
    }
  };
};
