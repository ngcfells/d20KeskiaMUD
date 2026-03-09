/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Forces a target to lower their gaze and take a submissive posture.
 * Source: Dragon Magazine #230, p. 46 | 2E-to-3.5 Conversion
 */

const { MIND } = require('../../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'abase',
  name: 'Abase',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: [MIND, 'mind-affecting'],
  source: 'Dragon Magazine #230 | 2E-to-3.5 Conversion',

  // ─────────────────────────────────────────────────────────────
// SPELL: Abase
// SOURCE: Dragon Magazine #230, p. 46 (Arcane Lore: Dragon Dweomers)
// ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: null,
    wizard: 2,
    sorcerer: 2,
    druid: null,
    paladin: null,
    ranger: null,
    bard: 2, 
    adept: null,
    shugenja: null,
    wu_jen: null,
    cleric_domains: { 'tyranny': 2, 'dragon': 2 }, 
    prestige_classes: { 'assassin': 2 },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon', kara_tur: 'Rare', maztica: 'Rare', hordelands: 'Rare', zakhara: 'Rare', evermeet: 'Uncommon' },
    oerth: { flaness: 'Uncommon', oerik: 'Rare', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Uncommon', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Common' },
    athas: 'Very Rare',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Uncommon', lamordia: 'Rare', falkovnia: 'Uncommon', dementlieu: 'Common', hazlan: 'Uncommon', har-akir: 'Rare' },
    mystara: 'Uncommon',
    kalamar: 'Uncommon',
    hyboria: 'Rare',
    d20_modern: 'Rare',
    d20_cyber: 'Non-Existent',
    d20_future: 'Non-Existent',
    d20_cthulhu: 'Rare',
    pathfinder: 'Uncommon',
    starfinder: 'Rare',
    earthdawn: 'Rare',
    shadowrun: 'Uncommon',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Rare',
    palladium: 'Uncommon',
    rifts: 'Uncommon',
    scarn: 'Uncommon',
    trollworld: 'Uncommon'
  },

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'], 
  materialComponents: [],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'one humanoid creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const { savePassed } = ctx;

    caster.say(`<magenta>You point a finger at ${target.name} and utter a word of absolute authority.</magenta>`);
    caster.room.emitExcept([caster, target], `<magenta>${caster.name} speaks a commanding word, their voice booming with unnatural weight.</magenta>`);

    if (savePassed) {
      target.say("<white>A sudden urge to bow strikes you, but you cast it aside with a sneer.</white>");
      caster.say(`<yellow>${target.name} refuses to submit.</yellow>`);
      return;
    }

    target.say("<red>An crushing sense of inadequacy fills you. Your gaze falls to the dust at your feet as you adopt a posture of profound humility.</red>");
    caster.room.emitExcept([caster, target], `<yellow>${target.name}'s spirit seems to break; they avert their eyes and hunch over in a submissive display.</yellow>`);

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const abasedEffect = state.EffectFactory.create('abased', {
      duration: cl * 6000, 
    });
    
    target.addEffect(abasedEffect);
  }
};
