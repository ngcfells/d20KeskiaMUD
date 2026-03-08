/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/effects/ioun_vision_blur.js
 * PURPOSE: Penalizes characters for exceeding their Int-based orbital limit.
 */
'use strict';

module.exports = srcPath => {
  return {
    config: {
      name: 'Ioun Orbital Blur',
      description: 'The thick cloud of orbiting stones is hindering your vision.',
      unique: true,
      persists: false,
      type: 'debuff'
    },
    state: {
      count: 0,
      maxSafeStones: 10
    },
    modifiers: {
      attributes: {
        perception: function (current) {
          const penalty = Math.max(0, this.state.count - this.state.maxSafeStones);
          return current - penalty;
        },
        hit: function (current) {
          const penalty = Math.max(0, this.state.count - this.state.maxSafeStones);
          return current - penalty;
        }
      }
    },
    listeners: {
      effectActivated: function () {
        const { Broadcast: B } = require('ranvier');
        const penalty = this.state.count - this.state.maxSafeStones;
        B.sayAt(this.target, `<magenta>The dizzying whirl of ${this.state.count} stones blurs your sight (-${penalty} to vision and attacks).</magenta>`);
      },

      /**
       * Update both count and limit if Int or equipment changes
       */
      updateIounState: function (data) {
        this.state.count = data.count;
        this.state.maxSafeStones = data.maxSafeStones;
        
        if (this.state.count <= this.state.maxSafeStones) {
          this.remove();
        }
      }
    }
  };
};
