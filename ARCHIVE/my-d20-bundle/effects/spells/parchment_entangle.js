'use strict';

module.exports = {
  config: {
    name: "Living Parchment Trap",
    description: "You are entangled by animated parchment.",
    type: "spell_effect",
    family: "loss_of_control",
    tier: 1,
    isMagical: true
  },
  state: {
      casterId: null,
      dc: 15
  },
  listeners: {
    onTick: state => function () {
        const target = this.target;
        const DamageTypes = require('../../../lib/combat/damage-types');

        // Damage: 2d6 Slashing
        const damage = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        target.takeDamage(damage, DamageTypes.SUBTYPES.SLASHING, this.state.casterId);

        // Movement penalty
        target.addEffect(state.EffectFactory.create('slowed', { config: { duration: 6000 } }));
    },

    effectActivated() {
        const spellDef = this.target.gameState.SpellManager.get('liang_s_parchment_trap');
        if (spellDef.emotes.entrap) spellDef.emotes.entrap(this.target);
    },

    effectDeactivated() {
      this.target.say("<cyan>The parchment becomes inert, falling to the ground as ordinary scraps.</cyan>");
    }
  }
};
