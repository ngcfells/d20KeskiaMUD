// path: ./bundles/my-d20-bundle/effects/spells/absorbed_energy.js
'use strict';
module.exports = {
  config: {
    name: "Absorbed Energy",
    description: "Resistance to the last elemental damage type taken.",
    type: "buff",
    family: "protection",
    tier: 1,
    duration: 6000
  },
  state: { absorbedType: null },
  listeners: {
    onTakeDamage(damage) {
      const types = ['fire', 'cold', 'acid', 'electricity', 'sonic'];
      if (types.includes(damage.type)) {
        damage.amount = Math.floor(damage.amount / 2);
        this.state.absorbedType = damage.type;
        this.target.say(`<cyan>You capture the ${damage.type} energy, storing it in your weapon!</cyan>`);
      }
    }
  }
};
