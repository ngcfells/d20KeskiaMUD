'use strict';

/**
 * Canonical Spell Definition: Bull's Strength
 * -----------------------------------
 * Source: PHB p.207
 * School: Transmutation
 * Description: The subject becomes stronger, gaining a +4 enhancement 
 * bonus to Strength.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'bulls_strength',
  name: "Bull's Strength",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.207',

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
    bard: 2, //
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
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Uncommon', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Common' },
    krynn: { ansalon: 'Common', taladas: 'Common', adlatum: 'Uncommon' },
    eberron: { khorvaire: 'Common', xen_drik: 'Common', sarlona: 'Rare', argonnessen: 'Common' },
    athas: 'Rare (Preserver) / Very Rare (Defiler)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', falkovnia: 'Common (Military use)', har_akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Alchemical/Sorcerous)',
    d20_modern: 'Uncommon',
    d20_cyber_future: 'Non-Existent (Replaced by Myomer Augmentation)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Lore of Beasts)',
    rifts: 'Common (Magic & TW)',
    shadowrun: 'Common (Increase Strength)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'bull_hair_tuft',
      quantity: 1,
      consumed: false,
      notes: 'A few hairs from a bull.'
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

    // Leverages the reusable ability_enhancement helper
    const strengthEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'strength',
      bonus: 4,
      name: "Bull's Strength"
    });

    if (target.addEffect(strengthEffect)) {
      B.sayAt(caster, `<yellow>You touch ${target.name}, and the massive, unyielding power of a bull surges into their muscles.</yellow>`);
      target.room.broadcastExcept([caster, target], `<yellow>${caster.name} touches ${target.name}, whose muscles visibly swell with supernatural power.</yellow>`);
      return true;
    }
    return false;
  }
};
