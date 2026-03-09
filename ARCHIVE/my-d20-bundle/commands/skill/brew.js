/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/brew.js
 * PURPOSE: Perform a brewing action using Craft → brewing specialties.
 */

'use strict';

const { Broadcast } = require('ranvier');

/**
 * BREWING SKILL COMMAND
 * Usage: brew <specialty path> <difficulty>
 *
 * Examples:
 *   brew ale moderate
 *   brew mead hard
 *   brew spirits very_hard
 *
 * Pure skill check. No materials or item creation.
 */

module.exports = {
  aliases: ['brew'],
  usage: 'brew <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;
    const synergy = state.Synergy;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: brew <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = ['brewing', ...parts.map(s => s.toLowerCase())];

    if (!skillManager.isValidSpecialty('craft', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid brewing specialty path.");
    }

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Brewing: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
