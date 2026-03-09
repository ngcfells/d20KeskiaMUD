// path: ./bundles/my-d20-bundle/effects/spells/necrotic_tendril_effect.js
// ties to animate necrosis spell
'use strict';

module.exports = {
  config: {
    name: "Necrotic Tendril",
    description: "An animated tendril of your own flesh is strangling you.",
    type: "condition",
    family: "binding",
    tier: 4
  },

  state: {
    hp: 2,
    attackBonus: 15,
    constrictionDmg: '2d6'
  },

  listeners: {
    effectActivated() {
      this.target.addTag('grappled');
    },

    /**
     * The tendril acts every combat tick.
     */
    updateTick() {
      const target = this.target;
      const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2; // 2d6
      
      target.receiveDamage('kinetic', damage);
      target.say("<red>The necrotic tendril tightens its grip, crushing the breath from your lungs!</red>");
      
      if (this.state.hp <= 0) {
        this.remove();
      }
    },

    /**
     * The tendril can be attacked specifically to remove it.
     */
    incomingDamage(damage) {
       this.state.hp -= damage.amount;
       if (this.state.hp <= 0) {
         this.target.say("<green>You hack the sickly tendril from your body; it shrivels and dies.</green>");
         this.remove();
       }
    },

    effectDeactivated() {
      this.target.removeTag('grappled');
    }
  }
};
