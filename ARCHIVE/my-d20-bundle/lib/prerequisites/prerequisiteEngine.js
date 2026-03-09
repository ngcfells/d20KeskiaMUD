// BUNDLE: my-d20-bundle
// PATH: bundles/my-d20-bundle/lib/prerequisites/prerequisiteEngine.js
// PURPOSE: Centralized prerequisite evaluation engine for feats, classes, skills, and other systems.

/**
 * Prerequisite Engine
 * Evaluates structured feat prerequisites against an actor.
 */

module.exports = {
  check(actor, prereq) {
    if (!prereq) return { ok: true, failed: [] };
    const failed = [];

    if (prereq.attributes && !this.checkAttributes(actor, prereq.attributes)) failed.push("attributes");
    if (prereq.bab && !this.checkBAB(actor, prereq.bab)) failed.push("bab");
    if (prereq.level && !this.checkLevel(actor, prereq.level)) failed.push("level");
    if (prereq.class && !this.checkClass(actor, prereq.class)) failed.push("class");
    if (prereq.race && !this.checkRace(actor, prereq.race)) failed.push("race");
    if (prereq.skills && !this.checkSkills(actor, prereq.skills)) failed.push("skills");
    if (prereq.feats && !this.checkFeats(actor, prereq.feats)) failed.push("feats");
    if (prereq.weaponProficiency && !this.checkWeaponProficiency(actor, prereq.weaponProficiency)) failed.push("weaponProficiency");
    if (prereq.spellcasting && !this.checkSpellcasting(actor, prereq.spellcasting)) failed.push("spellcasting");
    if (prereq.special && !this.checkSpecial(actor, prereq.special)) failed.push("special");
    if (prereq.custom && !this.checkCustom(actor, prereq.custom)) failed.push("custom");

    return { ok: failed.length === 0, failed };
  },

  checkAttributes(actor, req) {
    for (const [attr, value] of Object.entries(req)) {
      if ((actor.attributes?.[attr] || 0) < value) return false;
    }
    return true;
  },

  checkBAB(actor, value) { return (actor.bab || 0) >= value; },
  checkLevel(actor, value) { return (actor.level || 0) >= value; },
  checkClass(actor, classes) { return classes.includes(actor.class); },
  checkRace(actor, races) { return races.includes(actor.race); },

  checkSkills(actor, req) {
    for (const [skill, value] of Object.entries(req)) {
      if ((actor.skills?.[skill] || 0) < value) return false;
    }
    return true;
  },

  checkFeats(actor, feats) { return feats.every(f => actor.feats?.includes(f)); },
  checkWeaponProficiency(actor, list) { return list.every(w => actor.weaponProficiencies?.includes(w)); },

  checkSpellcasting(actor, req) {
    if (req.arcane && !actor.spellcasting?.arcane) return false;
    if (req.divine && !actor.spellcasting?.divine) return false;
    if (req.level && (actor.spellcasting?.level || 0) < req.level) return false;
    return true;
  },

  checkSpecial(actor, list) { return list.every(s => actor.specialAbilities?.includes(s)); },

  checkClassRequirement(actor, classDef) {
    if (classDef.alignmentRequirement) {
      if (!classDef.alignmentRequirement.includes(actor.alignment)) {
        return false;
      }
    }
    return true;
  },

  checkCustom(actor, fn) {
    try { return fn(actor); }
    catch { return false; }
  }
};
