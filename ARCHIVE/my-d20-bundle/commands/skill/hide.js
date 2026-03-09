'use strict';

const { Broadcast: B } = require('ranvier');

/**
 * HIDE — Attempt to hide and gain a graded stealth level.
 *
 * Usage:
 *   hide
 *   hide in shadows
 *   hide in foliage
 *   hide behind <object>
 *
 * Stealth levels:
 *   0: visible
 *   1: concealed
 *   2: hidden
 *   3: deeply_hidden
 *   4: perfectly_hidden
 */

module.exports = {
  aliases: [ 'hide' ],
  usage: 'hide [in/behind <target>]',
  command: state => (args, player) => {
    const room = player.room;
    if (!room) {
      return B.sayAt(player, "There's nowhere to hide here.");
    }

    const SkillCheck = state.SkillCheck;
    const Synergy = state.Synergy;

    // --- Determine environment context ---
    const terrain = room.getMeta('terrain') || 'generic';
    const light = room.getMeta('light_level') || 'normal';
    const weather = room.getMeta('weather') || 'clear';

    // --- Base DC from DCTables (you can tune this) ---
    const dcTables = state.DCTables;
    const difficulty = 'moderate';
    const baseDC = dcTables.getDC('stealth', ['hide'], difficulty);

    // --- Circumstance modifiers from environment ---
    let circumstance = 0;

    // Terrain
    switch (terrain) {
      case 'forest':
      case 'jungle':
      case 'swamp':
        circumstance += 2;
        break;
      case 'desert':
      case 'open_plain':
        circumstance -= 2;
        break;
    }

    // Light
    switch (light) {
      case 'dark':
        circumstance += 4;
        break;
      case 'dim':
        circumstance += 2;
        break;
      case 'bright':
        circumstance -= 2;
        break;
    }

    // Weather
    switch (weather) {
      case 'fog':
      case 'heavy_rain':
      case 'snow':
        circumstance += 2;
        break;
    }

    // --- Synergy: Survival (camouflage) ---
    const specialtyPath = ['camouflage'];
    const survivalSynergy = Synergy.getBonus(player, 'survival', specialtyPath);
    circumstance += survivalSynergy;

    // --- Hooks for spells, powers, feats, items, etc. ---
    // You can centralize this later in a StealthManager if you like.
    const stealthBuffs = getStealthBuffsFromEffects(player);
    circumstance += stealthBuffs;

    // --- Perform Stealth check ---
    const result = SkillCheck.check(player, 'stealth', ['hide'], baseDC, {
      circumstance
    });

    // --- Map result to stealth level ---
    const rollTotal = result.total;
    let level = 0;
    if (rollTotal >= 30) {
      level = 4;
    } else if (rollTotal >= 20) {
      level = 3;
    } else if (rollTotal >= 10) {
      level = 2;
    } else if (rollTotal >= 5) {
      level = 1;
    } else {
      level = 0;
    }

    const stateName = getStealthStateName(level);

    player.setMeta('stealth.level', level);
    player.setMeta('stealth.state', stateName);
    player.setMeta('stealth.lastAction', Date.now());
    player.setMeta('stealth.environment', { terrain, light, weather });

    if (!result.success || level === 0) {
      B.sayAt(player, "You fail to find a good place to hide.");
      return;
    }

    B.sayAt(player, `You blend into your surroundings. Stealth state: <green>${stateName}</green> (level ${level}).`);
  }
};

/**
 * Map numeric level to string state.
 */
function getStealthStateName(level) {
  switch (level) {
    case 1: return 'concealed';
    case 2: return 'hidden';
    case 3: return 'deeply_hidden';
    case 4: return 'perfectly_hidden';
    default: return 'visible';
  }
}

/**
 * Aggregate stealth buffs from spells, powers, feats, items, etc.
 * This is a hook for your broader effect system.
 */
function getStealthBuffsFromEffects(player) {
  let bonus = 0;

  const effects = player.effects || [];
  for (const effect of effects) {
    const id = effect.id || effect.config && effect.config.id;

    if (!id) continue;

    // Examples; you can expand this table:
    if (id === 'spell_invisibility') bonus += 10;
    if (id === 'spell_greater_invisibility') bonus += 15;
    if (id === 'spell_pass_without_trace') bonus += 5;
    if (id === 'power_psionic_chameleon') bonus += 5;
    if (id === 'force_cloak') bonus += 10;
    if (id === 'feat_stealthy') bonus += 2;
    if (id === 'item_cloak_of_elvenkind') bonus += 5;
    if (id === 'item_stealth_field_generator') bonus += 8;
  }

  // Armor penalty example (you can refine this)
  const armorPenalty = player.getMeta('armor_check_penalty') || 0;
  bonus -= Math.abs(armorPenalty);

  return bonus;
}
