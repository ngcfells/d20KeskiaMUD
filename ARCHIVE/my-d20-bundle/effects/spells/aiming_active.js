// path: ./bundles/my-d20-bundle/effects/spells/aiming_active.js
/// tied to aiming at the target spell
'use strict';

module.exports = {
  config: {
    name: "Aiming at the Target",
    description: "+10 circumstance bonus on Concentration checks for a specific spell.",
    type: "buff",
    family: "focus",
    tier: 3
  },

  state: {
    targetEffectId: null,
    targetSpellName: ''
  },

  listeners: {
    effectActivated() {
      this.target.addTag('heightened_focus');
    },

    /**
     * Concentration Hook:
     * Triggered by the spellcasting engine when damage is taken or 
     * a distraction occurs.
     */
    onConcentrationCheck(checkData) {
      // Circumstance bonuses are massive (+10) but highly specific
      checkData.bonus += 10;
      this.target.say(`<cyan>Your preternatural focus on ${this.state.targetSpellName} ignores the distraction!</cyan>`);
    },

    /**
     * Link Maintenance:
     * If the primary spell's concentration is lost, this spell ends.
     */
    updateTick() {
      const target = this.target;
      if (!target.effects.has(this.state.targetEffectId)) {
        target.say("<grey>Your primary spell has ended; your tactical focus dissipates.</grey>");
        this.remove();
      }

      if (Math.random() > 0.8) {
        target.say(`<white>You are perfectly dialed into the flow of ${this.state.targetSpellName}.</white>`);
      }
    },

    effectDeactivated() {
      this.target.removeTag('heightened_focus');
      this.target.say("<grey>Your heightened concentration fades.</grey>");
    }
  }
};
