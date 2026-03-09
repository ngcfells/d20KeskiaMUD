/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/effects/ioun_burn_surge.js
 */
'use strict';

module.exports = srcPath => {
  return {
    config: {
      name: 'Ioun Burn Surge',
      type: 'buff',
      unique: false // You can burn multiple stones if you're desperate
    },
    state: { stat: 'strength', amount: 4 },
    modifiers: {
      attributes: function (attributes) {
        if (attributes[this.state.stat] !== undefined) {
          attributes[this.state.stat] += this.state.amount;
        }
        return attributes;
      }
    },
    listeners: {
      effectDeactivated: function () {
        const { Broadcast: B } = require('ranvier');
        B.sayAt(this.target, "<red>Your Ioun surge fades, leaving you feeling slightly hollow.</red>");
      }
    }
  };
};
