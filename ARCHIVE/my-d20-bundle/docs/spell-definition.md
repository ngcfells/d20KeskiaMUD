```js
'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: [Spell Name]
 * Source: [Book/Page/Author]
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'unique_spell_id',
  name: "Spell Name",
  level: 0,
  school: 'abjuration', 
  subschool: null,
  descriptors: [],      
  source: 'Source Book p.00',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  /**
   * BASE CLASSES:
   * - Adept, Antipaladin (Blackguard), Arcane Artificer, Bard, Cleric, 
   * - Druid, High Paladin, Maho-Tsukai, Paladin, Ranger, Savant, 
   * - Sha'ir, Shaman (OA), Spirit Shaman, Shugenja, Sohei, Sorcerer, 
   * - Wizard (Specialist/Elementalist/Mage), Witch, Wu Jen.
   * 
   * DOMAINS/OTHER:
   * - Cleric Domains: [Name, Level]
   * - Shaman Domains: [Name, Level]
   * - Prestige Classes: [Name, Level] (e.g. Assassin, Suel Arcanamach)
   */
  spellLists: {
    cleric: 0,
    wizard: 0,
    sorcerer: 0,
    druid: null, // null if not on list
    paladin: null,
    ranger: null,
    bard: null,
    adept: null,
    shugenja: null,
    wu_jen: null,
    cleric_domains: { 'Strength': 1, 'War': 1 },
    // Expand with specific d20 classes as needed...
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Rare', maztica: 'Uncommon', hordelands: 'Rare', zakhara: 'Common', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common', taladas: 'Rare', adlatum: 'Uncommon' },
    eberron: { khorvaire: 'Common', xen_drik: 'Rare', sarlona: 'Very Rare', argonnessen: 'Uncommon' },
    athas: 'Rare',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', lamordia: 'Rare', falkovnia: 'Common', dementlieu: 'Common', hazlan: 'Common', har-akir: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare',
    d20_modern: 'Rare',
    d20_cyber: 'Non-Existent',
    d20_future: 'Non-Existent',
    d20_cthulhu: 'Very Rare',
    pathfinder: 'Common',
    starfinder: 'Common',
    earthdawn: 'Rare',
    shadowrun: 'Common',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Rare',
    palladium: 'Uncommon',
    rifts: 'Common',
    scarn: 'Uncommon',
    trollworld: 'Common'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard', 
  components: ['V', 'S', 'M/A', 'F/DF', 'XP', 'R', 'B', 'Vile', 'Location', 'Psi', 'San', 'Honor'],
  /* AI NOTE: use materialCompenents for Alchemical requirements as well
  materialComponents: [
    { id: 'component_id', quantity: 1, consumed: true, notes: 'Description' }
  ],
  focus: { id: 'focus_id', quantity: 1, notes: 'Description' },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',     
  target: 'creature', 
  area: null,         
  duration: 'instantaneous', 
  savingThrow: 'none',       
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // Logic implementation
  },

  onTick(state, caster, effect) {
    // Recurring implementation
  },

  onEnd(state, caster, effect) {
    // Expiration implementation
  }
};
```
