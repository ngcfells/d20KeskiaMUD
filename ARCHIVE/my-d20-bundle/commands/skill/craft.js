/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/craft.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */

'use strict';

const { Broadcast } = require('ranvier');

/**
 * CRAFT SKILL COMMAND (Skill Roll Only)
 * Usage: craft <specialty path> <difficulty>
 *
 * Examples:
 *   craft weaponsmithing moderate
 *   craft leatherworking hard
 *   craft woodworking easy
 *
 * This is NOT item crafting.
 * It is a pure Craft skill check.
 */

module.exports = {
  aliases: ['craft'],
  usage: 'craft <specialty path> <difficulty>',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;
    const synergy = state.Synergy;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: craft <specialty path> <difficulty>");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);
    const difficulty = parts.pop().toLowerCase();
    const specialtyPath = parts.map(s => s.toLowerCase());

    if (!skillManager.isValidSpecialty('craft', specialtyPath)) {
      return Broadcast.sayAt(player, "Invalid craft specialty path.");
    }

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Crafting: ${specialtyPath.join(' → ')}`);
    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
