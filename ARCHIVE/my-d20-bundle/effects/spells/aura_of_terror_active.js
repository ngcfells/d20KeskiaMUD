'use strict';

/**
 * Aura of Terror Effect
 * ---------------------
 * Monitors enemies within the radius. Triggers Will saves against the Shaken
 * status when enemies enter the area or the caster attacks/charges.
 */
module.exports = {
  config: {
    name: "Aura of Terror",
    description: "You project an aura of supernatural fear.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1
  },
  state: {
    radius: 30,
    dcBonus: 0,
    baseDC: 10
  },
  listeners: {
    effectActivated() {
      const caster = this.target;
      const saveDC = this.state.baseDC + this.state.dcBonus;

      // Hook: Check enemies entering the room or the aura's proximity
      this.proximityHook = (unit) => {
        if (unit === caster || !unit.isEnemyOf(caster)) return;
        
        const distance = state.utils.getDistance(unit.position, caster.position);
        if (distance <= this.state.radius && !unit.effects.has('shaken')) {
          
          const saveResult = unit.rollSave('will', saveDC);
          if (!saveResult.success) {
            const rounds = state.Dice.roll('3d6').total;
            // Apply standard Shaken condition
            const shakenEffect = state.EffectFactory.create('shaken', unit, {
              duration: rounds * 6000 // 6 seconds per round
            });
            unit.addEffect(shakenEffect);
            unit.say("<red>Your heart quails as the terrifying presence of " + caster.name + " overwhelms your resolve!</red>");
          }
        }
      };

      state.addHook('onUnitMove', this.proximityHook);
      state.addHook('onCombatAction', this.proximityHook); // Triggers on attacks/charges
    },

    effectDeactivated() {
      state.removeHook('onUnitMove', this.proximityHook);
      state.removeHook('onCombatAction', this.proximityHook);
      this.target.say("<grey>The oily shroud of terror dissipates from around you.</grey>");
    }
  }
};
