'use strict';

module.exports = {
  config: {
    name: "Force-Void Subtype",
    description: "Creates a localized null zone that suppresses Force abilities.",
    type: "trait",
    family: "subtype_force_void",
    unique: true,
    persists: true
  },

  state: {
    radius: 5 // meters
  },

  listeners: {
    onTick() {
      return () => {
        // Suppress Force effects on nearby targets
        const nearby = this.target.room.getEntitiesInRange(this.state.radius);
        for (const ent of nearby) {
          ent.effects?.forEach(eff => {
            if ((eff.config.family || "").toLowerCase().startsWith("force_")) {
              eff.suppressed = true;
            }
          });
        }
      };
    }
  }
};
