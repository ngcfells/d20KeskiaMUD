// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_weapon_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_weapon_mastery",
  name: "Airborne Weapon Mastery",
  category: "combat",
  type: "feat",
  description: "You have mastered weapon use while airborne, granting passive bonuses to aerial accuracy and damage.",

  stanceEffects: {
    base: {
      attackBonusAerial: 1
    },
    aggressive: {
      damageBonusAerial: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
