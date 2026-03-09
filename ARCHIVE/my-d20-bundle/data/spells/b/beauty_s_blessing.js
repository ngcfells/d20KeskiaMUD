'use strict';

/**
 * Canonical Spell Definition: Beauty's Blessing
 * -----------------------------------
 * Source: Book of Erotic Fantasy p.142
 * School: Transmutation
 * Description: A minor enhancement of the subject's features, 
 * granting a +2 enhancement bonus to Appearance.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'beauty_s_blessing',
  name: "Beauty's Blessing",
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Book of Erotic Fantasy p.142',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  /**
   * BASE CLASSES:
   * - Adept: 1, Bard: 1, Cleric: 1, Druid: 1, Sorcerer/Wizard: 1, 
   * - Witch: 1, Sha'ir: 1, Shugenja: 1 (Order of the All-Knowing).
   * 
   * DOMAINS/OTHER:
   * - Cleric Domains: Lust (1), Pleasure (1), Charm (1), Nobility (1).
   * - Prestige Classes: Courtier (1).
   */
  spellLists: {
    cleric: 1,
    wizard: 1,
    sorcerer: 1,
    druid: 1,
    bard: 1,
    adept: 1,
    witch: 1,
    sha_ir: 1,
    shugenja: 1,
    cleric_domains: { 'lust': 1, 'pleasure': 1, 'charm': 1, 'nobility': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common (Sune/Sharess)', kara_tur: 'Common', maztica: 'Rare', zakhara: 'Common', evermeet: 'Common' },
    oerth: { flaness: 'Common (Myhriss)', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Uncommon (Sirrion)', taladas: 'Uncommon' },
    eberron: { khorvaire: 'Common (House Phiarlan)', sarlona: 'Uncommon (Riedran socialites)', argonnessen: 'Rare' },
    athas: 'Rare (A noble luxury)',
    sigil: 'Common (Sensate favorite)',
    ravenloft: { dementlieu: 'Common (Social baseline)', barovia: 'Non-Existent', darkon: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Uncommon (Zamorian/Ophirian beauty rites)',
    d20_modern: 'Uncommon (Cosmetic FX)',
    pathfinder: 'Common (Shelyn)',
    starfinder: 'Common (Eoxian/Lashunta fashion)',
    shadowrun: 'Common (Physical Mask variant)',
    warhammer: 'Rare (Lore of Light)',
    rifts: 'Common (Body-Fixer use)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard', 
  components: ['V', 'S', 'M/A'],
  
  materialComponents: [
    { id: 'rose_petal_crushed', quantity: 1, consumed: true, notes: 'A handful of crushed rose petals.' }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',     
  target: 'one living creature', 
  area: null,         
  duration: '1 hour/level', 
  savingThrow: 'will negates (harmless)',       
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const durationMs = cl * 3600000; // 1 hour per level

    // Standard +2 Enhancement bonus to Appearance
    const beautyEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'appearance',
      bonus: 2,
      name: "Beauty's Blessing",
      source: 'beautys_blessing'
    });

    if (target.addEffect(beautyEffect)) {
      B.sayAt(caster, `<magenta>You sweep your hand over ${target.name}; their skin glows with a subtle luster and their flaws soften into a charming symmetry.</magenta>`);
      target.say(`<bold><magenta>A soothing warmth spreads across your face and body, leaving you feeling radiant and poised.</magenta></bold>`);
      target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name}, whose features take on a soft, preternatural glow that enhances their natural beauty.</magenta>`);
      return true;
    }
    return false;
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.98) {
      effect.target.room.broadcastExcept(effect.target, `<magenta>The light catches ${effect.target.name}'s features in an exceptionally flattering way.</magenta>`);
    }
  },

  onEnd(state, caster, effect) {
    effect.target.say("<yellow>The subtle luster of the blessing fades, and you feel the weight of your minor imperfections return.</yellow>");
  }
};
