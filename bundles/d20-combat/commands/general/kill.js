'use strict';

const { Broadcast: B, Logger } = require('ranvier');
const D20CombatManager = require('../../lib/combat-manager');
const CombatErrors = require('../../lib/combat/CombatErrors');

module.exports = {
  aliases: ['attack', 'slay', 'hit'],
  usage: 'kill <target>',
  command: state => (args, player) => {

    args = args.trim();
    if (!args.length) {
      return B.sayAt(player, 'Kill whom?');
    }

    let target = null;

    try {
      target = D20CombatManager.findCombatant(player, args);
    } catch (e) {
      if (
        e instanceof CombatErrors.CombatSelfError ||
        e instanceof CombatErrors.CombatNonPvpError ||
        e instanceof CombatErrors.CombatInvalidTargetError ||
        e instanceof CombatErrors.CombatPacifistError
      ) {
        return B.sayAt(player, e.message);
      }

      Logger.error(e.message);
      return B.sayAt(player, "You cannot attack them.");
    }

    if (!target) {
      return B.sayAt(player, "They aren't here.");
    }

    // ─────────────────────────────────────────────
    // Initiate D20 Combat (initiative + round loop)
    // ─────────────────────────────────────────────
    D20CombatManager.startCombat(player, target);

    // ─────────────────────────────────────────────
    // Feedback
    // ─────────────────────────────────────────────
    B.sayAt(player, `<red>You engage ${target.name} in combat!</red>`);
    B.sayAtExcept(player.room, `${player.name} attacks ${target.name}!`, [player, target]);

    if (!target.isNpc) {
      B.sayAt(target, `<red>${player.name} attacks you!</red>`);
    }
  }
};
