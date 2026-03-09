'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Taint",
    description: "Exposure to cosmic, reality-warping forces alters perception and grants resistance to eldritch energies.",
    type: "trait",
    family: "physiology_eldritch_taint",
    unique: true,
    persists: true
  },

  state: {
    eldritchResist: 2,
    perceptionDistortion: 1,
    voidWhisperSensitivity: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.eldritchResist === "number")
        r.eldritchResist = current.eldritchResist + state.eldritchResist;

      if (typeof current.perceptionDistortion === "number")
        r.perceptionDistortion = current.perceptionDistortion + state.perceptionDistortion;

      if (typeof current.voidWhisperSensitivity === "number")
        r.voidWhisperSensitivity = current.voidWhisperSensitivity + state.voidWhisperSensitivity;

      return r;
    }
  }
};
