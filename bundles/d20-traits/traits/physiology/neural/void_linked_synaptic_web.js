'use strict';

module.exports = {
  config: {
    name: "Physiology: Void-Linked Synaptic Web",
    description: "Neural pathways partially exist in extradimensional void space.",
    type: "trait",
    family: "physiology_void_linked_synaptic_web",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.3,
    initiativeBonus: +5,
    voidAwarenessBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.voidAwareness === "number") r.voidAwareness = current.voidAwareness + state.voidAwarenessBonus;
      return r;
    }
  }
};
