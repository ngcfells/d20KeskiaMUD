// path: bundles/my-d20-bundle/data/materials/spark_of_ooze.js
'use strict';

/**
 * Material Component: Spark of Ooze
 * Source: Spell Compendium / Dread Codex (Alchemy/Ooze Spells)
 * Usage: Common reagent for Ooze and Acid-based Transmutations.
 */
module.exports = {
  id: 'spark_of_ooze',
  name: 'Spark of Ooze',
  baseType: 'reagent',
  typicalValues: [5, 10], // gp value based on rarity of the donor ooze
  metadata: {
    description: 'A small, quivering bit of gelatinous matter, still pulsing with a faint, acidic hunger.',
    rarity: 'uncommon',
    weight: 0.1,
    isStackable: true,
    maxStack: 20,
    tags: ['reagent', 'transmutation_component', 'ooze', 'acid']
  }
};
