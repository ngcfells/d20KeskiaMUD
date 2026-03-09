/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/hack.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'hack' ],
  usage: 'hack <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: hack <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = parts.map(s => s.toLowerCase());

    if (!skillManager.isValidSpecialty('computer_use', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid hacking specialty path.");
    }

    const dc = dcTables.getDC('computer_use', specialtyPath, difficulty);

    const result = skillCheck.check(player, 'computer_use', specialtyPath, dc);

    Broadcast.sayAt(player, `Hacking: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
