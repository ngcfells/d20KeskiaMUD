// path: bundles/my-d20-bundle/effects/spells/acid_lash_active.js
'use strict';

const { Broadcast } = require('ranvier');
const { ACID } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Acid Lash",
    description: "You are wielding a whip of pure acid.",
    type: "buff.weapon",
    unique: true,
    duration: 6000
  },

  state: { casterLevel: 1 },

  listeners: {
    /**
     * Provide a specific combat message or bonus for the lash
     */
    effectActivated() {
      this.target.addTag('wielding_acid_lash');
    },

    effectDeactivated() {
      this.target.removeTag('wielding_acid_lash');
      this.target.say("<yellow>Your acidic whip dissolves into a harmless puddle at your feet.</yellow>");
    },

    /**
     * If your MUD uses a 'strike' or 'attack' event, hook in here.
     * For now, we assume a Melee Touch Attack logic.
     */
    onAttack(attack) {
      const target = attack.target;
      const caster = this.target;
      
      const damageAmount = caster.gameState.Dice.roll('1d6') + Math.min(this.state.casterLevel, 10);
      
      Broadcast.sayAt(caster, `<green>You crack your lash across ${target.name}, leaving a smoking, caustic welt!</green>`);
      Broadcast.sayAt(target, `<red>${caster.name}'s acid lash bites into your flesh, hissing as it dissolves skin!</red>`);

      caster.gameState.Damage.apply({
        amount: damageAmount,
        type: ACID,
        attacker: caster,
        target: target,
        source: "Acid Lash"
      });

      // Apply 1 round of 'Acidic' (liquid) from your liquids folder
      const sting = caster.gameState.EffectFactory.create('acidic', {
        duration: 6000,
        state: { damagePerTick: '1', attacker: caster }
      });
      target.addEffect(sting);
    }
  }
};
