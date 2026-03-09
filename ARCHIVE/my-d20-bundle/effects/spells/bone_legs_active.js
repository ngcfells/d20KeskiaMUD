// path: ./bundles/my-d20-bundle/effects/spells/bone_legs_active.js
'use strict';

module.exports = {
  config: {
    name: "Animated Bone Legs",
    description: "Animated porter/mount. Follows master and carries items.",
    type: "buff",
    family: "necromancy",
    tier: 1
  },

  state: {
    strength: 10,
    capacity: 100
  },

  modifiers: {
    attributes: {
      speed: 30
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('is_animated_undead');
      target.addTag('cannot_attack');
    },

    /**
     * Logic for riding the legs as a mount.
     */
    onMount(player) {
      if (player.id !== this.state.casterId) {
        player.say("<red>The legs kick out at you; they only permit their creator to ride.</red>");
        return;
      }
      player.say("<cyan>You balance yourself upon the pelvis of the bone legs as they begin to walk.</cyan>");
    },

    /**
     * Logic for jumping.
     */
    onCommand(cmd, args) {
      if (cmd === 'jump') {
        this.target.say("<white>The skeletal legs coil and spring upward with surprising force.</white>");
      }
    },

    effectDeactivated() {
      this.target.removeTag('is_animated_undead');
      this.target.removeTag('cannot_attack');
    }
  }
};
