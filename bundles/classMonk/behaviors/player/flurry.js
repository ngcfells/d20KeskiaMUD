module.exports = {
  listeners: {
    beforeAttack: (state) => function (args) {
      if (!this.hasClass('monk')) return;

      // Monk-specific logic
      return {
        extraAttacks: 1,
        penalty: -2,
        label: 'flurry'
      };
    }
  }
};
