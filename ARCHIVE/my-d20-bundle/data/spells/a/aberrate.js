/**
 * Implementation: Aberrate
 * Source: WotC | Book of Vile Darkness p.84
 * 
 * Logic:
 * - Changes target type to Aberration.
 * - +1 Natural Armor per 4 caster levels (Max +5).
 * - Grant a tentacle attack (replaces or adds to primary).
 * - Requires "Evil Outsider" or "Fiend" tag from caster.
 */
'use strict';

const { Broadcast } = require('ranvier');
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'aberrate',
  name: 'Aberrate',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: ['evil'],
  source: 'WotC | Book of Vile Darkness p.84',
  
  // ─────────────────────────────────────────────────────────────
// SPELL: Aberrate
// SOURCE: Book of Vile Darkness (3.0/3.5), p. 84
// ─────────────────────────────────────────────────────────────
{
  name: "Aberrate",
  spellLists: {
    cleric: null,
    wizard: 1,
    sorcerer: 1,
    druid: null,
    paladin: null,
    ranger: null,
    bard: null,
    adept: 1, // Appropriate for dark/tribal adepts in multiversal settings
    shugenja: null,
    wu_jen: null,
    
    // CUSTOM/EXTENDED CLASSES
    maho_tsukai: 1,      // Highly appropriate for Shadowlands corruption
    arcane_artificer: 1, // Flesh-warping / Bio-construct flavor
    witch: 1,            // Common in "Hag" or "Eldritch" witch archetypes
    savant: 1,           // Fits the "forbidden knowledge" theme
    
    cleric_domains: { 'corruption': 1, 'bestiary': 1, 'evolution': 1 },
    prestige_classes: { 
      'assassin': 1, 
      'fleshwarper': 1, // Essential for this class's progression
      'nar_demonbinder': 1 
    },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon', kara_tur: 'Rare', maztica: 'Very Rare', hordelands: 'Rare', zakhara: 'Rare', evermeet: 'Non-Existent' },
    oerth: { flaness: 'Uncommon', oerik: 'Rare', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Rare', taladas: 'Rare', adlatum: 'Very Rare' },
    eberron: { khorvaire: 'Uncommon', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Uncommon' },
    athas: 'Rare',
    sigil: 'Common', 
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', lamordia: 'Rare', falkovnia: 'Uncommon', dementlieu: 'Uncommon', shadowlands: 'Common', har-akir: 'Rare' },
    mystara: 'Uncommon',
    kalamar: 'Uncommon',
    hyboria: 'Very Rare',
    d20_modern: 'Rare',
    d20_cyber: 'Non-Existent',
    d20_future: 'Non-Existent',
    d20_cthulhu: 'Common', 
    pathfinder: 'Uncommon',
    starfinder: 'Uncommon',
    earthdawn: 'Rare',
    shadowrun: 'Uncommon',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Common', 
    palladium: 'Uncommon',
    rifts: 'Common',
    scarn: 'Uncommon',
    trollworld: 'Uncommon'
  },
  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'vile_reagent',
      quantity: 1,
      consumed: true,
      notes: 'A mixture of bitter herbs and powdered bone from a sanctified creature.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'living humanoid creature',
  area: null,
  duration: '10 min/level',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    // 1. VALIDATION: Only Fiends/Evil Outsiders can cast this.
    if (!caster.hasTag('evil_outsider') && !caster.hasTag('fiend')) {
      return Broadcast.sayAt(caster, "<red>Your soul is not dark enough to weave the geometries of the Abyss into flesh.</red>");
    }

    // 2. RESOLUTION
    const cl = caster.getAttribute('intelligence') || 1; // Or Wisdom for Clerics
    const dc = 10 + this.level + D20Utils.getModifier(caster.getAttribute('intelligence') || 10);

    const success = state.SpellResolver.resolve(state, this, caster, target, {
        dcBonus: 0
    });

    if (!success) return; // resolve() handles saving throw messages

    // 3. CREATE EFFECT
    const naBonus = Math.min(5, Math.floor(cl / 4));
    
    const effect = state.EffectFactory.create('aberrant_mutation', {
      duration: cl * 600000, // 10 minutes per level
    }, { 
      naturalArmorBonus: naBonus,
      originalType: target.getMeta('creatureType') || 'humanoid'
    });

    // 4. EMOTES
    Broadcast.sayAt(caster, `<red>You reach out and touch ${target.name}, forcing the chaos of the Far Realm into their skin.</red>`);
    Broadcast.sayAt(target, "<bold><red>Your body screams as your bones melt! Rubbery tentacles sprout from your joints as you become an aberration!</red></bold>");
    Broadcast.sayAtExcept(caster.room, `<bold><red>${caster.name} mutates ${target.name} into a twitching, tentacled horror!</red></bold>`, [caster, target]);

    target.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.9) {
      Broadcast.sayAt(effect.target, "<magenta>A wet, sucking sound emanates from your newly formed appendages.</magenta>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(effect.target, "<grey>Your bones snap back into their natural alignment as the mutation recedes.</grey>");
    Broadcast.sayAtExcept(effect.target.room, `<grey>${effect.target.name}'s horrific features smooth out, returning them to humanoid form.</grey>`, [effect.target]);
  }
};
