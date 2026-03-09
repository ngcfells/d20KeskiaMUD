/**
 * Anticipate Dodge
 * Source: SRD (Paizo)
 * Additional Sources: []
 * Alternate Names: {}
 */

module.exports = {
  id: "anticipate_dodge",
  name: "Anticipate Dodge",
  category: "general",
  prerequisites: {
  "baseAttackBonus": 7,
  "attributes": {},
  "skills": {},
  "feats": [
    "dodge",
    "mobility"
  ],
  "classFeatures": [],
  "race": null,
  "alignment": null
},
  description: "Gain up to a +2 bonus on attack rolls against creatures with a dodge bonus",
  mechanicsHash: "",
  normalizedBenefit: "Gain up to a +2 bonus on attack rolls against creatures with a dodge bonus"
};
