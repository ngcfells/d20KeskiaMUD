// path: bundles/my-d20-bundle/lib/prerequisites/Require.js

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  roomFeature(player, feature) {
    if (!player.room || !player.room.metadata || !player.room.metadata[feature]) {
      B.sayAt(player, `<red>This action requires: ${feature}</red>`);
      return false;
    }
    return true;
  },

  skill(player, skillId) {
    const skill = player.getSkill(skillId);
    if (!skill || skill.rank <= 0) {
      B.sayAt(player, `<red>You lack the required skill: ${skillId}</red>`);
      return false;
    }
    return true;
  },

  deciphered(state, player, textId) {
    if (!state.LibraryManager.isDeciphered(player, textId)) {
      B.sayAt(player, `<red>You cannot read that text.</red>`);
      return false;
    }
    return true;
  }
};
