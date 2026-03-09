'use strict';

/**
 * Canonical Spell Definition: Owl's Wisdom
 * -----------------------------------
 * Source: PHB p.259
 * School: Transmutation
 * Description: The subject becomes more intuitive and perceptive, 
 * gaining a +4 enhancement bonus to Wisdom.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'owls_wisdom',
  name: "Owl's Wisdom",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.259',

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
    toril: { faerun: 'Common', kara_tur: 'Common (Way of the Crane)', maztica: 'Uncommon', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common (Sovereign Host)', xen_drik: 'Uncommon', sarlona: 'Rare (Adar Path)', argonnessen: 'Common' },
    athas: 'Rare (Preserver) / Very Rare (Insight of the Silt Horror)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', hazlan: 'Uncommon', har_akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Zamorian Mysticism)',
    d20_modern: 'Uncommon',
    d20_cyber_future: 'Non-Existent (Replaced by Sensory Filtering)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Jade Order)',
    rifts: 'Common',
    shadowrun: 'Common (Increase Intuition)',
    cthulhu: 'Very Rare (Insight into the Unspeakable)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'owl_feather',
      quantity: 1,
      consumed: false,
      notes: 'A feather from an owl.'
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

    const wisdomEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'wisdom',
      bonus: 4,
      name: "Owl's Wisdom"
    });

    if (target.addEffect(wisdomEffect)) {
      B.sayAt(caster, `<blue>You touch ${target.name}; a profound calm descends upon them as their senses sharpen to the subtle rhythms of the world.</blue>`);
      target.room.broadcastExcept([caster, target], `<blue>${caster.name} touches ${target.name}, whose eyes grow wide and luminous with a sudden, deep understanding.</blue>`);
      return true;
    }
    return false;
  }
};
