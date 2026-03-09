/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/effects/armor_penalty.js
 * PURPOSE: Applies attack roll penalties for wearing non-proficient armor.
 */
'use strict';

module.exports = srcPath => {
  return {
    config: {
      name: 'Non-Proficient Armor Penalty',
      description: 'You are untrained in this armor, hindering your combat precision.',
      unique: true,
      persists: false,
      type: 'debuff'
    },
    state: {
      amount: 0 // The Armor Check Penalty (ACP) value passed during creation
    },
    modifiers: {
      /**
       * d20 Rule: Non-proficiency applies the ACP as a penalty to attack rolls.
       */
      attributes: {
        hit: function (current) {
          return current - this.state.amount;
        },
        attack: function (current) {
          return current - this.state.amount;
        }
      }
    },
    listeners: {
      /**
       * Provide feedback when the penalty is applied.
       */
      effectActivated: function () {
        const { Broadcast: B } = require('ranvier');
        B.sayAt(this.target, `<red>The weight and bulk of your armor interfere with your movements (-${this.state.amount} to attacks).</red>`);
      }
    }
  };
};
