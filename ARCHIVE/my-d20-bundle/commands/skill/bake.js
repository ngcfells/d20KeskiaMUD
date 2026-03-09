/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/bake.js
 * PURPOSE: Perform a baking action using Craft → cooking/baking specialties.
 */

'use strict';

const { Broadcast } = require('ranvier');

/**
 * BAKING SKILL COMMAND
 * Usage: bake <specialty path> <difficulty>
 *
 * Examples:
 *   bake bread moderate
 *   bake pastries hard
 *   bake cakes very_hard
 *
 * This is a pure skill check command.
 * It does NOT consume materials or produce items.
 * It simply performs a Craft (cooking → baking) check.
 */

module.exports = {
  aliases: ['bake'],
  usage: 'bake <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;
    const synergy = state.Synergy;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: bake <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);

    // Last argument is difficulty
    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = ['cooking', 'baking', ...parts.map(s => s.toLowerCase())];

    if (!skillManager.isValidSpecialty('craft', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid baking specialty path.");
    }

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Baking: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
