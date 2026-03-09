'use strict';

/**
 * Arcane Eye Sensor Effect
 * ------------------------
 * Manages the "possession" of the invisible sensor. 
 * Allows the caster to use a 'scout' command to move the eye.
 */
module.exports = {
  config: {
    name: "Arcane Eye",
    description: "You are controlling an invisible magical sensor.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    currentRoomId: null,
    speed: 30 // 30ft per round per SRD
  },
  listeners: {
    effectActivated() {
      // Caster gains the 'scout' command via behavior or direct hook
      this.target.addBehavior('arcane_scouting');
    },

    effectDeactivated() {
      this.target.removeBehavior('arcane_scouting');
      const spellDef = this.target.gameState.SpellManager.get('arcane_eye');
      if (spellDef.emotes.interrupted) {
          spellDef.emotes.interrupted(this.target);
      }
    },

    /**
     * Concentration check: If the caster takes damage, check to maintain the eye.
     */
    onDamage: state => function (damage) {
      const caster = this.target;
      const dc = 10 + damage.amount + 4; // Spell Level 4
      
      const spellcasting = require('../../lib/combat/spellcasting');
      const check = spellcasting.checkConcentration(state, caster, dc);
      
      if (!check.success) {
        this.remove();
      }
    }
  }
};
