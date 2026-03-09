// path: ./bundles/my-d20-bundle/effects/spells/align_weapon_active.js
'use strict';

module.exports = {
  config: {
    name: "Align Weapon",
    description: "Weapon is aligned, bypassing specific Damage Reduction.",
    type: "item_buff",
    family: "transmutation",
    tier: 2
  },

  state: {
    alignment: 'good'
  },

  listeners: {
    /**
     * Damage Hook: DR Bypass
     * Injects the alignment into the attack metadata before damage resolution.
     */
    onWeaponAttack(attackData) {
      // Add the alignment descriptor (e.g., 'good') to the attack
      attackData.descriptors.push(this.state.alignment);
    },

    /**
     * Flavor Tick
     */
    updateTick() {
      if (Math.random() > 0.9) {
        const color = { good: 'white', evil: 'magenta', lawful: 'blue', chaotic: 'yellow' }[this.state.alignment];
        const room = this.target.room || (this.target.equippedBy && this.target.equippedBy.room);
        if (room) {
          room.broadcast(`<grey>The ${this.state.alignment} energy crackles along the edge of ${this.target.name}.</grey>`);
        }
      }
    },

    effectDeactivated() {
      const wielder = this.target.equippedBy || this.target.carriedBy;
      if (wielder) {
        wielder.say(`<red>The aligned resonance fades from ${this.target.name}.</red>`);
      }
    }
  }
};
