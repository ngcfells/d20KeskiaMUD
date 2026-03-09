'use strict';

const { Broadcast } = require('ranvier');

/**
 * Command: discharge <spell_id> [target]
 * Function: Spend stored levels from the 'Absorption' spell to cast without cost.
 * Action: Standard Action (Triggers Global Cooldown)
 */
module.exports = {
  usage: 'discharge <spell_id> [target]',
  command: (state) => (args, player) => {
    // 1. VALIDATION: Check for active absorption field
    const effect = player.effects.get('absorption_active');
    if (!effect) {
      return Broadcast.sayAt(player, "You have no stored magical energy to discharge.");
    }

    if (!args.length) {
      return Broadcast.sayAt(player, `You have ${effect.state.storedLevels} levels stored. Discharge which spell?`);
    }

    const [spellId, targetName] = args.split(' ');
    const spell = state.SpellManager.get(spellId);

    if (!spell) {
      return Broadcast.sayAt(player, "You don't know that spell or it doesn't exist.");
    }

    // 2. RESOURCE CHECK: Stored levels vs Spell level
    if (spell.level > effect.state.storedLevels) {
      return Broadcast.sayAt(player, `That spell requires ${spell.level} levels; you only have ${effect.state.storedLevels} stored.`);
    }

    // 3. ACTION ECONOMY: Check if player can act (Standard Action)
    if (player.hasTag('casting') || player.hasTag('global_cooldown')) {
      return Broadcast.sayAt(player, "You are not ready to manifest another spell yet.");
    }

    // 4. ANATOMY-BASED FLAVOR
    const race = player.getMeta('race') || 'humanoid';
    let emote = '';
    
    switch(race) {
      case 'thri_kreen':
        emote = "Your four antennae twitch as stolen magic flows into your primary hands.";
        break;
      case 'beholder':
        emote = "Your central eye pulses with a violet hue as stored energy vents through your stalks.";
        break;
      default:
        emote = "The shimmering distortion around your palms condenses into raw arcane power.";
    }

    // 5. EXECUTION
    Broadcast.sayAt(player, `<magenta>${emote}</magenta>`);
    Broadcast.sayAt(player, `<bold><cyan>You discharge ${spell.name}!</cyan></bold>`);
    Broadcast.sayAtExcept(player.room, `<magenta>Ethereal energy bleed from the air around ${player.name} into a manifest ${spell.name}!</magenta>`, [player]);

    // Deduct stored energy
    effect.state.storedLevels -= spell.level;

    // Execute spell via SpellResolver to handle targeting/saves
    // 'noCost: true' tells the manager to skip mana/slot deduction
    state.SpellResolver.resolve(spell, player, targetName, { 
      noCost: true,
      isDischarge: true 
    });

    // Trigger Global Cooldown (Standard Action)
    const gcd = state.EffectFactory.create('global_cooldown', { duration: 3000 });
    player.addEffect(gcd);
  }
};
