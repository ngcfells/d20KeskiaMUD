'use strict';

/**
 * Double Aging Effect
 * -------------------
 * This effect simulates accelerated biological decay.
 * In a MUD context, this applies a persistent penalty to physical attributes 
 * and increases the rate of hunger/thirst/stamina decay.
 */
module.exports = {
  config: {
    name: "Double Aging",
    description: "Your natural aging rate is doubled. Physical attributes are suppressed.",
    type: "spell_effect",
    unique: true,
    isMagical: true,
    persistsAcrossDeath: true // A curse of the blood
  },
  state: {
    ageFactor: 2
  },
  modifiers: {
    attributes: {
      strength: -2,
      dexterity: -2,
      constitution: -2,
      // Mental stats theoretically increase in 3.5 aging, 
      // but this is magical corruption, not wisdom. 
      appearance: -4 
    }
  },
  listeners: {
    effectActivated() {
      // Logic for long-term MUD age tracking if applicable
      const target = this.target;
      const currentAge = target.getMeta('age') || 20;
      target.setMeta('aging_modifier', 2.0);
    },

    /**
     * Increase the cost of physical exertion
     */
    staminaUpdate: state => function (data) {
        // Double the stamina drain for all actions
        if (data && data.cost) {
            data.cost *= 2;
        }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeMeta('aging_modifier');
      target.say("<cyan>The unnatural heaviness in your bones lifts. Though the time lost cannot be regained, the hunger of the quicksilver has ceased.</cyan>");
    }
  }
};
