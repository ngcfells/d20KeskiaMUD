'use strict';

/**
 * Axani's Command Effect
 * ----------------------
 * Enforces the specific verbal command by overriding the target's 
 * next set of actions.
 */
module.exports = {
  config: {
    name: "Axani's Command",
    description: "You are compelled by a divine word of Law to obey a single command.",
    type: "condition",
    family: "enchantment",
    tier: 1,
    maxTier: 1
  },
  state: {
    commandType: 'halt'
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      target.say(`<red>The weight of absolute Law compels you to ${this.state.commandType}!</red>`);
      
      // Immediate action triggers for specific commands
      if (this.state.commandType === 'drop') {
        state.CommandManager.get('drop').execute('all', target);
      } else if (this.state.commandType === 'fall') {
        target.addBehavior('prone');
      }
    },

    /**
     * Movement/Action Override for the duration
     */
    command: state => function (player, commandName, args) {
      const type = this.state.commandType;
      
      if (type === 'halt') {
        player.say("<yellow>You are frozen in place by the command.</yellow>");
        return false;
      }
      
      if (type === 'flee' && !['north', 'south', 'east', 'west', 'up', 'down'].includes(commandName)) {
        player.say("<yellow>You can think of nothing but escape!</yellow>");
        return false;
      }
    }
  }
};
