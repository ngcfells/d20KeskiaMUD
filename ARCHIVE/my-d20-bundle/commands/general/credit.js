/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/credit.js
 * PURPOSE: Fill me out.
 */

'use strict';

module.exports = {
  command: state => (args, player) => {
    state.CommandManager.get('help').execute('credits', player);
  }
};