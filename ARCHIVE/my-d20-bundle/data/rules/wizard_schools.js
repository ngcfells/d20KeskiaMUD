// bundles/my-d20-bundle/data/rules/wizard_schools.js
'use strict';

module.exports = {
  schools: {
    abjuration: {
      prohibited: ['evocation', 'necromancy']
    },
    conjuration: {
      prohibited: ['evocation', 'illusion']
    },
    divination: {
      prohibited: [] // bans only one school by rule; you can enforce that at choice time if desired
    },
    enchantment: {
      prohibited: ['necromancy', 'evocation']
    },
    evocation: {
      prohibited: ['conjuration', 'illusion']
    },
    illusion: {
      prohibited: ['evocation', 'necromancy']
    },
    necromancy: {
      prohibited: ['illusion', 'enchantment']
    },
    transmutation: {
      prohibited: ['necromancy', 'abjuration']
    }
  }
};
