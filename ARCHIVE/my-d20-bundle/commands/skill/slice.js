/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/slice.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */
'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'slice' ],
  usage: 'slice <difficulty>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;

    const difficulty = args || 'moderate';
    const specialtyPath = [ 'slicing' ];

    const dc = dcTables.getDC('computer_use', specialtyPath, difficulty);

    const result = skillCheck.check(player, 'computer_use', specialtyPath, dc);

    Broadcast.sayAt(player, `Slicing Attempt`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
