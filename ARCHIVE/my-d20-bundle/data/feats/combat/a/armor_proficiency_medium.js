// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_proficiency_medium.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "armor_proficiency_medium",
  name: "Armor Proficiency (Medium)",
  category: "combat",
  type: "feat",
  description: "You are proficient with medium armor.",
  
  prerequisites: { feats: ["armor_proficiency_light"], bab: 1 },
  stanceEffects: {
    base: { armorProficiency: ["medium"] },
    aggressive: {},
    defensive: {},
    perceptive: {}
  },
  hooks: {}
};
