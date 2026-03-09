// bundles/my-d20-bundle/behaviors/npc/stance.js
'use strict';

const { stances } = require('../../data/stances');

module.exports = {
  listeners: {
    playerEnter: state => function () {
      if (!this.getMeta('stance')) {
        this.setMeta('stance', 'neutral');
      }
    },

    command: state => function (commandName, args) {
      if (commandName !== 'stance') return;

      const choice = args.trim().toLowerCase();
      if (!stances[choice]) {
        return this.say(`Valid stances: ${Object.keys(stances).join(', ')}`);
      }

      this.setMeta('stance', choice);
      this.say(`<cyan>You shift into the ${choice} stance.</cyan>`);
    }
  }
};
