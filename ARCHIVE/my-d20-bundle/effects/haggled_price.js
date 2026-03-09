/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/effects/haggled_price.js
 */
'use strict';

module.exports = srcPath => {
  return {
    config: {
      name: 'Negotiated Price',
      description: 'You have talked a vendor down on their prices.',
      unique: false, // Can have discounts with different vendors
      persists: false,
      type: 'buff'
    },
    state: { multiplier: 1.0, vendorId: null },
    listeners: {
      effectActivated: function() {
        this.target.say("<cyan>You have successfully secured a discount.</cyan>");
      }
    }
  };
};
