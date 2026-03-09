'use strict';

/**
 * Arrow of Bone Active Effect
 * --------------------------
 * 1. Grants +4 enhancement to the projectile.
 * 2. Triggers Fortitude save vs Instant Death on hit.
 */
module.exports = {
  config: {
    name: "Arrow of Bone",
    description: "This projectile is imbued with lethal necromantic power.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    casterId: null,
    casterLevel: 1,
    saveDC: 20
  },
  listeners: {
    /**
     * Enhancement Bonus to the Projectile
     */
    onProjectileLaunch: state => function (attackData) {
      attackData.attackBonus += 4;
      attackData.damageBonus += 4;
    },

    /**
     * Lethal Resolution
     */
    onProjectileHit: state => function (impactData) {
      const victim = impactData.target;
      const spellDef = state.SpellManager.get('arrow_of_bone');
      const DamageTypes = require('../../lib/combat/damage-types');

      // 1. Spell Resistance check
      if (victim.getMeta('spell_resistance')) {
        const srRoll = Math.floor(Math.random() * 20) + 1;
        if (srRoll + this.state.casterLevel < victim.getMeta('spell_resistance')) {
          victim.say("<cyan>A flicker of magical resistance causes the bone-bolt to shatter harmlessly against your skin.</cyan>");
          this.target.destroy();
          return;
        }
      }

      // 2. Saving Throw
      const roll = Math.floor(Math.random() * 20) + 1;
      const fortSave = (victim.getAttribute('fortitude') || 0) + roll;

      if (fortSave < this.state.saveDC && !victim.getMeta('isUndead')) {
        // FAIL: Instant Death
        if (spellDef.emotes.impactLethal) spellDef.emotes.impactLethal(victim);
        if (typeof victim.die === 'function') {
          victim.die(this.state.casterId);
        }
      } else {
        // SUCCESS (or Undead): 3d6 + 1/level (max +20) Cold Damage
        if (spellDef.emotes.impactPartial) spellDef.emotes.impactPartial(victim);
        
        let damage = 0;
        for (let i = 0; i < 3; i++) damage += Math.floor(Math.random() * 6) + 1;
        damage += Math.min(this.state.casterLevel, 20);

        victim.takeDamage(damage, DamageTypes.COLD, this.state.casterId);
      }

      // Projectile is destroyed on hit regardless of save
      this.target.destroy();
    }
  }
};
