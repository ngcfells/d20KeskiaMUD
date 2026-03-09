// path: ./bundles/my-d20-bundle/effects/spells/align_fang_active.js
'use strict';

module.exports = {
  config: {
    name: "Align Fang",
    description: "Natural weapons are aligned, bypassing specific Damage Reduction.",
    type: "buff",
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
    onBeforeAttack(attackData) {
      const weapon = attackData.weapon;
      
      // Check if it is a natural weapon (no item or has 'natural' tag)
      if (!weapon || weapon.hasTag('natural') || weapon.hasTag('unarmed')) {
        // Add the alignment descriptor (e.g., 'good') to the attack
        attackData.descriptors.push(this.state.alignment);
      }
    },

    updateTick() {
      if (Math.random() > 0.9) {
        const color = { good: 'white', evil: 'magenta', lawful: 'blue', chaotic: 'yellow' }[this.state.alignment];
        this.target.say(`<${color}>The ${this.state.alignment} essence in your fangs pulses steadily.</${color}>`);
      }
    },

    effectDeactivated() {
      this.target.say("<grey>The extraplanar alignment of your fangs fades, returning them to mundane bone and claw.</grey>");
    }
  }
};
