'use strict';

const { Broadcast: B } = require('ranvier');
const { KINETIC } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Mighty Blow",
    description: "Your next punch or kick carries incredible force.",
    type: "buff",
    family: "martial",
    tier: 1,
    duration: 6000
  },

  state: { casterLevel: 1 },

  listeners: {
    /**
     * Triggered when the caster lands a melee attack.
     */
    onAttack(attack) {
      const target = attack.target;
      const caster = this.target;
      const cl = this.state.casterLevel;

      // Only applies to Unarmed or "Punch/Kick" type attacks
      if (attack.metadata.weaponType !== 'unarmed' && attack.metadata.weaponType !== 'fist') {
        return;
      }

      const damageBonus = Math.min(cl, 12);
      
      B.sayAt(caster, `<bold><red>Your fist connects with the weight of a falling mountain!</red></bold>`);
      B.sayAt(target, `<bold><red>${caster.name} strikes you with a blow of incredible, bone-shattering force!</red></bold>`);

      // 1. Apply Bonus Damage
      attack.damage += damageBonus;

      // 2. Knockdown Logic: Fortitude Save vs Death Magic
      // DC 10 + 1/2 CL + Strength Mod
      const dc = 10 + Math.floor(cl / 2) + (caster.getAttribute('strength') || 0);
      const savePassed = caster.gameState.SpellcastingManager._savingThrow(caster.gameState, target, 'fortitude', dc);

      if (!savePassed) {
        B.sayAt(target, "<red>The impact sends you reeling to the ground!</red>");
        B.sayAtExcept(target.room, `<red>${target.name} is knocked prone by the sheer force of the blow!</red>`, [target, caster]);
        
        // Apply 'Prone' condition from your common effects
        const prone = caster.gameState.EffectFactory.create('prone', { duration: 6000 });
        target.addEffect(prone);
      }

      // 3. Discharge the spell
      this.remove();
    }
  }
};
