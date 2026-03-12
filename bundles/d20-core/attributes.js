'use strict';

/**
 * d20-core: Canonical Attribute Schema
 * No formulas here; those live in listeners/derived.js.
 */

module.exports = [
  // --- CORE 7 ATTRIBUTES ---
  { name: 'strength', base: 10 },
  { name: 'dexterity', base: 10 },
  { name: 'constitution', base: 10 },
  { name: 'intelligence', base: 10 },
  { name: 'wisdom', base: 10 },
  { name: 'charisma', base: 10 },
  { name: 'appearance', base: 10 },

  // --- CORE VITALS ---
  { name: 'health', base: 0 },
  { name: 'stamina', base: 10 },
  { name: 'sanity', base: 100 },

  // --- DERIVED SAVES ---
  { name: 'fortitude', base: 0 },
  { name: 'reflex', base: 0 },
  { name: 'will', base: 0 },

  // --- MOVEMENT & SCALE ---
  { name: 'speed', base: 30 },

  // --- POOLS & LIMITERS ---
  { name: 'cyberTolerance', base: 0 },
  { name: 'cohesion', base: 0 },
  { name: 'resolve', base: 0 },

  // --- DEFENSES ---
  { name: 'armorKinetic', base: 0 },
  { name: 'armorBallistic', base: 0 },
  { name: 'armorEnergy', base: 0 },
  { name: 'naturalArmor', base: 0 },
  { name: 'damageReduction', base: 0 },
  { name: 'shielding', base: 0 },

  // --- GENRE SPECIFIC ---
  { name: 'powerPoints', base: 0 },
  { name: 'tech', base: 0 },
  { name: 'radiationResist', base: 0 },
  { name: 'grit', base: 0 },
  { name: 'luck', base: 0 },
  { name: 'reputation', base: 0 },
  { name: 'forcePoints', base: 0 },
  { name: 'destinyPoints', base: 0 },
  { name: 'corruption', base: 0 },

  // --- ENGINE / SYSTEM ATTRIBUTES ---
  { name: 'massiveDamageThreshold', base: 0 },
  { name: 'carryCapacity', base: 0 },
  { name: 'wealth', base: 0 },
  { name: 'liquidity', base: 0 },

  // --- LEGACY ---
  { name: 'critical', base: 0 },
];
