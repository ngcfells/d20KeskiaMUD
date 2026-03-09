// path: bundles/my-d20-bundle/effects/spells/abeyance_suppression.js
'use strict';
module.exports = {
  config: {
    name: "Abeyance",
    description: "A curse is being held at bay by divine magic.",
    type: "buff",
    duration: 86400000 
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      const effect = Array.from(target.effects.effects).find(e => e.id === this.state.suppressedEffectId);
      if (effect) effect.pause(); // Assume your effect engine supports .pause()
    },
    effectDeactivated() {
      const target = this.target;
      const effect = Array.from(target.effects.effects).find(e => e.id === this.state.suppressedEffectId);
      if (effect) effect.resume();
      target.say("<red>The divine protection fades, and the curse's weight returns.</red>");
    }
  }
};
