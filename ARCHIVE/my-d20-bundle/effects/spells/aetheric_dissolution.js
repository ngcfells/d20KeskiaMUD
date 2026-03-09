// path: ./bundles/my-d20-bundle/effects/spells/aetheric_dissolution.js
'use strict';

module.exports = {
  config: {
    name: "Aetheric Dissolution",
    description: "The weapon is held in existence by divine will. It will vanish when the spell ends.",
    type: "item_expiry",
    tier: 5
  },

  listeners: {
    effectDeactivated() {
      const item = this.target;
      const owner = item.owner;
      
      if (owner) {
        owner.say("<yellow>Your aetheric weapon shimmers into motes of light and returns to the heavens.</yellow>");
      }
      item.destroy();
    },

    /**
     * Logic: If dispelled, the weapon winks out immediately 
     * unless Permanency was cast.
     */
    onDispel() {
      if (!this.target.getMeta('isPermanent')) {
        this.remove();
      }
    }
  }
};
