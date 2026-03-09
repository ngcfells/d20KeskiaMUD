// bundles/classes/scripts/familiar.js
'use strict';

module.exports = {
  summonFamiliar(state, player) {
    if (player.getMeta('familiarId')) {
      return player.say('You already have a familiar.');
    }

    const room = player.room;
    const familiar = state.MobFactory.create(room, 'wizard_familiar'); // define this mob in your mobs data

    familiar.follow(player);
    player.setMeta('familiarId', familiar.uuid);

    player.say('<green>Your familiar appears and attends you.</green>');
  },

  onLevelUp(state, player, newLevel) {
    const familiarId = player.getMeta('familiarId');
    if (!familiarId) return;

    const familiar = state.MobManager.get(familiarId);
    if (!familiar) return;

    // simple scaling; you can make this more 3.5-accurate
    familiar.level = Math.max(1, Math.floor(newLevel * 0.75));
  }
};
