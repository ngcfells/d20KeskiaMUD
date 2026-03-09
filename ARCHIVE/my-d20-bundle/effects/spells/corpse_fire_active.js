'use strict';

const { FIRE } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Corpse Fire",
    description: "This flame only burns the dead.",
    type: "item_buff",
    family: "necromancy",
    tier: 2,
    duration: 6000
  },

  listeners: {
    /**
     * Intercept damage dealt by this item.
     */
    onDealDamage(damage) {
      const victim = damage.target;
      const isUndead = victim.hasTag('undead') || victim.getMeta('type') === 'undead';
      const isDead = victim.getAttribute('health') <= 0;

      if (!isUndead && !isDead) {
        // Living creatures feel the light but no heat/damage.
        damage.amount = 0;
        victim.say("<cyan>The ghostly flames wash over you like cool water, leaving you completely unharmed.</cyan>");
      } else {
        // Undead or corpses take full damage.
        // Logic: Add 'isMagical' to bypass standard damage reduction/immunities.
        damage.metadata.isMagical = true;
        damage.metadata.bypassesIncorporeal = true;
        victim.say("<red>The pale fire sears your unnatural form with agonizing intensity!</red>");
      }
    },

    effectDeactivated() {
      const item = this.target;
      item.name = item.name.replace('<cyan>Ghostly ', '').replace('</cyan>', '');
    }
  }
};
