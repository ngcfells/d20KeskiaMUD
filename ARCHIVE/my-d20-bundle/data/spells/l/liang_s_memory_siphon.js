/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A ruthless application of Thayan mental surgery and Shou internal alchemy.
 * The caster physically draws a specific linguistic or historical 
 * 'thread' out of the victim's mind. The knowledge is transferred 
 * instantly to the caster, leaving a jagged, agonizing hole in the 
 * victim's cognitive structure.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_memory_siphon',
  name: "Liang's Memory Siphon",
  level: 5,
  school: 'enchantment',
  subschool: null,
  descriptors: ['mind-affecting', 'evil'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Knowledge Domain: 5
   * - Mind Domain: 5
   * - Rarity: Artifact (Unique to Liang Chou's inner circle)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one intelligent creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
        caster.say(`<white>You attempt to pull the threads of ${target.name}'s memory, but their mental knots are too tight to unravel.</white>`);
        target.say(`<cyan>A sharp, ice-cold needle pricks the back of your mind, but your resolve holds your memories in place.</cyan>`);
        return;
    }

    // Identify target's languages
    const targetLanguages = target.getMeta('languages') || ['Common'];
    const knownByCaster = caster.getMeta('languages') || ['Common'];
    const viableLanguages = targetLanguages.filter(lang => !knownByCaster.includes(lang));

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>You plunge your fingers into ${target.name}'s temples. You feel the warm, vibrating hum of their thoughts, find the specific strand of their primary tongue, and YANK.</magenta>`);
    
    target.say(`<red>A blinding flash of silver light explodes behind your eyes. A fundamental part of your identity—the very way you structure thought—is torn away, leaving only a raw, throbbing void.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} grips ${target.name}'s head. A single, shimmering strand of silver light is pulled from the victim's brow and absorbed into ${caster.name}'s skin.</magenta>`);

    // 1. Intellectual Trauma: 1d4 Intelligence Damage
    const intDamage = Math.floor(Math.random() * 4) + 1;
    target.damage(intDamage, caster, 'intelligence');

    // 2. Language Theft
    if (viableLanguages.length > 0) {
      const stolenLang = viableLanguages[0];
      
      // Caster gains the language
      knownByCaster.push(stolenLang);
      caster.setMeta('languages', knownByCaster);
      caster.say(`<yellow>[Archive Updated] You have mastered the language: ${stolenLang}.</yellow>`);

      // Target loses the language
      const newTargetLangs = targetLanguages.filter(l => l !== stolenLang);
      target.setMeta('languages', newTargetLangs);
      target.say(`<red>You try to speak, but the words for ${stolenLang} have been erased from your mind. You are left stuttering in a language you no longer understand.</red>`);
    } else {
        caster.say("<white>The victim's mind is a barren archive; no new linguistic data was found.</white>");
    }
  }
};
