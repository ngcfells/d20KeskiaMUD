// path: bundles/my-d20-bundle/lib/commands/CommandLogger.js

'use strict';

const { Logger } = require('ranvier');

module.exports = {
  log(player, command, data = {}) {
    Logger.verbose(`[CMD] ${player.name} used ${command}: ${JSON.stringify(data)}`);
  }
};
