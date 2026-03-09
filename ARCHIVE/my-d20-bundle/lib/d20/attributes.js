// path: /my-d20-bundle/lib/d20/attributes.js
'use strict';

module.exports = [
  //
  // CORE VITALS
  //
  {
    name: 'health',
    base: 0,
    formula: {
      requires: ['constitution'],
      fn: function (character, base) {
        const conScore = character.getAttribute('constitution') || 10;
        const conMod = Math.floor((conScore - 10) / 2);

        // For now: simple, bundle-wide hit die. You can later branch on class/race/metadata.
        const hitDie = 8;

        // Level 1: max hit die + Con mod
        return hitDie + conMod;
      },
    },
  },

  { name: 'powerPoints', base: 0 },
  { name: 'sanity', base: 100 },
  { name: 'stamina', base: 10 },
  { name: 'resolve', base: 5 },

  // CORE 7
  { name: 'strength', base: 0 },
  { name: 'dexterity', base: 0 },
  { name: 'constitution', base: 0 },
  { name: 'intelligence', base: 0 },
  { name: 'wisdom', base: 0 },
  { name: 'charisma', base: 0 },
  { name: 'appearance', base: 0 },

  // SAVES
  { name: 'fortitude', base: 0 },
  { name: 'reflex', base: 0 },
  { name: 'will', base: 0 },

  // ARMOR
  { name: 'armorKinetic', base: 0 },
  { name: 'armorBallistic', base: 0 },
  { name: 'armorEnergy', base: 0 },
  { name: 'naturalArmor', base: 0 },
  { name: 'damageReduction', base: 0 },
  { name: 'shielding', base: 0 },

  // GENRE
  { name: 'tech', base: 0 },
  { name: 'pilot', base: 0 },
  { name: 'cyberTolerance', base: 0 },
  { name: 'radiationResist', base: 0 },
  { name: 'grit', base: 0 },
  { name: 'quickdraw', base: 0 },
  { name: 'luck', base: 0 },
  { name: 'reputation', base: 0 },
  { name: 'forcePoints', base: 0 },
  { name: 'destinyPoints', base: 0 },
  { name: 'corruption', base: 0 },

  // LEGACY
  { name: 'critical', base: 0 },

  // SPEED
  {
    name: 'speed',
    base: 30,
    formula: {
      requires: ['dexterity'],
      fn: function (character, base) {
        const race = character.getMeta('race');
        const baseSpeed = ['halfling', 'gnome'].includes(race) ? 20 : 30;
        return baseSpeed;
      },
    },
  },
];
