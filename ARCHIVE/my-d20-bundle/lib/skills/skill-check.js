/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/skills/skill-check.js
 * PURPOSE: Skill check engine handling rolls, modifiers, and success resolution.
 *          Integrates with TrainingLogic for "Head vs. Wall" progression
 *          and emits events for the Quest System.
 */

'use strict';

const TrainingLogic = require('../d20/training-logic');
const DCTables = require('./dc-tables');
const Synergy = require('./synergy');

class SkillCheck {
  constructor(skillManager, config = {}) {
    this.skillManager = skillManager;
    this.dcTables = new DCTables();
    this.synergy = new Synergy(skillManager);

    this.config = Object.assign({
      natural1AutoFail: true,
      natural20AutoSuccess: true
    }, config);
  }

  /**
   * Perform a skill check.
   *
   * @param {Player} player
   * @param {string} skillId
   * @param {Array} specialtyPath
   * @param {number|null} dc - If null/undefined, use DCTables
   * @param {Object} modifiers
   *   {
   *     feat, spell, circumstance,
   *     advantage, disadvantage,
   *     take10, take20,
   *     difficulty,      // for DCTables
   *     terrain          // for DCTables
   *   }
   */
  check(player, skillId, specialtyPath = [], dc = null, modifiers = {}) {
    const breakdown = {};
    const skillDef = this.skillManager.getSkill(skillId);

    // --- 0. TRAINED-ONLY ENFORCEMENT ---
    const ranks = this.skillManager.getRanks(player, skillId, specialtyPath);
    if (skillDef?.trainedOnly && ranks <= 0) {
      return {
        roll: 0,
        total: 0,
        success: false,
        breakdown: {
          note: 'Untrained: this skill requires ranks to attempt',
          trainedOnly: true
        }
      };
    }

    // --- 1. ROLL THE D20 (adv/disadv/take10/take20) ---
    const roll = this._rollD20(modifiers);
    breakdown.roll = roll;

    // --- 1.5 RESOLVE DC (if not explicitly provided) ---
    const difficulty = modifiers.difficulty || 'moderate';
    const terrain = modifiers.terrain || 'NONE';
    const resolvedDc = (dc === null || dc === undefined)
      ? this.dcTables.getDC(player, skillId, specialtyPath, difficulty, terrain)
      : dc;

    // --- NATURAL 1: AUTOMATIC FAILURE ---
    if (this.config.natural1AutoFail && roll === 1 && !modifiers.take10 && !modifiers.take20) {
      TrainingLogic.practice(player, 'skills', skillId, resolvedDc);
      player.emit('practice', 'skills', skillId);

      return {
        roll,
        total: roll,
        success: false,
        breakdown: Object.assign(breakdown, {
          dc: resolvedDc,
          note: 'Natural 1: automatic failure'
        })
      };
    }

    // --- NATURAL 20: AUTOMATIC SUCCESS ---
    if (this.config.natural20AutoSuccess && roll === 20 && !modifiers.take10 && !modifiers.take20) {
      TrainingLogic.practice(player, 'skills', skillId, resolvedDc * 2);
      player.emit('practice', 'skills', skillId);

      return {
        roll,
        total: roll + 20,
        success: true,
        breakdown: Object.assign(breakdown, {
          dc: resolvedDc,
          note: 'Natural 20: automatic success'
        })
      };
    }

    // --- 2. ABILITY MODIFIER ---
    const abilityMod = this._getAbilityModifier(player, skillId);
    breakdown.abilityMod = abilityMod;

    // --- 3. SKILL RANKS ---
    breakdown.ranks = ranks;

    // --- 4. RACIAL / CLASS / SYNERGY / EXTERNAL MODIFIERS ---
    const racialMods = player.getMeta('skillBonuses') || {};
    const racialMod = racialMods[skillId] || 0;
    breakdown.racialMod = racialMod;

    let classSkillMod = 0;
    const classSkills = player.getMeta('classSkills') || [];
    if (classSkills.includes(skillId) && ranks > 0) {
      classSkillMod = 3;
    }
    breakdown.classSkillMod = classSkillMod;

    const synergyMod = this.synergy.getBonus(player, skillId, specialtyPath);
    breakdown.synergyMod = synergyMod;

    const featMod = modifiers.feat || 0;
    const spellMod = modifiers.spell || 0;
    const circumstanceMod = modifiers.circumstance || 0;

    breakdown.featMod = featMod;
    breakdown.spellMod = spellMod;
    breakdown.circumstanceMod = circumstanceMod;

    // --- 4.5 ARMOR CHECK PENALTY (ACP) ---
    let acpMod = 0;
    if (skillDef && ['strength', 'dexterity'].includes(skillDef.ability)) {
      const Defense = require('../combat/defense');
      acpMod = Defense.getACP(player) || 0; // already ≤ 0
    }
    breakdown.acpMod = acpMod;

    // --- 5. CALCULATE TOTAL ---
    const total = roll
      + abilityMod
      + ranks
      + racialMod
      + classSkillMod
      + synergyMod
      + featMod
      + spellMod
      + circumstanceMod
      + acpMod;

    breakdown.total = total;

    // --- 6. DETERMINE SUCCESS ---
    const success = total >= resolvedDc;
    breakdown.dc = resolvedDc;
    breakdown.success = success;

    // --- 7. HEAD VS WALL TRAINING LOGIC ---
    if (!modifiers.take10 && !modifiers.take20 && roll > 1 && roll < 20) {
      const practiceDC = success ? resolvedDc : Math.floor(resolvedDc / 2);
      TrainingLogic.practice(player, 'skills', skillId, practiceDC);

      if (success && roll >= 15 && skillDef?.ability) {
        TrainingLogic.practice(player, 'attributes', skillDef.ability, 5);
        player.emit('practice', 'attributes', skillDef.ability);
      }
    }

    // --- FINAL QUEST SYSTEM HOOK ---
    player.emit('practice', 'skills', skillId);

    return {
      roll,
      total,
      success,
      breakdown
    };
  }

  _rollD20(modifiers = {}) {
    if (modifiers.take10) return 10;
    if (modifiers.take20) return 20;

    const a = this._d20();
    const b = this._d20();

    if (modifiers.advantage) return Math.max(a, b);
    if (modifiers.disadvantage) return Math.min(a, b);

    return a;
  }

  _d20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  _getAbilityModifier(player, skillId) {
    const skill = this.skillManager.getSkill(skillId);
    if (!skill || !skill.ability) return 0;

    const score = player.getAttribute(skill.ability);
    return Math.floor((score - 10) / 2);
  }
}

module.exports = SkillCheck;
