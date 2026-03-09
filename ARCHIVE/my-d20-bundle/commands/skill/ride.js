/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/ride.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'ride' ],
  usage: 'ride <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: ride <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = parts.map(s => s.toLowerCase());

    if (!skillManager.isValidSpecialty('ride', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid ride specialty path.");
    }

    const dc = dcTables.getDC('ride', specialtyPath, difficulty);

    const result = skillCheck.check(player, 'ride', specialtyPath, dc);

    Broadcast.sayAt(player, `Riding: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
