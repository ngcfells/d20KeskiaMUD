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
        const hitDie = 8;
        return hitDie + conMod;
      },
    },
  },
  // CORE 7 Attributes
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
  // Horror / Cthulhu
  { name: 'sanity', base: 100 },

  // ARMOR
  { name: 'armorKinetic', base: 0 },
  { name: 'armorBallistic', base: 0 },
  { name: 'armorEnergy', base: 0 },
  { name: 'naturalArmor', base: 0 },
  { name: 'damageReduction', base: 0 },
  { name: 'shielding', base: 0 },

  //Psionics
  { name: 'powerPoints', base: 0 },
  // Mechanic to prevent spamming
  { name: 'stamina', base: 10 },
  // Used to fuel special abilities. HD/2 + Main attribute bonus (primary class)
  { name: 'resolve', base: 0 },

  // GENRE
  { name: 'tech', base: 0 },
  { name: 'pilot', base: 0 },
  // Cyberpunk - 1 + CON mod, minimum is 0. Used for any graft/implant be they mechanical, steampunk, cyberpunk, magical, or psionic. Represnts the physical limitation.
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
