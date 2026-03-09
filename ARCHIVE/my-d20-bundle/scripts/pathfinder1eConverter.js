/**
 * pathfinder1eConverter.js
 * ------------------------
 * Phase D: Converts Pathfinder 1E feats into the canonical D&D 3.5E baseline
 * used by the ingestion pipeline.
 *
 * This module:
 *   - Normalizes PF1 skill names to 3.5E skills
 *   - Normalizes PF1 prerequisites to 3.5E schema
 *   - Normalizes PF1 categories into Model‑2 categories
 *   - Leaves mechanicsHash + normalizedBenefit untouched (they are system‑agnostic)
 *
 * NOTE:
 *   This is the minimal viable PF1E → 3.5E converter.
 *   As we ingest more feats, we will expand:
 *     - SKILL_MAP
 *     - CLASS_FEATURE_MAP
 *     - BLOODLINE_MAP
 *     - ACTION_MAP
 *     - CMB/CMD → opposed checks
 *     - PF1 “traits” → 3.5E “general feats”
 */

const { normalizeId } = require("./idNormalizer");
const { normalizeCategory } = require("./categoryNormalizer");

/* -----------------------------------------
 * PF1 → 3.5E Skill Mapping
 * -----------------------------------------
 * PF1 collapses many 3.5 skills (e.g., Hide + Move Silently → Stealth).
 * We map PF1 skills to the closest 3.5E equivalents.
 */
const SKILL_MAP = {
  acrobatics: "tumble",
  perception: "spot",          // could split into spot/listen later
  stealth: "hide",             // could split into hide/move_silently later
  disable_device: "disable_device",
  spellcraft: "spellcraft",
  use_magic_device: "use_magic_device",
  knowledge_arcana: "knowledge_arcana",
  knowledge_religion: "knowledge_religion",
  knowledge_planes: "knowledge_planes",
  knowledge_nature: "knowledge_nature",
  knowledge_dungeoneering: "knowledge_dungeoneering",
  knowledge_local: "knowledge_local",
  knowledge_geography: "knowledge_geography",
  knowledge_history: "knowledge_history",
  // extend as needed
};

/* -----------------------------------------
 * PF1 → 3.5E Class Feature Mapping
 * -----------------------------------------
 * PF1 uses “bloodline”, “rage powers”, “discoveries”, etc.
 * We map only what we’ve seen so far; expand as needed.
 */
const CLASS_FEATURE_MAP = {
  "aberrant bloodline": "sorcerer_bloodline_aberrant",
  "wild shape": "wild_shape",
  "familiar": "familiar",
  "item mastery": "item_mastery",
  // extend as needed
};
/* -----------------------------------------
 * PF1 Saving Throw Detection
 * -----------------------------------------
 */
const SAVE_REGEX = {
  fortitude: /fortitude\s*\+?(\d+)/i,
  reflex: /reflex\s*\+?(\d+)/i,
  will: /will\s*\+?(\d+)/i
};

/* -----------------------------------------
 * Normalize PF1 skill prerequisites
 * -----------------------------------------
 */
function normalizeSkills(skills) {
  const out = {};
  for (const [name, ranks] of Object.entries(skills || {})) {
    const key = SKILL_MAP[name.toLowerCase()] || name.toLowerCase();
    out[key] = (out[key] || 0) + ranks;
  }
  return out;
}

/* -----------------------------------------
 * Normalize PF1 class feature prerequisites
 * -----------------------------------------
 */
function normalizeClassFeatures(features) {
  const out = [];
  for (const f of features || []) {
    const key = CLASS_FEATURE_MAP[f.toLowerCase()] || f.toLowerCase();
    out.push(key);
  }
  return out;
}

/* -----------------------------------------
 * Extract PF1 saving throw prerequisites
 * -----------------------------------------
 */
function extractSavingThrows(prereqText) {
  const out = {};

  if (!prereqText || typeof prereqText !== "string") return out;

  for (const [save, regex] of Object.entries(SAVE_REGEX)) {
    const match = prereqText.match(regex);
    if (match) {
      out[save] = parseInt(match[1], 10);
    }
  }

  return out;
}


/* -----------------------------------------
 * Convert PF1 prerequisites → 3.5E schema
 * -----------------------------------------
 */
function convertPrerequisitesPf1To35(pr) {
  if (!pr) return pr;

  return {
    baseAttackBonus: pr.baseAttackBonus ?? null,
    attributes: {
        ...(pr.attributes || pr.abilityScores || {}),
        ...extractSavingThrows(pr.raw || pr.text || "")
    },
    skills: normalizeSkills(pr.skills || {}),
    feats: pr.feats || [],
    classFeatures: normalizeClassFeatures(pr.classFeatures || []),
    race: pr.race || null,
    alignment: pr.alignment || null
  };
}

/* -----------------------------------------
 * Main PF1 → 3.5E conversion entry point
 * -----------------------------------------
 */
function convertPathfinder1eFeat(incoming) {
  const id = normalizeId(incoming.name);

  const prerequisites = convertPrerequisitesPf1To35(incoming.prerequisites);

  const category = normalizeCategory(incoming.typeTag, {
    name: incoming.name
  });

  return {
    id,
    name: incoming.name,
    category,
    prerequisites,
    description: incoming.description,
    mechanicsHash: incoming.mechanicsHash,
    normalizedBenefit: incoming.normalizedBenefit,
    source: incoming.source
  };
}

module.exports = {
  convertPathfinder1eFeat
};
