// bundles/classes/scripts/weapon_prefs.js
'use strict';

module.exports = {
  /**
   * Set the player's favored weapon for feats like Weapon Focus, Weapon Specialization, etc.
   */
  setFavoredWeapon(player, weaponId) {
    player.setMeta('favoredWeapon', weaponId);
  },

  /**
   * Get the player's favored weapon id.
   */
  getFavoredWeapon(player) {
    return player.getMeta('favoredWeapon') || null;
  },

  /**
   * Check if the currently wielded weapon matches the favored weapon.
   * You can adapt this to weapon groups (e.g., 'longsword', 'greatsword', etc.).
   */
  isUsingFavoredWeapon(player) {
    const favored = player.getMeta('favoredWeapon');
    if (!favored) return false;

    const weapon = player.getMeta('wieldedWeapon'); // or however you track it
    if (!weapon) return false;

    // simplest: compare weapon id
    return weapon === favored;
  }
};
