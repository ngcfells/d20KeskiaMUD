// path: bundles/my-d20-bundle/lib/commands/Msg.js

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  success(player, msg) {
    B.sayAt(player, `<green>${msg}</green>`);
  },

  error(player, msg) {
    B.sayAt(player, `<red>${msg}</red>`);
  },

  info(player, msg) {
    B.sayAt(player, `<cyan>${msg}</cyan>`);
  },

  action(player, msg) {
    B.sayAt(player, `<yellow>${msg}</yellow>`);
  }
};
