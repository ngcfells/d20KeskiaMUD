'use strict';

/**
 * Canonical Spell Definition: Eagle's Splendor
 * -----------------------------------
 * Source: PHB p.225
 * School: Transmutation
 * Description: The subject becomes more poised and commanding, 
 * gaining a +4 enhancement bonus to Charisma.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'eagle_s_splendor',
  name: "Eagle's Splendor",
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB p.225',

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
    toril: { faerun: 'Common', kara_tur: 'Common (Imperial Courts)', maztica: 'Uncommon', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common (House Sivis/Phiarlan)', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Common' },
    athas: 'Rare (Templar use) / Very Rare (Preserver)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', dementlieu: 'Common (High fashion)', har_akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Sorcery of the East)',
    d20_modern: 'Uncommon',
    d20_cyber_future: 'Non-Existent (Replaced by Tailored Pheromones)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Light Order)',
    rifts: 'Common',
    shadowrun: 'Common (Increase Charisma)',
    cthulhu: 'Very Rare (Induces disturbing obsession in others)',
    twilight_2000: 'Non-Existent'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'eagle_feather',
      quantity: 1,
      consumed: false,
      notes: 'A feather from an eagle.'
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

    const charismaEffect = state.EffectFactory.create('ability_enhancement', {
      duration: durationMs,
    }, {
      attribute: 'charisma',
      bonus: 4,
      name: "Eagle's Splendor"
    });

    if (target.addEffect(charismaEffect)) {
      B.sayAt(caster, `<magenta>You touch ${target.name}; an aura of undeniable authority and magnetic poise settles over them.</magenta>`);
      target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name}, whose features take on a sharp, noble clarity that commands immediate respect.</magenta>`);
      return true;
    }
    return false;
  }
};
