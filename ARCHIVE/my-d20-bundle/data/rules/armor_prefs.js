// bundles/classes/scripts/armor_prefs.js
'use strict';

module.exports = {
  addArmorProficiency(player, group) {
    const profs = player.getMeta('armorProficiencies') || [];
    if (!profs.includes(group)) profs.push(group);
    player.setMeta('armorProficiencies', profs);
  },

  hasArmorProficiency(player, group) {
    const profs = player.getMeta('armorProficiencies') || [];
    return profs.includes(group);
  }
};
