'use strict';

const { Broadcast: B } = require('ranvier');
const { ACID } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Return to the Earth",
    description: "The forces of natural decay are dismantling corporeal undead in this area.",
    type: "field",
    family: "nature",
    tier: 3,
    duration: 6000
  },

  state: { casterLevel: 1, dc: 15 },

  listeners: {
    /**
     * Heartbeat: Process decay damage per round
     */
    updateTick() {
      const room = this.target;
      const state = this.gameState;
      const { casterLevel, dc } = this.state;

      for (const unit of room.characters) {
        // Only affects CORPOREAL undead (not ghosts/shadows)
        const isUndead = unit.hasTag('undead') || unit.getMeta('type') === 'undead';
        const isIncorporeal = unit.hasTag('incorporeal');

        if (isUndead && !isIncorporeal) {
          // Recurring Save vs Death Magic (Fortitude)
          const savePassed = state.SpellcastingManager._savingThrow(state, unit, 'fortitude', dc);
          
          let damageRoll = state.Dice.roll('1d4') + Math.floor(casterLevel / 3);
          if (savePassed) damageRoll = Math.floor(damageRoll / 2);

          B.sayAt(unit, "<red>Vines and beetles swarm your body, shredding your preserved flesh and pulling you toward the dark soil!</red>");
          B.sayAtExcept(room, `<green>${unit.name} crumbles and rots visibly as the earth reclaims its mass.</green>`, [unit]);

          state.Damage.apply({
            amount: damageRoll,
            type: ACID, // Mapping 'Rot' to Acid for attribute mitigation
            target: unit,
            source: "Return to the Earth"
          });
        }
      }
    }
  }
};
