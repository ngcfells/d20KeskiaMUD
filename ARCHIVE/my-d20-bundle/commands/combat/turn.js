'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  aliases: ['rebuke', 'bolster'],
  usage: 'turn',
  group: 'cleric',
  command: state => (args, player) => {
    const ability = state.AbilityManager.get('turn_undead');
    if (!ability) return B.sayAt(player, "You do not have the ability to turn or rebuke.");

    // 1. Resource Management
    const maxUses = ability.getMaxUses(player);
    const currentUses = player.getMeta('resources.turn_uses') || 0;

    if (currentUses >= maxUses) {
      return B.sayAt(player, "You must rest to replenish your divine channelings.");
    }

    // 2. Alignment Check (Good/Neutral turn, Evil rebukes)
    const isGood = player.getMeta('alignment') >= 0;
    const validTypes = isGood ? 
      ability.getTurnableTypes(player, state) : 
      ability.getRebukableTypes(player, state);

    // 3. Target Detection
    const targets = player.room.npcs.filter(npc => 
      validTypes.includes(npc.getMeta('entityType'))
    );

    if (!targets.length) {
      return B.sayAt(player, "There are no suitable creatures here to channel against.");
    }

    // 4. Execution
    B.sayAt(player, `<yellow>You present your holy symbol and channel the power of your faith!</yellow>`);
    
    // Turning Check & Damage Rolls
    const turnCheck = Math.floor(Math.random() * 20) + 1 + player.getModifier('charisma');
    let hdPool = (Math.floor(Math.random() * 6) + 1) + 
                 (Math.floor(Math.random() * 6) + 1) + 
                 player.level + player.getModifier('charisma');

    targets.sort((a, b) => a.level - b.level);

    for (const target of targets) {
      if (target.level > turnCheck) continue;
      if (hdPool < target.level) break;

      hdPool -= target.level;

      if (isGood) {
        handleTurn(state, player, target);
      } else {
        handleRebuke(state, player, target);
      }
    }

    player.setMeta('resources.turn_uses', currentUses + 1);
  }
};

function handleTurn(state, player, target) {
  if (player.level >= target.level * 2) {
    B.sayAt(player, `<bold><white>${target.name} shatters into dust!</white></bold>`);
    return target.die();
  }
  
  // Use your tiered fear system
  const frightened = state.EffectFactory.create('fear', target, { tier: 3, duration: 60000 });
  if (target.addEffect(frightened)) {
    B.sayAt(player, `<white>${target.name} flees in terror!</white>`);
    target.emit('flee');
  }
}

function handleRebuke(state, player, target) {
  if (player.level >= target.level * 2) {
    B.sayAt(player, `<bold><magenta>${target.name} falls under your command!</magenta></bold>`);
    // Logic for 'commanded' effect goes here
  } else {
    // Tier 5 is Cowering in your system
    const cowering = state.EffectFactory.create('fear', target, { tier: 5, duration: 60000 });
    target.addEffect(cowering);
    B.sayAt(player, `<magenta>${target.name} cowers in unholy awe!</magenta>`);
  }
}
