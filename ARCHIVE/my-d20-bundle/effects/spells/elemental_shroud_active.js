'use strict';

/**
 * Elemental Shroud Effect
 * ----------------------
 * Provides +2 Natural Armor and +2 Turn Resistance.
 * Triggers 1d6 elemental damage on offensive strikes and when touched.
 */
module.exports = {
  config: {
    name: "Elemental Shroud",
    description: "Coated in a crackling shroud of elemental energy.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1,
    persistsAcrossDeath: true // It's permanent on undead
  },
  state: {
    energyType: 'fire'
  },
  modifiers: {
    attributes: {
      naturalArmor: (current) => current + 2,
      // Logic for Turn Resistance (assuming it maps to 'will' or 'resolve' vs Turn checks)
      will: (current) => current + 2 
    }
  },
  listeners: {
    effectActivated() {
      const type = this.state.energyType;
      const descriptions = {
        acid: "dark, bubbling effluvium",
        cold: "icy blue and glistening frost",
        electricity: "crackling arcs of lightning",
        fire: "molten, burning tongues of flame",
        sonic: "shrieking distortions in the air"
      };
      this.target.say(`<cyan>You are covered in ${descriptions[type]}.</cyan>`);
      this.target.setMeta('shroud_type', type);
    },

    /**
     * Offensive Strike: 1d6 Extra Damage
     */
    onMeleeHit: state => function (damage, target) {
      const extraDamage = state.Dice.roll('1d6').total;
      target.applyDamage(extraDamage, this.state.energyType, { source: this.target.id });
      this.target.say(`<yellow>Your shroud sears ${target.name} with ${this.state.energyType}!</yellow>`);
    },

    /**
     * Defensive/Reactive: 1d6 Damage when touched or struck by natural weapons
     */
    onStruck: state => function (attacker, damage) {
      if (damage.type === 'unarmed' || damage.isNaturalWeapon) {
        const reactiveDamage = state.Dice.roll('1d6').total;
        attacker.applyDamage(reactiveDamage, this.state.energyType, { source: this.target.id });
        attacker.say(`<red>You are scorched by the shroud of ${this.target.name}!</red>`);
      }
    }
  }
};
