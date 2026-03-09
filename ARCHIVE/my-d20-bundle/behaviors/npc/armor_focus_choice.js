// bundles/my-d20-bundle/behaviors/npc/armor_focus_choice.js
'use strict';

const { addArmorProficiency } = require('../../data/rules/armor_prefs');
const { groups } = require('../../data/rules/armor_groups');

module.exports = {
  listeners: {
    command: state => function (commandName, args) {
      if (commandName !== 'choosearmor') return;

      const choice = args.trim().toLowerCase();
      if (!groups[choice]) {
        return this.say(`Valid armor groups: ${Object.keys(groups).join(', ')}`);
      }

      addArmorProficiency(this, choice);
      this.say(`<cyan>You gain proficiency with ${choice} armor.</cyan>`);
    }
  }
};
