'use strict';

module.exports = {
  // CORE TYPES
  KINETIC: 'kinetic',         // Maps to ArmorKinetic
  BALLISTIC: 'ballistic',     // Maps to ArmorBallistic
  ENERGY: 'energy',           // Maps to ArmorEnergy
  
  // ELEMENTAL / MAGICAL
  FIRE: 'fire',
  COLD: 'cold',
  ELECTRICITY: 'electricity',
  ACID: 'acid',
  SONIC: 'sonic',
  FORCE: 'force',
  MIND: 'mind',
  RADIATION: 'radiation',

  // SUBTYPES (For DR/Cold Iron, DR/Bludgeoning, etc.)
  SUBTYPES: {
    SLASHING: 'slashing',
    PIERCING: 'piercing',
    BLUDGEONING: 'bludgeoning',
    ADAMANTINE: 'adamantine',
    COLD_IRON: 'cold_iron',
    SILVER: 'silver',
    GOOD: 'good',
    EVIL: 'evil',
    LAW: 'law',
    CHAOS: 'chaos'
  }
};
