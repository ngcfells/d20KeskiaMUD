/**
 * BUNDLE: skills (commands)
 * PATH: bundles/skills/commands/skill/check.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  aliases: [ 'check' ],
  usage: 'check <skill> [specialty path] [difficulty]',
  command: state => (player, args) => {
    const skillManager = state.SkillManager;
    const skillCheck = state.SkillCheck;
    const dcTables = state.DCTables;
    const synergy = state.Synergy;

    if (!args) {
      return Broadcast.sayAt(player, "Usage: check <skill> [specialty path] [difficulty]");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);
    const skillId = parts.shift().toLowerCase();

    if (!skillManager.hasSkill(skillId)) {
      return Broadcast.sayAt(player, `Unknown skill: ${skillId}`);
    }

    // Last argument may be a difficulty tier
    let difficulty = 'moderate';
    const last = parts[parts.length - 1];

    const difficultyTiers = [
      'trivial','easy','moderate','hard','very_hard','extreme','legendary','impossible'
    ];

    if (difficultyTiers.includes(last)) {
      difficulty = last;
      parts.pop();
    }

    const specialtyPath = parts.map(s => s.toLowerCase());

    if (specialtyPath.length > 0 && !skillManager.isValidSpecialty(skillId, specialtyPath)) {
      return Broadcast.sayAt(player, `Invalid specialty path for ${skillId}.`);
    }

    const dc = dcTables.getDC(skillId, specialtyPath, difficulty);

    const synergyBonus = synergy.getBonus(player, skillId, specialtyPath);

    const result = skillCheck.check(player, skillId, specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Skill Check: ${skillId}`);
    if (specialtyPath.length) {
      Broadcast.sayAt(player, `Specialty: ${specialtyPath.join(' → ')}`);
    }

    Broadcast.sayAt(player, `Roll: ${result.roll}`);
    Broadcast.sayAt(player, `Total: ${result.total}`);
    Broadcast.sayAt(player, `DC: ${dc}`);
    Broadcast.sayAt(player, `Success: ${result.success ? 'Yes' : 'No'}`);
  }
};
