'use strict';

module.exports = {
  name: 'lootable',

  listeners: {
    load: state => {
      state.Logger.info('[lootable] Loot system initialized.');
    },
  },
};
