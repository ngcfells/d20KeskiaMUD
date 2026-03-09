/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/stamina.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const StaminaEngine = require('../../lib/d20/stamina-engine');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');

module.exports = {
  usage: 'stamina',
  command: state => (args, player) => {
    const current = player.getAttribute('stamina');
    const max = player.getMaxAttribute('stamina');
    const recovery = StaminaEngine.calculateRecovery(player);
    const weight = DimensionalInventory.getCarriedWeight(player);
    const strength = player.getAttribute('strength') || 10;

    const pct = Math.floor((current / max) * 100);
    const color = pct > 50 ? 'green' : (pct > 20 ? 'yellow' : 'red');

    B.sayAt(player, `<b><cyan>-- Stamina Status --</cyan></b>`);
    B.sayAt(player, `Current Pool: <${color}>${current} / ${max}</${color}> [${B.progress(20, pct, color)}]`);
    B.sayAt(player, `Recovery Rate: <white>${recovery} per tick</white>`);

    if (weight > (strength * 15)) {
      B.sayAt(player, "<red>! OVERBURDENED: Stamina recovery is halted.</red>");
    } else if (weight > (strength * 10)) {
      B.sayAt(player, "<yellow>! HEAVY LOAD: Recovery rate is halved.</yellow>");
    }

    if (player.hasEffect('resting')) {
      B.sayAt(player, "<cyan>* RESTING: Recovery rate is doubled.</cyan>");
    }
  }
};
