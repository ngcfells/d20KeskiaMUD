// bundles/my-d20-bundle/behaviors/npc/wizard-specialization.js
'use strict';

const { schools } = require('../../data/rules/wizard_schools');

module.exports = {
  listeners: {
    playerEnter: state => function () {
      if (this.getMeta('class') !== 'wizard') return;

      if (!this.getMeta('wizardSchool')) {
        this.say('<cyan>You must choose a wizard school specialization.</cyan>');
        this.say(`Use: <white>chooseschool <schoolname></white>`);
        this.say(`Schools: ${Object.keys(schools).join(', ')}`);
      }
    },

    command: state => function (commandName, args) {
      if (commandName !== 'chooseschool') return;

      const choice = args.trim().toLowerCase();
      if (!schools[choice]) {
        return this.say(`Invalid school. Valid options: ${Object.keys(schools).join(', ')}`);
      }

      this.setMeta('wizardSchool', choice);
      this.setMeta('wizardProhibitedSchools', schools[choice].prohibited);

      this.say(`<green>You specialize in ${choice}.</green>`);
      if (schools[choice].prohibited.length) {
        this.say(`<red>Prohibited schools: ${schools[choice].prohibited.join(', ')}</red>`);
      }
    }
  }
};
