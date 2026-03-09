// path: ./bundles/my-d20-bundle/effects/spells/attract_undead_effect.js
'use strict';

module.exports = {
  config: {
    name: "Attracted",
    description: "Compelled to move toward the caster. Breaks on damage or turning.",
    type: "condition",
    family: "compulsion",
    tier: 1
  },

  state: {
    casterId: null
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      const caster = this.target.room.findPlayerById(this.state.casterId);
      
      // Immediate behavior shift: Move toward caster if in a multi-room zone
      // or simply initiate combat/aggro if they were neutral.
      if (caster) {
        target.setMeta('aggroTarget', caster.id);
      }
    },

    /**
     * The spell ends immediately if the undead is attacked.
     */
    incomingDamage(damage) {
      this.target.say("<yellow>The spell's fragile tether snaps as you are struck!</yellow>");
      this.remove();
    },

    /**
     * Turning or rebuking also breaks the spell.
     */
    onTurnAttempt() {
      this.remove();
    },

    /**
     * Logic: If the target enters a "dangerous" room or tile, the spell ends.
     */
    onEnterRoom(room) {
      if (room.hasTag('holy_ground') || room.hasTag('hazard_fire')) {
        this.target.say("<yellow>The danger ahead breaks the necrotic compulsion.</yellow>");
        this.remove();
      }
    },

    effectDeactivated() {
      this.target.say("<cyan>The supernatural pull on your essence vanishes.</cyan>");
    }
  }
};
