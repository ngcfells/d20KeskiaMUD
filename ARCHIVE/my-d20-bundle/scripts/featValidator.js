"use strict";

/**
 * Post-validation for feat names coming back from the LLM
 * after sanitizeFeatNames().
 *
 * We enforce:
 * - Reasonable length
 * - No obvious plural "feats"
 * - No spell-like markers
 * - No chapter/section words
 */

function validateFeatName(name) {
  if (!name) return false;

  const n = String(name).trim();

  if (n.length < 3 || n.length > 80) return false;

  if (/feats$/i.test(n)) return false;

  if (/Level:|Components:|Casting Time:|Range:|Duration:|Saving Throw:|Spell Resistance:/i.test(n)) {
    return false;
  }

  if (/Chapter\s+\d+|Table\s+\d+/i.test(n)) return false;

  if (/Hit Die:|Class Skills|Skill Points at 1st Level/i.test(n)) return false;

  return true;
}

module.exports = { validateFeatName };
