// path: ./bundles/my-d20-bundle/effects/spells/absolute_immunity_buff.js
'use strict';
module.exports = {
  config: {
    name: "Absolute Immunity",
    description: "Immune to non-artifact weapons and spells of 4th level or lower.",
    type: "buff",
    family: "protection",
    tier: 5,
    duration: 6000
  },
  listeners: {
    onTakeDamage(damage) {
      // Check if it's a spell source and its level
      if (damage.metadata?.spellLevel && damage.metadata.spellLevel <= 4) {
        damage.amount = 0;
        this.target.say("<cyan>The incoming magic washes harmlessly over your shield.</cyan>");
      }
      
      // Check weapon 'plus' or power - if standard kinetic, negate it
      if (damage.type === 'kinetic' && !damage.metadata?.isEpic) {
        damage.amount = 0;
        this.target.say("<white>The weapon bounces off your shimmering aura with a dull thud.</white>");
      }
    }
  }
};
