// path: bundles/my-d20-bundle/lib/loaders/CommandMetadataValidator.js

'use strict';

const { Logger } = require('ranvier');

module.exports = {
  validate(name, cmd) {
    if (!cmd.usage) {
      Logger.warn(`COMMAND-METADATA: [${name}] is missing 'usage'.`);
    }

    if (!cmd.category) {
      Logger.warn(`COMMAND-METADATA: [${name}] is missing 'category'.`);
    }

    if (!Array.isArray(cmd.tags)) {
      Logger.warn(`COMMAND-METADATA: [${name}] should define 'tags' as an array.`);
    }
  }
};
