'use strict';

/**
 * Temporal Stasis / Amber Cocoon
 * ------------------------------
 * A total suspension of time for the target.
 * Targets: Creatures or Objects (Books).
 */
module.exports = {
  config: {
    name: "Temporal Stasis",
    description: "Time has ceased to flow for you.",
    type: "condition",
    family: "loss_of_control",
    tier: 5, // Absolute suspension
    isMagical: true
  },
  state: {},
  listeners: {
    effectActivated() {
      const target = this.target;
      target.addBehavior('immobilized');
      
      if (target.isPlayer || target.isNpc) {
        target.say("<red>The world freezes. The last sound you hear is the snapping of a temporal lock.</red>");
      }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeBehavior('immobilized');
      if (target.isPlayer || target.isNpc) {
        target.say("<cyan>Time rushes back in a disorienting flood of sound and motion.</cyan>");
      }
    },

    /**
     * Total Immunity & Action Denial
     */
    onCommand: state => function (command) {
        // Block all commands while in stasis
        this.target.say("<grey>You are frozen in a moment of stasis.</grey>");
        throw new Error("Target in Stasis.");
    },

    onDamage: state => function (damage, result) {
        // Objects and Creatures in stasis are invulnerable to outside force
        result.cancel = true;
        this.target.room.broadcastExcept(null, `<white>The attack strikes the amber field surrounding ${this.target.name} and slides off harmlessly.</white>`);
    },

    /**
     * Prevent biological decay (Hunger/Thirst/Aging)
     */
    onTick: state => function (result) {
        // Stop all attribute decay or regen
        result.cancel = true;
    }
  }
};
