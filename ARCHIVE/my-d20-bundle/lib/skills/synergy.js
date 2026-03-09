/**
 * BUNDLE: my-d20-bundle
 * bundles/my-d20-bundle/lib/skills/synergy.js
 * PURPOSE: Synergy bonus engine for cross-skill and specialty interactions.
 */

'use strict';

/**
 * Synergy system for skills.
 *
 * Supports:
 *   - standalone → standalone
 *   - standalone → umbrella
 *   - umbrella → umbrella
 *   - umbrella → specialty
 *   - specialty → specialty
 *   - nested specialties
 *   - genre-specific synergy
 *
 * Usage:
 *   const bonus = state.Synergy.getBonus(player, skillId, specialtyPath);
 */

class Synergy {
  constructor(skillManager) {
    this.skillManager = skillManager;

    /**
     * SYNERGY RULES
     *
     * Format:
     *   {
     *     sourceSkill: {
     *       minRanks: X,
     *       bonus: Y,
     *       appliesTo: [
     *         { skill: 'targetSkill', specialty: ['path','to','node'] },
     *         ...
     *       ]
     *     }
     *   }
     *
     * Specialty path may be omitted for umbrella-wide synergy.
     */

    this.rules = {
      // --- CLASSIC D20 SYNERGIES ---
      search: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'disable_device' },
          { skill: 'investigate' }
        ]
      },

      bluff: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'diplomacy' },
          { skill: 'intimidate' }
        ]
      },

      sense_motive: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'diplomacy' },
          { skill: 'bluff' }
        ]
      },

      knowledge: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'spellcraft' },
          { skill: 'profession', specialty: ['engineer'] }
        ]
      },

      // --- CRAFT SYNERGIES ---
      craft: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'profession', specialty: ['mechanic'] },
          { skill: 'profession', specialty: ['engineer'] }
        ]
      },

      // Gunsmithing → Firearms
      craft_gunsmithing: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'demolitions' },
          { skill: 'profession', specialty: ['bounty_hunter'] }
        ]
      },

      // --- CYBERPUNK SYNERGIES ---
      computer_use_hacking: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'computer_use', specialty: ['netrunning'] },
          { skill: 'investigate' }
        ]
      },

      computer_use_netrunning: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'computer_use', specialty: ['security_systems'] }
        ]
      },

      // --- SCI-FI SYNERGIES ---
      computer_use_starship_systems: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'pilot', specialty: ['starship'] },
          { skill: 'profession', specialty: ['starship_engineer'] }
        ]
      },

      // --- STAR WARS SYNERGIES ---
      computer_use_slicing: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'computer_use', specialty: ['droid_programming'] },
          { skill: 'craft', specialty: ['gunsmithing', 'star_wars', 'blaster_mods'] }
        ]
      },

      // --- CTHULHU SYNERGIES ---
      knowledge_occultism: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'mythos_insight' },
          { skill: 'investigate' }
        ]
      },

      // --- POST-APOC SYNERGIES ---
      survival_scavenging: {
        minRanks: 5,
        bonus: 2,
        appliesTo: [
          { skill: 'craft', specialty: ['improvised'] },
          { skill: 'profession', specialty: ['scavenger'] }
        ]
      }
    };
  }

  /**
   * Get synergy bonus for a skill check.
   *
   * Returns total synergy bonus from all applicable rules.
   */
  getBonus(player, skillId, specialtyPath = []) {
    let total = 0;

    for (const [sourceKey, rule] of Object.entries(this.rules)) {
      const sourceRanks = this._getSourceRanks(player, sourceKey);
      if (sourceRanks < rule.minRanks) continue;

      for (const target of rule.appliesTo) {
        if (this._matchesTarget(skillId, specialtyPath, target)) {
          total += rule.bonus;
        }
      }
    }

    return total;
  }

  /**
   * Check if a synergy rule applies to the current skill + specialty.
   */
  _matchesTarget(skillId, specialtyPath, target) {
    if (skillId !== target.skill) return false;

    if (!target.specialty) return true;

    if (specialtyPath.length < target.specialty.length) return false;

    for (let i = 0; i < target.specialty.length; i++) {
      if (specialtyPath[i] !== target.specialty[i]) return false;
    }

    return true;
  }

  /**
   * Get ranks for a synergy source skill.
   * Handles umbrella + specialty keys.
   */
  _getSourceRanks(player, sourceKey) {
    const parts = sourceKey.split('_');
    const skillId = parts.shift();
    const specialtyPath = parts;

    return this.skillManager.getRanks(player, skillId, specialtyPath);
  }
}

module.exports = Synergy;

/*
6. Skill Synergies
✔ Linguistics + Arcana
+2 to decipher magical texts

+2 to translate arcane inscriptions

✔ Linguistics + History
+2 to decipher ancient scripts

+2 to research historical volumes

✔ Arcana + Spellcraft
+2 to identify spells in grimoires

+2 to scribe spells

✔ Engineering + Datapad Use
+2 to decrypt datapads

+2 to repair damaged holocrons

✔ Religion + Linguistics
+2 to decipher celestial/infernal texts
*/
