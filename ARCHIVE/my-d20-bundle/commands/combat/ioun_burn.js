/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/combat/ioun_burn.js
 * PURPOSE: Destroy an orbiting stone for a temporary massive buff.
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'ioun burn <stone> [--confirm]',
  command: state => (args, player) => {
    if (!args.length) return B.sayAt(player, "Burn which orbiting stone?");

    const parts = args.split(' ');
    const confirm = parts.includes('--confirm');
    const search = parts.filter(p => p !== '--confirm').join(' ');

    const orbiting = player.equipment.get('ioun') || [];
    const stone = ArgParser.parseDot(search, orbiting);

    if (!stone) return B.sayAt(player, "You don't have that stone in your orbit.");

    if (!confirm) {
      B.sayAt(player, `<red>WARNING: Burning ${ItemUtil.display(stone)} will PERMANENTLY DESTROY it.</red>`);
      return B.sayAt(player, `Type '<b>ioun burn ${search} --confirm</b>' to proceed.`);
    }

    // 1. Determine the Burn Benefit based on Shape or Color
    // Logic: +4 to a stat for 1 minute (d20 standard "Burst")
    const statToBoost = stone.metadata.stats ? Object.keys(stone.metadata.stats)[0] : 'strength';
    const boostAmount = 4;

    // 2. Destroy the Stone
    player.equipment.set('ioun', orbiting.filter(s => s !== stone));
    state.ItemManager.remove(stone);

    // 3. Apply the Burn Effect
    const burnEffect = state.EffectFactory.create('ioun_burn_surge', {
      duration: 60000, // 1 minute
      state: { stat: statToBoost, amount: boostAmount }
    });
    
    player.addEffect(burnEffect);

    B.sayAt(player, `<bold><red>The ${ItemUtil.display(stone)} flares with blinding white light and SHATTERS!</red></bold>`);
    B.sayAt(player, `<yellow>A surge of raw energy flows into your ${statToBoost}!</yellow>`);
    
    // 4. Emit unequip to trigger weight/resonance recalculation
    player.emit('unequip', 'ioun', stone);
  }
};
