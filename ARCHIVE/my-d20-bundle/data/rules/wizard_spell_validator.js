// bundles/my-d20-bundle/data/rules/wizard_spell_validator.js
'use strict';

module.exports = {
  validateSpellForWizard(player, spell) {
    // expects spell.school and spell.level to be defined in your spell data
    const prohibited = player.getMeta('wizardProhibitedSchools') || [];

    if (spell.school && prohibited.includes(spell.school)) {
      return false;
    }

    // you can add more checks here (non-wizard spell lists, etc.)
    return true;
  }
};
