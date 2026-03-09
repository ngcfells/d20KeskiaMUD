// bundles/classes/scripts/spell_school_prefs.js
'use strict';

module.exports = {
  setFavoredSchool(player, school) {
    player.setMeta('favoredSchool', school);
  },

  getFavoredSchool(player) {
    return player.getMeta('favoredSchool') || null;
  }
};
