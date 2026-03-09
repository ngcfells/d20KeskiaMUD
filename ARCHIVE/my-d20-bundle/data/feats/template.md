// Source: <Primary Book>, <Primary Publisher>
// Additional Sources: <Book 2> (<Publisher>), <Book 3> (<Publisher>)

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/feats/<category>/<letter>/<feat_id_in_snake_case>.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "feat_id_in_snake_case",
  name: "Feat Name",
  category: "combat", // or craft/epic/faith/general/heritage/magic/movement/other/psionic/teamwork/tech
  type: "feat",

  description: "Short passive description.",

  prerequisites: {
    baseAttackBonus: null,
    abilityScores: {},
    skills: {},
    feats: [],
    classFeatures: [],
    race: null,
    alignment: null
  },

  stanceEffects: {
    base: {},
    aggressive: {},
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
