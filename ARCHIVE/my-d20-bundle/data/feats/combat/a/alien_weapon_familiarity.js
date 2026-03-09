// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Star Wars Saga Edition (Wizards of the Coast), d20 Future (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alien_weapon_familiarity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alien_weapon_familiarity",
  name: "Alien Weapon Familiarity",
  category: "combat",
  type: "feat",
  description: "You are familiar with exotic or alien weaponry, granting passive bonuses to accuracy and handling.",

  stanceEffects: {
    base: {
      exoticWeaponBonus: 1
    },
    aggressive: {
      exoticWeaponBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
