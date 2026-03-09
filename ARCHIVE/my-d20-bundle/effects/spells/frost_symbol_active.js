'use strict';

/**
 * Frost Symbol Effect
 * -------------------
 * Grants [Cold] subtype traits and 1d6 cold damage on hit/touch.
 */
module.exports = {
  config: {
    name: "Frost Symbol",
    description: "An icy sigil marks you as a creature of frost and winter.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1,
    persistsAcrossDeath: true 
  },
  state: {
    symbolType: 'cold'
  },
  listeners: {
    effectActivated() {
      const unit = this.target;
      unit.addTag('symbol_spell_active');
      unit.addTag('cold_subtype');
      unit.say("<cyan>Your form begins to radiate a bone-chilling, supernatural cold.</cyan>");
    },

    /**
     * [Cold] Subtype Logic: Immunity and Vulnerability
     */
    onDamageReceived: state => function (damageData) {
      if (damageData.type === 'cold') {
        damageData.amount = 0; // Cold Immunity
        this.target.say("<cyan>The frost only strengthens your resolve.</cyan>");
      }

      if (damageData.type === 'fire') {
        // Double damage from fire except on a successful save (handled by engine)
        damageData.amount = Math.floor(damageData.amount * 2);
        this.target.say("<red>The fire ravages your frozen form!</red>");
      }
    },

    /**
     * Offensive Strike: 1d6 Extra Cold Damage
     */
    onMeleeHit: state => function (damage, target) {
      if (damage.isNaturalWeapon) {
        const extraDamage = state.Dice.roll('1d6').total;
        target.applyDamage(extraDamage, 'cold', { source: this.target.id });
      }
    },

    /**
     * Reactive: 1d6 Cold Damage when touched
     */
    onStruck: state => function (attacker, damage) {
      if (damage.type === 'unarmed' || damage.isNaturalWeapon) {
        const reactiveDamage = state.Dice.roll('1d6').total;
        attacker.applyDamage(reactiveDamage, 'cold', { source: this.target.id });
        attacker.say("<cyan>You are numbed and scorched by the undead's icy sigil!</cyan>");
      }
    }
  }
};
