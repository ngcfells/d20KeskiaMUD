// path: bundles/my-d20-bundle/lib/commands/Errors.js

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  cannot(player, action) {
    B.sayAt(player, `<red>You cannot ${action}.</red>`);
  },

  notFound(player, thing) {
    B.sayAt(player, `<red>You cannot find ${thing}.</red>`);
  },

  requires(player, requirement) {
    B.sayAt(player, `<red>You require ${requirement}.</red>`);
  }
};
