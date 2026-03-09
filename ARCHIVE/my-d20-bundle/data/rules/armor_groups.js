// bundles/classes/scripts/armor_groups.js
'use strict';

module.exports = {
  groups: {
    light: [
      'padded', 'leather', 'studded_leather', 'chain_shirt'
    ],
    medium: [
      'hide', 'scale_mail', 'chainmail', 'breastplate'
    ],
    heavy: [
      'splint_mail', 'banded_mail', 'half_plate', 'full_plate'
    ],
    shields: [
      'buckler', 'light_shield', 'heavy_shield'
    ],
    tower: [
      'tower_shield'
    ]
  },

  getArmorGroup(armorId) {
    for (const group in this.groups) {
      if (this.groups[group].includes(armorId)) {
        return group;
      }
    }
    return null;
  }
};
