/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/cook.js
 * PURPOSE: Perform a cooking action using Craft or Profession specialties.
 */

'use strict';

const { Broadcast } = require('ranvier');

/**
 * COOKING SKILL COMMAND
 * Usage: cook <specialty path> <difficulty>
 *
 * Examples:
 *   cook stew moderate
 *   cook soup easy
 *   cook gourmet hard
 *
 * Pure skill check. No materials or item creation.
 */

module.exports = {
  aliases: ['cook'],
  usage: 'cook <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;
    const synergy = state.Synergy;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: cook <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = ['cooking', ...parts.map(s => s.toLowerCase())];

    if (!skillManager.isValidSpecialty('craft', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid cooking specialty path.");
    }

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Cooking: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
