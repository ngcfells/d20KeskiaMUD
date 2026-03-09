// path: bundles/my-d20-bundle/effects/spells/acid_choke.js
'use strict';

module.exports = {
  config: {
    name: "Acid Choke",
    description: "Corrosive vapors burn your throat, making it hard to focus.",
    type: "condition",
    family: "respiratory",
    tier: 1,
    duration: 6000
  },

  modifiers: {
    attributes: {
      // Penalty to concentration as defined in the spell
      concentration: -4,
      appearance: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>The acrid fumes seize your lungs, forcing a ragged cough!</red>");
    },
    
    // On every attempt to cast while choked
    onCastAttempt() {
        this.target.say("<yellow>You struggle to speak the incantation through the burning in your throat.</yellow>");
    }
  }
};
