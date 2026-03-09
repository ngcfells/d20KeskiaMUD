// bundles/my-d20-bundle/data/classes/base/rogue.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'rogue',
    name: 'Rogue',
    description: 'A master of stealth, trickery, and precision, capable of finding and disarming the most deadly traps.',
    hitDie: 6,
    skillPoints: 8, // D20 Standard: 8 + Int mod
    
    classSkills: [
      'appraise', 'balance', 'bluff', 'climb', 'disable_device', 
      'disguise', 'escape_artist', 'forgery', 'gather_information', 
      'hide', 'intimidate', 'jump', 'listen', 'move_silently', 
      'open_lock', 'search', 'sense_motive', 'sleight_of_hand', 
      'spot', 'swim', 'tumble', 'use_magic_device'
    ],

    abilities: {
      1: [
        'sneak_attack_1d6',
        'trapfinding',
        'simple_weapon_proficiency',
        'armor_proficiency_light'
      ]
    },

    setup: player => {
      Broadcast.sayAt(player, 'You have stepped into the shadows as a Rogue.');
      player.setMeta('class', 'rogue');
      
      // Rogues start with a Base Attack Bonus of 0
      player.setMeta('baseAttackBonus', 0);
      
      // Initialize saving throw bonuses
      player.setMeta('base_fortitude', 0);
      player.setMeta('base_reflex', 2);
      player.setMeta('base_will', 0);
      player.setMeta('training_progress', {
        skills: {},     // e.g., { 'tumble': { exp: 450, goal: 1000 } }
        attributes: {}, // e.g., { 'strength': { exp: 50, goal: 5000 } }
        feats: { exp: 0, goal: 2500 }, // Global pool for earning "Bonus Feats"
        masteries: {}   // Progress toward Advanced Weapon Training groups
      });
    }
  };
};
