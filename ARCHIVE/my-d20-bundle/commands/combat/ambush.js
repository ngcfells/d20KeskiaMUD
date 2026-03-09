'use strict';

const { Broadcast: B } = require('ranvier');

/**
 * AMBUSH — Launch an attack from stealth, leveraging your stealth level.
 *
 * Usage:
 *   ambush <target>
 *
 * Behavior:
 *   - Requires stealth level >= 2 (hidden or better).
 *   - Uses stealth level to determine surprise, initiative, and attack bonuses.
 *   - Integrates with tracking and traps for additional bonuses.
 */

module.exports = {
  aliases: [ 'ambush' ],
  usage: 'ambush <target>',
  command: state => (args, player) => {
    const targetName = args.trim();
    if (!targetName) {
      return B.sayAt(player, "Ambush whom?");
    }

    const room = player.room;
    if (!room) {
      return B.sayAt(player, "You can't ambush anyone here.");
    }

    const level = player.getMeta('stealth.level') || 0;
    const stateName = player.getMeta('stealth.state') || 'visible';

    if (level < 2) {
      return B.sayAt(player, "You are not hidden well enough to set up an ambush.");
    }

    const target =
      state.ArgParser.parseDot(targetName, room.npcs) ||
      state.ArgParser.parseDot(targetName, room.players);

    if (!target) {
      return B.sayAt(player, "They are not here.");
    }

    if (target === player) {
      return B.sayAt(player, "Ambushing yourself would be... impressive, but no.");
    }

    const SkillCheck = state.SkillCheck;
    const Synergy = state.Synergy;
    const TrapManager = state.TrapManager;

    // --- Surprise / detection check ---
    const perceptionDC = 10 + (level * 5);
    let circumstance = 0;

    // Tracking synergy: if player has been tracking this target
    const trackingSynergy = Synergy.getBonus(player, 'survival', ['tracking']);
    circumstance += trackingSynergy;

    // Buffs from spells, feats, items, etc.
    circumstance += getStealthBuffsFromEffects(player);

    const detectionResult = SkillCheck.check(target, 'perception', [], perceptionDC, {
      circumstance: 0 // target's bonuses would go here
    });

    const surprised = !detectionResult.success;

    // --- Ambush bonuses based on stealth level ---
    const ambushBonuses = getAmbushBonuses(level);

    // Initiative bonus (you can integrate with your actual initiative system)
    player.setMeta('combat.initiative_bonus', (player.getMeta('combat.initiative_bonus') || 0) + ambushBonuses.initiative);

    // Attack/damage bonuses can be passed into your combat engine
    player.setMeta('combat.ambush_attack_bonus', ambushBonuses.attack);
    player.setMeta('combat.ambush_damage_dice', ambushBonuses.extraDamageDice);

    if (surprised) {
      B.sayAt(player, `<green>You spring from ${stateName} and catch ${target.name} completely off guard!</green>`);
      B.sayAt(target, `<red>You are caught in a sudden ambush!</red>`);
    } else {
      B.sayAt(player, `<yellow>You lunge from hiding at ${target.name}, but they were partially ready.</yellow>`);
      B.sayAt(target, `<yellow>You narrowly avoid being fully surprised by an ambush!</yellow>`);
    }

    // Optional: trap synergy — if a trap is present and owned by player, grant extra bonuses
    const traps = TrapManager.getTraps(room);
    for (const trap of Object.values(traps)) {
      if (!trap.armed) continue;
      if (trap.owner !== player.uuid) continue;

      // Simple example: extra damage die if target is in trap's area
      player.setMeta('combat.ambush_damage_dice', (player.getMeta('combat.ambush_damage_dice') || 0) + 1);
      break;
    }

    // Consume some stealth: ambushing reveals you
    player.setMeta('stealth.level', 0);
    player.setMeta('stealth.state', 'visible');

    // Hand off to your actual attack/combat command
    const attackCommand = state.CommandManager.get('attack') || state.CommandManager.get('kill');
    if (attackCommand) {
      attackCommand.execute(targetName, player);
    } else {
      B.sayAt(player, "You attempt to attack, but no combat command is wired in.");
    }
  }
};

function getAmbushBonuses(level) {
  switch (level) {
    case 2:
      return { initiative: 2, attack: 1, extraDamageDice: 1 };
    case 3:
      return { initiative: 4, attack: 2, extraDamageDice: 2 };
    case 4:
      return { initiative: 6, attack: 3, extraDamageDice: 3 };
    default:
      return { initiative: 0, attack: 0, extraDamageDice: 0 };
  }
}

function getStealthBuffsFromEffects(player) {
  let bonus = 0;

  const effects = player.effects || [];
  for (const effect of effects) {
    const id = effect.id || effect.config && effect.config.id;
    if (!id) continue;

    if (id === 'spell_invisibility') bonus += 10;
    if (id === 'spell_greater_invisibility') bonus += 15;
    if (id === 'spell_pass_without_trace') bonus += 5;
    if (id === 'power_psionic_chameleon') bonus += 5;
    if (id === 'force_cloak') bonus += 10;
    if (id === 'feat_stealthy') bonus += 2;
    if (id === 'item_cloak_of_elvenkind') bonus += 5;
    if (id === 'item_stealth_field_generator') bonus += 8;
  }

  const armorPenalty = player.getMeta('armor_check_penalty') || 0;
  bonus -= Math.abs(armorPenalty);

  return bonus;
}
