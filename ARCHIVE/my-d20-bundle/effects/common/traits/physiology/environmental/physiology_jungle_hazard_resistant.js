'use strict';

module.exports = {
  config: {
    name: "Physiology: Jungle Hazard Resistant",
    description: "Adapted to humid jungles, resisting disease, insects, and rot.",
    type: "trait",
    family: "physiology_jungle_hazard_resistant",
    unique: true,
    persists: true
  },

  state: {
    diseaseResist: 1,
    poisonResist: 1,
    humidityTolerance: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResist;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResist;
      if (typeof current.humidityTolerance === "number") r.humidityTolerance = current.humidityTolerance + state.humidityTolerance;
      return r;
    }
  }
};
