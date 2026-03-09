// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_proficiency_light.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "armor_proficiency_light",
  name: "Armor Proficiency (Light)",
  category: "combat",
  type: "feat",
  description: "You are proficient with light armor.",
  
  prerequisites: { level: 1 },
  stanceEffects: {
    base: { armorProficiency: ["light"] },
    aggressive: {},
    defensive: {},
    perceptive: {}
  },
  hooks: {}
};
