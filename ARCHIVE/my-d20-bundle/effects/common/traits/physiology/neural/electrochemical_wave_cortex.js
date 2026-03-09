'use strict';

module.exports = {
  config: {
    name: "Physiology: Electrochemical Wave Cortex",
    description: "Neural activity propagates in waves rather than pulses.",
    type: "trait",
    family: "physiology_electrochemical_wave_cortex",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.05,
    initiativeBonus: +1,
    waveSynchronizationBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.waveSync === "number") r.waveSync = current.waveSync + state.waveSynchronizationBonus;
      return r;
    }
  }
};
