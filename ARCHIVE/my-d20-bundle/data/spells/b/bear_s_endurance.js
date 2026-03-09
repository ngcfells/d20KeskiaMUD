'use strict';

/**
 * Canonical Spell Definition: Bear's Endurance
 * -----------------------------------
 * Source: PHB p.203
 * School: Transmutation
 * Description: Grants a +4 enhancement bonus to Constitution.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'bear_s_endurance',
  name: "Bear\'s Endurance",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.203',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 2,
    wizard: 2,
    sorcerer: 2,
    druid: 2,
    ranger: 2,
    paladin: 2,
    adept: 2,
    bard: 2,
    shaman_oa: 2,
    shugenja: 2,
    arcane_artificer: 2,
    sha_ir: 2,
    cleric_domains: { 'strength': 2, 'war': 2, 'animal': 2, 'endurance': 2 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    // Standard Fantasy
    toril: { faerun: 'Common', kara_tur: 'Common (Way of the Ox)', maztica: 'Rare (Jaguar Knight variant)', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Very Rare (Riedra)', argonnessen: 'Common' },
    athas: 'Rare (Preserver) / Very Rare (Defiler - usually metabolic)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', hazlan: 'Common', har_akir: 'Rare (Endurance of the Jackal)' },
    mystara: 'Common',
    kalamar: 'Common',
    scarn: 'Uncommon (Vigilant Sects)',
    trollworld: 'Common',
    
    // Gritty/High-Stakes
    hyboria: 'Very Rare (Sorcery-based biological mutagens)',
    warhammer: 'Rare (Jade Order / Lore of Beasts)',
    palladium: 'Uncommon',
    rifts: 'Common (Techno-Wizardry / Bio-Wizardry)',
    
    // Modern/Sci-Fi/Horror
    d20_modern: 'Rare (Adept/FX only)',
    d20_cyber_future: 'Non-Existent (Replaced by Bio-Augmentation/Nanites)',
    cthulhu: 'Very Rare (Requires sanity-eroding rituals)',
    shadowrun: 'Common (Increase Attribute: Body spell)',
    starfinder: 'Common (Magic-Tech integration)',
    traveller_2300ad: 'Non-Existent (Psionics only)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'bear_fur_tuft',
      quantity: 1,
      consumed: false,
      notes: 'A few hairs from a bear.'
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
    const durationMs = cl * 60000; // 1 minute per level

    const bearEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'constitution',
      bonus: 4,
      name: "Bear's Endurance"
    });

    if (target.addEffect(bearEffect)) {
      B.sayAt(caster, `<green>You touch ${target.name}, and the primal vitality of the great bear flows into their blood.</green>`);
      return true;
    }
    return false;
  }
};
