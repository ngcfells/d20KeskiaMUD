// path: bundles/my-d20-bundle/effects/absorbed_weapon_effect.js
'use strict';

module.exports = {
  config: {
    name: 'Absorbed Weapon',
    description: 'A weapon is dissolved into your palm.',
    type: 'spell.transmutation',
    unique: false, // Set to false to allow Thri-kreen to absorb multiple weapons
    persists: true,
  },
  state: {
    weaponRef: null,
    sourceSlot: null, // Tracks which hand/wield slot held the weapon
    preservedPoison: null
  },
  listeners: {
    effectActivated: function () {
      if (this.state.weaponRef) {
        this.state.weaponRef.setMeta('isAbsorbed', true);
        this.state.weaponRef.setMeta('absorbedInSlot', this.state.sourceSlot);
      }
    },
    effectDeactivated: function () {
      if (this.state.weaponRef) {
        this.state.weaponRef.removeMeta('isAbsorbed');
        this.state.weaponRef.removeMeta('absorbedInSlot');
      }
    }
  }
};
