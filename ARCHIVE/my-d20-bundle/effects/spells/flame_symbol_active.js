'use strict';

/**
 * Flame Symbol Effect
 * -------------------
 * Grants [Fire] subtype traits and 1d6 fire damage on hit/touch.
 */
module.exports = {
  config: {
    name: "Flame Symbol",
    description: "A burning sigil marks you as a creature of flame.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1,
    persistsAcrossDeath: true // Permanent change to the undead
  },
  state: {
    symbolType: 'fire'
  },
  listeners: {
    effectActivated() {
      const unit = this.target;
      unit.addTag('symbol_spell_active');
      unit.addTag('fire_subtype');
      unit.say("<red>Your form radiates an intense, supernatural heat.</red>");
    },

    /**
     * [Fire] Subtype Logic: Immunity and Vulnerability
     */
    onDamageReceived: state => function (damageData) {
      if (damageData.type === 'fire') {
        damageData.amount = 0; // Fire Immunity
        this.target.say("<orange>The flames only nourish your sigil.</orange>");
      }

      if (damageData.type === 'cold') {
        // Double damage from cold unless a save (handled elsewhere) is passed
        damageData.amount = Math.floor(damageData.amount * 2);
        this.target.say("<cyan>The cold bites deep into your burning core!</cyan>");
      }
    },

    /**
     * Offensive Strike: 1d6 Extra Fire Damage
     */
    onMeleeHit: state => function (damage, target) {
      if (damage.isNaturalWeapon) {
        const extraDamage = state.Dice.roll('1d6').total;
        target.applyDamage(extraDamage, 'fire', { source: this.target.id });
      }
    },

    /**
     * Reactive: 1d6 Fire Damage when touched
     */
    onStruck: state => function (attacker, damage) {
      if (damage.type === 'unarmed' || damage.isNaturalWeapon) {
        const reactiveDamage = state.Dice.roll('1d6').total;
        attacker.applyDamage(reactiveDamage, 'fire', { source: this.target.id });
        attacker.say("<red>You are scorched by the undead's burning sigil!</red>");
      }
    }
  }
};
