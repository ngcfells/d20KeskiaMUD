'use strict';

/**
 * Linguistics (Standalone Skill)
 * ------------------------------
 * Used for:
 *  - Deciphering texts
 *  - Translating languages
 *  - Identifying scripts
 *  - Understanding dialect drift
 *  - Recognizing linguistic families
 *  - Supporting the LibraryManager deciphering system
 *
 * This skill integrates with:
 *  - LanguageManager
 *  - ScriptRegistry
 *  - LanguageRelations (difficulty, intelligibility, synergies)
 */

module.exports = {
  name: 'Linguistics',
  type: 'skill',
  requiresTraining: false,

  /**
   * Perform a Linguistics check.
   * This is the canonical entry point used by LibraryManager.
   */
  check: (state, player, baseDC = 15, languageId = null, scriptId = null) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    let total = roll;

    // Base ranks
    const ranks = state.SkillManager.getRanks(player, 'linguistics') || 0;
    total += ranks;

    // INT modifier (default ability for Linguistics)
    const intScore = player.getAttribute('intelligence') || 10;
    const intMod = Math.floor((intScore - 10) / 2);
    total += intMod;

    // ───────────────────────────────────────────────
    //  LANGUAGE SYNERGIES
    // ───────────────────────────────────────────────
    if (languageId && state.LanguageRelations) {
      const synergies = state.LanguageRelations.getSynergies(languageId);
      for (const syn of synergies) {
        if (syn.bonus) {
          total += syn.bonus;
        }
        if (syn.bonusPerLanguage) {
          const known = Object.values(state.LanguageManager.progress || {})
            .filter(p => p.fluent).length;
          const bonus = Math.min(
            syn.bonusPerLanguage * known,
            syn.maxBonus || 5
          );
          total += bonus;
        }
      }
    }

    // ───────────────────────────────────────────────
    //  SCRIPT FAMILIARITY BONUS
    // ───────────────────────────────────────────────
    if (scriptId && state.ScriptRegistry) {
      const script = state.ScriptRegistry.getScript(scriptId);
      if (script) {
        if (script.complexity === 'low') total += 1;
        if (script.complexity === 'medium') total += 0;
        if (script.complexity === 'high') total -= 1;
        if (script.complexity === 'very_high') total -= 2;
      }
    }

    // ───────────────────────────────────────────────
    //  LANGUAGE FAMILY BONUS
    // ───────────────────────────────────────────────
    if (languageId && state.LanguageRelations) {
      const family = state.LanguageRelations.getFamilyByLanguage(languageId);
      if (family) {
        const knownLangs = Object.keys(state.LanguageManager.progress || {});
        const overlap = knownLangs.filter(l => family.members.includes(l));
        if (overlap.length > 0) {
          total += Math.min(overlap.length, 3); // up to +3
        }
      }
    }

    // ───────────────────────────────────────────────
    //  DIFFICULTY MODIFIER
    // ───────────────────────────────────────────────
    if (languageId && state.LanguageRelations) {
      const diff = state.LanguageRelations.getDifficulty(languageId);
      total -= (diff - 3); // difficulty 3 = baseline
    }

    return {
      roll,
      total,
      dc: baseDC,
      success: total >= baseDC
    };
  }
};
