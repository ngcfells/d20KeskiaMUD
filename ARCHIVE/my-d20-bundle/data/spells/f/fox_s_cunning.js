'use strict';

/**
 * Canonical Spell Definition: Fox's Cunning
 * -----------------------------------
 * Source: PHB p.233
 * School: Transmutation
 * Description: The subject becomes more clever and mentally agile, 
 * gaining a +4 enhancement bonus to Intelligence.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'fox_s_cunning',
  name: "Fox's Cunning",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.233',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 2,
    wizard: 2,
    sorcerer: 2,
    druid: 2,
    bard: 2,
    paladin: 2,
    adept: 2,
    shugenja: 2,
    arcane_artificer: 2,
    savant: 2,
    sha_ir: 2,
    cleric_domains: { 'knowledge': 2, 'nobility': 2, 'charm': 2, 'magic': 2 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common (Way of the Kitsune)', maztica: 'Uncommon', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common (Arcane Congress standard)', xen_drik: 'Uncommon', sarlona: 'Rare (Inspired use)', argonnessen: 'Common' },
    athas: 'Rare (Preserver) / Very Rare (Defiler)',
    sigil: 'Common (Standard "Basher Logic" boost)',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', lamordia: 'Uncommon (Scientific curiosity)', har_akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Stygian dark arts)',
    d20_modern: 'Uncommon',
    d20_cyber_future: 'Non-Existent (Replaced by Neural Processors)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Grey Order / Lore of Beasts)',
    rifts: 'Common',
    shadowrun: 'Common (Increase Intelligence)',
    cthulhu: 'Very Rare (Mental expansion leading to madness)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'fox_hair_tuft',
      quantity: 1,
      consumed: false,
      notes: 'A few hairs from a fox.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: '1 min/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const durationMs = cl * 60000;

    const intelligenceEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'intelligence',
      bonus: 4,
      name: "Fox's Cunning"
    });

    if (target.addEffect(intelligenceEffect)) {
      B.sayAt(caster, `<blue>You touch ${target.name}; you feel their mind accelerate, processing reality with predatory speed and cold logic.</blue>`);
      target.room.broadcastExcept([caster, target], `<blue>${caster.name} touches ${target.name}, whose gaze becomes piercing and intensely focused as the fog of doubt vanishes.</blue>`);
      return true;
    }
    return false;
  }
};
