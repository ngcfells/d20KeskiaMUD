'use strict';

/**
 * Redacted Effect
 * ---------------
 * The spiritual state of being trapped in the Archive.
 * 1. Character is considered 'Literary Matter'.
 * 2. Cannot be targeted by standard physical attacks.
 * 3. Can only be retrieved by 'Liang's Instant Retrieval' or 'Identify'.
 */
module.exports = {
  config: {
    name: "Redacted",
    description: "You have been flattened into a narrative entity.",
    type: "condition",
    unique: true,
    persistsAcrossDeath: true
  },
  listeners: {
    effectActivated() {
      this.target.addBehavior('immobilized');
      this.target.setMeta('isLiterary', true);
    },
    effectDeactivated() {
      this.target.removeBehavior('immobilized');
      this.target.removeMeta('isLiterary');
    }
  }
};
