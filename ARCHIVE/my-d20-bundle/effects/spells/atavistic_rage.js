'use strict';

/**
 * Atavistic Rage Condition
 * -----------------------
 * Physical buffs coupled with mental restrictions.
 */
module.exports = {
  config: {
    name: "Atavism",
    description: "You have regressed to a primal state of predatory rage.",
    type: "condition",
    family: "transmutation",
    tier: 1,
    maxTier: 1
  },
  state: {},
  modifiers: {
    attributes: {
      strength: (current) => current + 4,
      constitution: (current) => current + 4,
      naturalArmor: (current) => current + 2
    }
  },
  listeners: {
    effectActivated() {
      const player = this.target;
      player.addBehavior('can_bite');
      player.setMeta('isAtavistic', true);
      player.say("<red>A savage hunger clouds your mind. Complex thoughts vanish, replaced by the drive to hunt.</red>");
    },
    /**
     * Prevent spellcasting and complex command usage.
     */
    command: state => function (player, commandName, args) {
      const forbiddenPrefixes = ['cast', 'spells', 'ritual', 'craft', 'repair'];
      if (forbiddenPrefixes.some(p => commandName.startsWith(p))) {
        player.say("<red>Your mind is too clouded by primal rage to perform such a task!</red>");
        return false;
      }
    },
    effectDeactivated() {
      const player = this.target;
      player.removeBehavior('can_bite');
      player.setMeta('isAtavistic', false);
      player.say("<yellow>The blood-lust recedes, leaving your mind clear but your body aching.</yellow>");
    }
  }
};
