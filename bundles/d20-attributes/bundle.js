'use strict';

module.exports = {
  name: 'd20-attributes',

  listeners: {
    stateReady: state => {
      const AttributeFactory = state.AttributeFactory;
      const attributes = require('./attributes');

      for (const def of attributes) {
        AttributeFactory.register(def.name, def);
      }

      state.Logger.info(`[d20-attributes] Registered ${attributes.length} attributes (stateReady).`);
    },
  },
};
