'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Hallowed Ground (Quiet Dead)",
    description: "The dead cannot be animated within this hallowed perimeter.",
    type: "field",
    family: "holy",
    tier: 3,
    duration: 6000
  },

  listeners: {
    /**
     * Intercept the 'Animate Dead' or similar spell attempts in this room.
     */
    onBeforeSpellCast(caster, spell) {
      if (spell.descriptors.includes('undead') || spell.id === 'animate_dead') {
        caster.say("<bold><white>The hallowed silence of this place rejects your necromancy!</white></bold>");
        B.sayAtExcept(caster.room, `<white>A burst of pure, quiet light snuffs out ${caster.name}'s dark incantation.</white>`, [caster]);
        return false; // Cancel spell
      }
    },

    effectActivated() {
      B.sayAt(this.target, "<white>The room falls into a deep, respectful silence as the ward takes hold.</white>");
    }
  }
};
