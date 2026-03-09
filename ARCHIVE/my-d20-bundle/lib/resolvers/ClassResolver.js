'use strict';

class ClassResolver {
  static apply(state, player) {
    const classId = player.getMeta('class');
    if (!classId) return;

    const klass = state.ClassManager.get(classId);
    if (!klass) return;

    const config = klass.config || {};

    // Class skills
    if (config.classSkills) {
      player.setMeta('classSkills', config.classSkills);
    }

    // Proficiencies
    if (config.proficiencies) {
      const profs = player.getMeta('weaponProficiencies') || [];
      const armor = player.getMeta('armorProficiencies') || [];

      if (config.proficiencies.weapons) {
        player.setMeta(
          'weaponProficiencies',
          Array.from(new Set([...profs, ...config.proficiencies.weapons]))
        );
      }

      if (config.proficiencies.armor) {
        player.setMeta(
          'armorProficiencies',
          Array.from(new Set([...armor, ...config.proficiencies.armor]))
        );
      }
    }

    // Spellcasting metadata (progression, type, etc.)
    if (config.spellcasting) {
      player.setMeta('spellcasting', config.spellcasting);
    }
  }

  static reapply(state, character) {
    // optional: same pattern on load
  }
}

module.exports = ClassResolver;
