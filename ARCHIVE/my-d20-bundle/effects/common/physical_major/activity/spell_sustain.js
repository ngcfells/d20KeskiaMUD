'use strict';

/**
 * Effect: Spell Sustain
 * You maintain an ongoing spell or supernatural effect.
 */
module.exports = {
  config: {
    name: "Spell Sustain",
    description: "You maintain an ongoing spell or supernatural effect.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: +2,
      spellPower: +1,
      reflex: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('spell_sustain_override', true);
      this.target.addTag?.('is_sustaining_spell');
      this.target.say("<magenta>You focus to sustain your spell.</magenta>");
    },

    effectDeactivated() {
      this.target.setMeta('spell_sustain_override', false);
      this.target.removeTag?.('is_sustaining_spell');
      this.target.say("<cyan>Your sustained spell ends.</cyan>");
    },

    move() {
      this.target.say("Movement breaks your concentration!");
      this.remove();
      return true;
    },

    damaged() {
      this.target.say("<red>Your sustained spell collapses!</red>");
      this.remove();
    }
  }
};
