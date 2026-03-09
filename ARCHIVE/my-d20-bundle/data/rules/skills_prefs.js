// bundles/classes/scripts/skill_prefs.js
'use strict';

module.exports = {
  addSkillBonus(player, skillId, amount) {
    const bonuses = player.getMeta('skillBonuses') || {};
    bonuses[skillId] = (bonuses[skillId] || 0) + amount;
    player.setMeta('skillBonuses', bonuses);
  },

  getSkillBonus(player, skillId) {
    const bonuses = player.getMeta('skillBonuses') || {};
    return bonuses[skillId] || 0;
  }
};
