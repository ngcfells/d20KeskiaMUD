'use strict';

/**
 * Canonical Spell Definition: Peacock's Strut
 * -----------------------------------
 * Source: Homebrew | Author: Chris Fells, 2026 based on PHB and BoEF
 * School: Transmutation
 * Description: The subject's physical features refine and their presence 
 * becomes dazzling, gaining a +4 enhancement bonus to Appearance.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'peacocks_strut',
  name: "Peacock's Strut",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Homebrew | Author: Chris Fells, 2026 based on PHB and BoEF',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    bard: 2,
    sorcerer: 2,
    wizard: 2,
    witch: 2,
    sha_ir: 2,
    shugenja: 2, // (Order of the All-Knowing)
    cleric_domains: { 'charm': 2, 'passion': 2, 'lust_boef': 2, 'pleasure': 2 },
    prestige_classes: { 'celebrity': 2, 'enlightened_fist': 2 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Rare (Favored by Sune/Hanali)', kara_tur: 'Common (Imperial Court)', maztica: 'Very Rare', evermeet: 'Uncommon' },
    oerth: { flaness: 'Uncommon (City of Greyhawk)', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Rare (Pre-Cataclysm)', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common (House Phiarlan/Thuranni)', xen_drik: 'Very Rare', sarlona: 'Uncommon (Riedran Elites)', argonnessen: 'Rare' },
    athas: 'Very Rare (A kingly luxury)',
    sigil: 'Uncommon (Sensate favorite)',
    ravenloft: { barovia: 'Very Rare', darkon: 'Uncommon', dementlieu: 'Common (Social necessity)', har_akir: 'Rare' },
    mystara: 'Uncommon',
    kalamar: 'Uncommon',
    hyboria: 'Rare (Ophirian Courtesan Magic)',
    d20_modern: 'Rare (Modeling/Celebrity FX)',
    d20_cyber_future: 'Non-Existent (Replaced by Biosculpting)',
    pathfinder: 'Uncommon',
    starfinder: 'Common (Eoxian/Lashunta fashion)',
    warhammer: 'Rare (Slaaneshi taint risk / Gold Order)',
    rifts: 'Uncommon (Body-Fixer/Showroom use)',
    shadowrun: 'Common (Fashion-grade physical mask)',
    cthulhu: 'Very Rare (Usually masks something horrific)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'peacock_tail_feather',
      quantity: 1,
      consumed: false,
      notes: 'An iridescent peacock tail feather.'
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

    const appearanceEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'appearance',
      bonus: 4,
      name: "Peacock's Strut"
    });

    if (target.addEffect(appearanceEffect)) {
      B.sayAt(caster, `<magenta>You touch ${target.name}, and their physical flaws vanish, replaced by an iridescent, breathtaking perfection.</magenta>`);
      target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name}, whose skin glows with a soft, prismatic light as their features become impossibly beautiful.</magenta>`);
      return true;
    }
    return false;
  }
};
