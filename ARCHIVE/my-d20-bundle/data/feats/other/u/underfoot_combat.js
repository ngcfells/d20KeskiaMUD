
'use strict';

module.exports = {
  id: 'underfoot_combat',
  name: 'Underfoot Combat',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Races of the Wild, Wizards of the Coast
// Additional Sources: Advanced Player's Guide (Paizo), d20 Modern (Wizards of the Coast) 

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/u/underfoot_combat.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "underfoot_combat",
    name: "Underfoot Combat",
    description: "Move through larger enemies' spaces and gain cover while inside them.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 1,
        abilityScores: { dexterity: 13 },
        skills: { acrobatics: 5 },
        feats: [],
        classFeatures: [],
        race: ["halfling", "gnome"],
        alignment: null
    },
    stanceEffects: {
      base: {
        canOccupyEnemySpace: true,
        minSizeDifference: 2,
        acCoverBonus: 4
      },
      aggressive: {
        sneakAttackBonus: 1, // Flanking from "below"
        acCoverBonus: 2      // Lower defense to focus on vitals
      },
      defensive: {
        acCoverBonus: 6,
        noAoOOnExit: true    // Extra safety when leaving an enemy space
      },
      perceptive: {
        evasionBonus: 2,     // Harder to hit with area effects while underfoot
        ignoreDifficultTerrain: true
      }
    },
    hooks: {
      onMove(player, state) {
        if (state.enteringEnemySpace && state.enemySize >= player.size + 2) {
          state.cancelAoO();
        }
      },
      onDefense(attacker, defender, state) {
        if (defender.isInsideOccupiedSpace(attacker)) {
          state.addBonus("ac", 4);
        }
      }
    }
};
