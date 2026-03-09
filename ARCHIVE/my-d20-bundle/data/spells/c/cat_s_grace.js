'use strict';

/**
 * Canonical Spell Definition: Cat's Grace
 * -----------------------------------
 * Source: PHB p.208
 * School: Transmutation
 * Description: The subject becomes more agile, gaining a +4 enhancement 
 * bonus to Dexterity.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'cat_s_grace',
  name: "Cat's Grace",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.208',

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
    toril: { faerun: 'Common', kara_tur: 'Common (Way of the Leopard)', maztica: 'Rare (Jaguar influence)', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Very Rare (Riedra)', argonnessen: 'Common' },
    athas: 'Rare (Preserver) / Very Rare (Defiler)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', dementlieu: 'Uncommon', har_akir: 'Rare (Grace of Bast)' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Zamorian Thief-Magic)',
    d20_modern: 'Uncommon',
    d20_cyber_future: 'Non-Existent (Replaced by Reflex Boosters)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Lore of Beasts)',
    rifts: 'Common',
    shadowrun: 'Common (Increase Dexterity)',
    cthulhu: 'Very Rare (Blessing of Bast)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'cat_fur_tuft',
      quantity: 1,
      consumed: false,
      notes: 'A few hairs from a cat.'
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

    const dexterityEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'dexterity',
      bonus: 4,
      name: "Cat's Grace"
    });

    if (target.addEffect(dexterityEffect)) {
      B.sayAt(caster, `<cyan>You touch ${target.name}, and the fluid, uncanny balance of a feline flows into their joints.</cyan>`);
      target.room.broadcastExcept([caster, target], `<cyan>${caster.name} touches ${target.name}, who begins to move with a preternatural, flowing grace.</cyan>`);
      return true;
    }
    return false;
  }
};
