'use strict';

const Spellcasting = require('../../lib/combat/spellcasting');

/**
 * Combat AI for Liang Chou (Level 30 Planar Archivist)
 */
module.exports = {
  listeners: {
    spawn: state => function () {
      this.say("The archive is open. Knowledge is to be shared... or extracted.");
    },

    /**
     * Combat Round Logic
     */
    updateTick: state => function () {
      if (!this.isInCombat()) return;

      const target = [...this.combatants][0];
      const healthPct = (this.getAttribute('health') / this.getMaxAttribute('health')) * 100;

      // 1. IMMEDIATE DEFENSE (Liang's Living Ink Shield)
      if (!this.effects.has('ink_shield')) {
        this.say("<cyan>The ink rises to protect its master.</cyan>");
        state.SpellManager.get('liang_s_ink_shield').onCast(state, this, this);
      }

      // 2. TACTICAL RETRIBUTION (If target is a caster)
      if (target.getMeta('isSpellcaster') && Math.random() > 0.7) {
        this.say("<magenta>Your mind is cluttered; let me organize it for you.</magenta>");
        state.SpellManager.get('arcane_turmoil').onCast(state, this, target);
      }

      // 3. PUNISHMENT (Thousand Paper Cuts)
      if (!target.effects.has('paper_cuts_bleed') && Math.random() > 0.5) {
        state.SpellManager.get('liang_s_paper_cuts').onCast(state, this, target);
      }

      // 4. CRITICAL HP: PAN-PLANAR ANCHOR
      if (healthPct < 25 && !this.room.effects.has('pan_planar_ward')) {
          this.say("<red>Dimensional stability is required for this extraction.</red>");
          state.SpellManager.get('liang_s_pan_planar_anchor').onCast(state, this, this.room);
      }
    },

    /**
     * Intercept damage via Taiji Deflection
     */
    damaged: state => function (damage) {
      if (damage.amount > 20 && Math.random() > 0.5) {
        this.say("<blue>Circular motion, fluid redirection.</blue>");
        // Redirect logic handled by the Jian's behavior
      }
    },

    death: state => function (killer) {
      this.say("Even this... is merely another entry in the catalog.");
    }
  }
};
