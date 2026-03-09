/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/decipher.js
 * PURPOSE: Perform a deciphering check using Knowledge or Spellcraft.
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'decipher' ],
  usage: 'decipher <difficulty>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;

    const difficulty = args || 'moderate';

    const skillId = 'spellcraft';
    const specialtyPath = [];

    const dc = dcTables.getDC(skillId, specialtyPath, difficulty);

    const result = skillCheck.check(player, skillId, specialtyPath, dc);

    Broadcast.sayAt(player, `Decipher Script`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
