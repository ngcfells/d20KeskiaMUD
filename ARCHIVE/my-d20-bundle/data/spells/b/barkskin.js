'use strict';

/**
 * Canonical Spell Definition: Barkskin
 * -----------------------------------
 * Source: PHB p.203
 * School: Transmutation
 * Description: Toughens a creature's skin, granting a +2 to +5 
 * enhancement bonus to natural armor based on caster level.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'barkskin',
  name: 'Barkskin',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.203',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    druid: 2,
    ranger: 2,
    shaman_oa: 2,
    spirit_shaman: 2,
    shugenja: 2, //(Order of the Earth)
    adept: 2,
    arcane_artificer: 2,
    cleric_domains: { 'plant': 2, 'nature': 2, 'protection': 2 },
    prestige_classes: { 'nature_s_warrior': 1, 'warden_of_cerilia': 2 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Common (Jaguar Knights)', evermeet: 'Common' },
    oerth: { flaness: 'Common (Beory/Ehlonna)', oerik: 'Common', hepmonaland: 'Common' },
    krynn: { ansalon: 'Common (Habbakuk)', taladas: 'Common', adlatum: 'Uncommon' },
    eberron: { khorvaire: 'Common (Gatekeepers)', xen_drik: 'Common', sarlona: 'Rare' },
    athas: 'Uncommon (Preserver/Elemental Earth)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', falkovnia: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Pictish Sorcery)',
    d20_modern: 'Uncommon (Urban Druid)',
    pathfinder: 'Common',
    starfinder: 'Common (Xenodruid)',
    warhammer: 'Rare (Lore of Life/Amber Order)',
    rifts: 'Common (Druid/Wild Psi-Stalker)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [], // Uses Divine Focus

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: '10 min/level',
  savingThrow: 'none', 
  spellResistance: true, // (Harmless)

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
    // Scaling Logic: +2 base, increases by +1 for every 3 CL above 3rd.
    // CL 3-5: +2 | CL 6-8: +3 | CL 9-11: +4 | CL 12+: +5
    const cl = caster.getMeta('level') || 1;
    const bonus = 2 + Math.floor((cl - 3) / 3);
    const finalBonus = Math.min(Math.max(bonus, 2), 5);
    
    const durationMs = cl * 600000; // 10 minutes (600s) per level

    const barkEffect = state.EffectFactory.create('barkskin_buff', {
      duration: durationMs,
    }, {
      bonus: finalBonus
    });

    if (target.addEffect(barkEffect)) {
      caster.say(`<green>You touch ${target.name}, and the strength of the forest flows through your fingertips into their skin.</green>`);
      return true;
    }
    return false;
  },

  onTick(state, caster, effect) {
    // Subtle flavor
    if (Math.random() > 0.98) {
      effect.target.say("<green>You feel the rigid weight of your bark-like skin protecting you.</green>");
    }
  }
};
