// path: bundles/my-d20-bundle/data/abilities/class/t/turn_undead.js
'use strict';

module.exports = {
  id: 'turn_undead',
  name: 'Turn Undead',
  type: 'supernatural',
  description: 'Channel divine energy to turn or rebuke undead and domain-specific creatures.',
  
  /**
   * Helper to calculate max uses based on d20 rules: 3 + Cha Modifier
   */
  getMaxUses: (player) => {
    const charismaMod = player.getModifier ? player.getModifier('charisma') : 0;
    // You could also check for 'Extra Turning' feat here
    const extraTurning = player.getMeta('feats.extra_turning') ? 4 : 0;
    return 3 + charismaMod + extraTurning;
  },

  /**
   * Logic to determine what creature types this specific player can turn
   */
  getTurnableTypes: (player, state) => {
    const types = ['undead'];
    const domains = player.getMeta('domains') || [];
    const domainList = require('../../../spelllists/cleric_domains');

    domains.forEach(domainId => {
      const domain = domainList[domainId];
      if (domain && domain.grantedPowers && domain.grantedPowers.turnTypes) {
        types.push(...domain.grantedPowers.turnTypes);
      }
    });
    return types;
  },

  getRebukableTypes: (player, state) => {
    const types = ['undead'];
    const domains = player.getMeta('domains') || [];
    const domainList = require('../../../spelllists/cleric_domains');

    domains.forEach(domainId => {
      const domain = domainList[domainId];
      if (domain && domain.grantedPowers && domain.grantedPowers.rebukeTypes) {
        types.push(...domain.grantedPowers.rebukeTypes);
      }
    });
    return types;
  }
};
