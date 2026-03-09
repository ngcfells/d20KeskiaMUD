/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/skills/skill-manager.js
 * PURPOSE: Core manager for skills, specialties, and nested specialty resolution.
 */

'use strict';

const fs = require('fs');
const path = require('path');

class SkillManager {
  constructor() {
    this.skills = new Map();          // umbrella + standalone
    this.umbrellaSkills = new Set();  // skills with specialties
    this.standaloneSkills = new Set();
  }

  /**
   * Load all skills from the skills directory.
   * Supports:
   *  - umbrella skills (with nested specialties)
   *  - standalone skills
   */
  loadSkills(skillDir) {
    const files = fs.readdirSync(skillDir);

    for (const file of files) {
      if (!file.endsWith('.js')) continue;

      const skill = require(path.join(skillDir, file));

      this.skills.set(skill.id, skill);

      if (skill.hasSpecialties) {
        this.umbrellaSkills.add(skill.id);
      } else {
        this.standaloneSkills.add(skill.id);
      }
    }
  }

  /**
   * Check if a skill exists.
   */
  hasSkill(skillId) {
    return this.skills.has(skillId);
  }

  /**
   * Check if a skill is an umbrella skill.
   */
  isUmbrella(skillId) {
    return this.umbrellaSkills.has(skillId);
  }

  /**
   * Check if a skill is standalone.
   */
  isStandalone(skillId) {
    return this.standaloneSkills.has(skillId);
  }

  /**
   * Retrieve a skill definition.
   */
  getSkill(skillId) {
    return this.skills.get(skillId);
  }

  /**
   * Resolve a nested specialty path.
   * Example:
   *   umbrella: "craft"
   *   path: ["gunsmithing", "modern", "rifles"]
   *
   * Returns the final specialty node or null.
   */
  resolveSpecialty(skillId, specialtyPath) {
    const skill = this.skills.get(skillId);
    if (!skill || !skill.hasSpecialties) return null;

    let node = skill.specialties;

    for (const segment of specialtyPath) {
      if (!node[segment]) return null;
      node = node[segment];
    }

    return node;
  }

  /**
   * Validate a specialty path.
   */
  isValidSpecialty(skillId, specialtyPath) {
    return this.resolveSpecialty(skillId, specialtyPath) !== null;
  }

  /**
   * Get a player's ranks in a skill or specialty.
   * Supports:
   *   - standalone skills
   *   - umbrella skills
   *   - nested specialties
   */
  getRanks(player, skillId, specialtyPath = []) {
    if (!player || !player.skills) return 0;

    // Standalone skill
    if (this.isStandalone(skillId)) {
      return player.skills[skillId] || 0;
    }

    // Umbrella skill with no specialty
    if (specialtyPath.length === 0) {
      return player.skills[skillId] || 0;
    }

    // Nested specialty
    const key = this._specialtyKey(skillId, specialtyPath);
    return player.skills[key] || 0;
  }

  /**
   * Set ranks for a skill or specialty.
   */
  setRanks(player, skillId, specialtyPath, ranks) {
    if (!player.skills) player.skills = {};

    if (this.isStandalone(skillId)) {
      player.skills[skillId] = ranks;
      return;
    }

    if (specialtyPath.length === 0) {
      player.skills[skillId] = ranks;
      return;
    }

    const key = this._specialtyKey(skillId, specialtyPath);
    player.skills[key] = ranks;
  }

  /**
   * Generate a canonical key for nested specialties.
   * Example:
   *   craft → gunsmithing → modern → rifles
   * becomes:
   *   craft_gunsmithing_modern_rifles
   */
  _specialtyKey(skillId, specialtyPath) {
    return [skillId, ...specialtyPath].join('_');
  }

  /**
   * List all specialties under an umbrella skill.
   * Returns a nested object tree.
   */
  listSpecialties(skillId) {
    const skill = this.skills.get(skillId);
    if (!skill || !skill.hasSpecialties) return null;
    return skill.specialties;
  }

  /**
   * Flatten all specialty paths for an umbrella skill.
   * Example output:
   *   [
   *     ['gunsmithing'],
   *     ['gunsmithing', 'modern'],
   *     ['gunsmithing', 'modern', 'rifles'],
   *     ...
   *   ]
   */
  flattenSpecialties(skillId) {
    const skill = this.skills.get(skillId);
    if (!skill || !skill.hasSpecialties) return [];

    const results = [];

    const walk = (node, path) => {
      for (const key of Object.keys(node)) {
        const newPath = [...path, key];
        results.push(newPath);

        if (typeof node[key] === 'object' && Object.keys(node[key]).length > 0) {
          walk(node[key], newPath);
        }
      }
    };

    walk(skill.specialties, []);
    return results;
  }
}

module.exports = SkillManager;
