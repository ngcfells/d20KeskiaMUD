/**
 * prerequisiteExtractor.js
 * ------------------------
 * Converts raw prerequisite text into canonical prerequisite objects.
 *
 * Supports ALL attributes in the user's attribute model.
 */

const ATTRIBUTE_LIST = [
  // Core vitals
  "health", "powerPoints", "sanity", "stamina", "resolve",

  // Ability scores
  "strength", "dexterity", "constitution",
  "intelligence", "wisdom", "charisma", "appearance",

  // Saving throws
  "fortitude", "reflex", "will",

  // Armor types
  "armorKinetic", "armorBallistic", "armorEnergy",
  "damageReduction", "shielding",

  // Genre attributes
  "tech", "pilot", "cyberTolerance", "radiationResist",
  "grit", "quickdraw", "luck", "reputation",
  "forcePoints", "destinyPoints", "corruption",

  // Legacy
  "critical",

  // Speed
  "speed"
];

// Map abbreviations to canonical attributes
const ATTRIBUTE_ABBREVIATIONS = {
  str: "strength",
  dex: "dexterity",
  con: "constitution",
  int: "intelligence",
  wis: "wisdom",
  cha: "charisma",
  app: "appearance",
  fort: "fortitude",
  ref: "reflex",
  will: "will"
};

function normalizeAttributeName(raw) {
  const lower = raw.toLowerCase();

  // Abbreviations
  if (ATTRIBUTE_ABBREVIATIONS[lower]) {
    return ATTRIBUTE_ABBREVIATIONS[lower];
  }

  // Exact match
  const match = ATTRIBUTE_LIST.find(a => a.toLowerCase() === lower);
  if (match) return match;

  return null;
}

function parseAttributes(text) {
  const attributes = {};

  // Pattern: "Dex 13", "Tech 4", "Grit 1", "Fortitude 3"
  const regex = /\b([A-Za-z]+)\s+(\d+)\b/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const rawName = match[1];
    const value = parseInt(match[2], 10);

    const attr = normalizeAttributeName(rawName);
    if (attr) {
      attributes[attr] = Math.max(attributes[attr] || 0, value);
    }
  }

  return attributes;
}

function parseBaseAttackBonus(text) {
  const babMatch = text.match(/base attack bonus\s*\+?(\d+)/i);
  if (babMatch) return parseInt(babMatch[1], 10);

  const plusMatch = text.match(/\b\+(\d+)\s*base attack bonus\b/i);
  if (plusMatch) return parseInt(plusMatch[1], 10);

  return null;
}

function parseSkills(text) {
  const skills = {};
  const regex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+)\s+ranks?\b/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const name = match[1].toLowerCase().replace(/\s+/g, "_");
    const ranks = parseInt(match[2], 10);
    skills[name] = Math.max(skills[name] || 0, ranks);
  }

  return skills;
}

function parseFeats(text) {
  const feats = [];
  const segments = text.split(/[,;]+/);

  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;

    // Skip non-feat patterns
    if (/\b(Str|Dex|Con|Int|Wis|Cha|App)\b/i.test(trimmed)) continue;
    if (/base attack bonus/i.test(trimmed)) continue;
    if (/ranks?/i.test(trimmed)) continue;

    // Capitalized phrase = likely feat
    if (/^[A-Z]/.test(trimmed)) {
      feats.push(
        trimmed
          .toLowerCase()
          .replace(/[()]/g, "")
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
      );
    }
  }

  return feats;
}

function extractPrerequisites(rawText) {
  if (!rawText || !rawText.trim()) {
    return {
      baseAttackBonus: null,
      attributes: {},
      skills: {},
      feats: [],
      classFeatures: [],
      race: null,
      alignment: null
    };
  }

  const text = rawText.trim();

  return {
    baseAttackBonus: parseBaseAttackBonus(text),
    attributes: parseAttributes(text),
    skills: parseSkills(text),
    feats: parseFeats(text),
    classFeatures: [], // handled later in Step C.7
    race: null,        // handled later
    alignment: null    // handled later
  };
}

module.exports = {
  extractPrerequisites
};
