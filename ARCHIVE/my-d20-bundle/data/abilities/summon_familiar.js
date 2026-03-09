'use strict';

const { summonFamiliar } = require('../scripts/familiar');

module.exports = {
  id: 'summon_familiar',
  name: 'Summon Familiar',

  run: (state, player) => {
    summonFamiliar(state, player);
  }
};
