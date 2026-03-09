// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_proficiency_heavy.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "armor_proficiency_heavy",
  name: "Armor Proficiency (Heavy)",
  category: "combat",
  type: "feat",
  description: "You are proficient with heavy armor.",
  
  prerequisites: { feats: ["armor_proficiency_medium"], bab: 1 },
  stanceEffects: {
    base: { armorProficiency: ["heavy"] },
    aggressive: {},
    defensive: {},
    perceptive: {}
  },
  hooks: {}
};
