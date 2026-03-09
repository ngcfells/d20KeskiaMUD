/**
 * BUNDLE: commands
 * PATH: bundles/commands/hit.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

module.exports = {
  usage: 'hit <target>',
  command: state => (args, player) => {
    state.CommandManager.get('attack').command(state)(args, player);
  }
};
