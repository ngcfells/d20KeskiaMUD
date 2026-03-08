'use strict';

module.exports = {
  config: {
    name: "Physiology: Narrow Focus Cognition",
    description: "A cognitive system optimized for intense focus and instinctive problem-solving.",
    type: "trait",
    family: "physiology_narrow_focus_cognition",
    unique: true,
    persists: true
  },

  state: {
    focusBonus: +3,
    abstractionPenalty: -2,
    charmVulnerabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.focus === "number") r.focus = current.focus + state.focusBonus;
      if (typeof current.abstraction === "number") r.abstraction = current.abstraction + state.abstractionPenalty;
      if (typeof current.charmVulnerability === "number") r.charmVulnerability = current.charmVulnerability + state.charmVulnerabilityBonus;
      return r;
    }
  }
};
