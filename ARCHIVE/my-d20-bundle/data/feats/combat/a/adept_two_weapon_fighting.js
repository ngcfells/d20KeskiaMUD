// Source: Player's Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/feats/combat/a/adept_two_weapon_fighting.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adept_two_weapon_fighting",
  name: "Adept Two-Weapon Fighting",
  category: "combat",
  type: "feat",
  description: "You are skilled at fighting with two weapons, reducing penalties and improving accuracy.",
  prerequisites: {
    baseAttackBonus: 6,
    abilityScores: { dexterity: 17 },
    skills: { },
    feats: [ "two_weapon_fighting" ],
    classFeatures: [],
    race: null,
    alignment: null
  },
  stanceEffects: {
    base: {
      twoWeaponPenaltyReduction: 1
    },
    aggressive: {
      attackBonus: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
