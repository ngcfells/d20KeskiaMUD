/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/pilot.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'pilot' ],
  usage: 'pilot <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: pilot <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = parts.map(s => s.toLowerCase());

    if (!skillManager.isValidSpecialty('pilot', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid pilot specialty path.");
    }

    const dc = dcTables.getDC('pilot', specialtyPath, difficulty);

    const result = skillCheck.check(player, 'pilot', specialtyPath, dc);

    Broadcast.sayAt(player, `Piloting: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
