'use strict';

const { Broadcast: B, Logger } = require('ranvier');
const D20CombatManager = require('../../lib/combat/combat-manager');
const CombatErrors = require('../../lib/combat/CombatErrors');

module.exports = {
  usage: 'consider <target>',
  command: state => (args, player) => {

    if (!args || !args.length) {
      return B.sayAt(player, 'Who do you want to size up?');
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
      return B.sayAt(player, "You can't size them up.");
    }

    if (!target) {
      return B.sayAt(player, "They aren't here.");
    }

    // ─────────────────────────────────────────────
    // Modern CR comparison using attributes
    // ─────────────────────────────────────────────
    const playerPower =
      (player.getAttribute('strength') +
       player.getAttribute('dexterity') +
       player.getAttribute('constitution')) / 3;

    const targetPower =
      (target.getAttribute('strength') +
       target.getAttribute('dexterity') +
       target.getAttribute('constitution')) / 3;

    const diff = targetPower - playerPower;

    let description = '';

    if (diff <= -6) {
      description = "They are much weaker than you.";
    } else if (diff <= -3) {
      description = "They seem weaker than you.";
    } else if (diff < 3) {
      description = "You seem evenly matched.";
    } else if (diff < 6) {
      description = "They look stronger than you.";
    } else {
      description = "They are far stronger than you. This could end badly.";
    }

    return B.sayAt(player, description);
  }
};
