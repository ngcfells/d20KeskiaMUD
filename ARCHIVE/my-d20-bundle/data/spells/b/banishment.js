'use strict';

/**
 * Canonical Spell Definition: Banishment
 * -----------------------------------
 * Source: PHB p.203
 * School: Abjuration
 * Description: A more powerful version of Dismissal. Forces extraplanar 
 * creatures out of the current plane by presenting objects they find loathsome.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'banishment',
  name: 'Banishment',
  level: 6,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'PHB p.203',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 6,
    wizard: 7,
    sorcerer: 7,
    shaman_oa: 6,
    spirit_shaman: 7,
    shugenja: 6, //(Order of the Ineffable Mystery)
    healer_mini: 6,
    arcane_artificer: 6,
    sha_ir: 7,
    cleric_domains: { 'exorcism': 6, 'protection': 6, 'planar': 6, 'law': 6 },
    prestige_classes: { 'exorcist_of_the_silver_flame': 6, 'thaumaturgist': 4 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon (Standard Abjuration)', kara_tur: 'Rare', maztica: 'Very Rare', zakhara: 'Uncommon', evermeet: 'Common' },
    oerth: { flaness: 'Uncommon', oerik: 'Rare', hepmonaland: 'Very Rare' },
    krynn: { ansalon: 'Uncommon', taladas: 'Rare' },
    eberron: { khorvaire: 'Uncommon (Silver Flame)', xen_drik: 'Rare', sarlona: 'Very Rare', argonnessen: 'Uncommon' },
    athas: 'Very Rare (Defiler/Preserver)',
    sigil: 'Common (Essential survival magic)',
    ravenloft: { barovia: 'Rare', darkon: 'Uncommon', hazlan: 'Uncommon', har-akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    d20_modern: 'Very Rare',
    d20_cthulhu: 'Rare (The Elder Sign variant)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Lore of Heavens/Light)',
    rifts: 'Common (Shifter/Ley Line Walker)',
    shadowrun: 'Common (Banish Spirit variant)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  /**
   * DYNAMIC MATERIAL COMPONENT
   * --------------------------
   * Instead of a fixed ID, this spell checks the target's 'dislikedItem' metadata.
   */
  materialComponents: [
    {
      id: 'variable_hate_item', 
      quantity: 1,
      consumed: true,
      notes: 'An object or substance distasteful to the specific target creature.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one or more extraplanar creatures',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will negates',
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
    // 1. Planar Validation
    const isExtraplanar = target.getMeta('isExtraplanar');
    if (!isExtraplanar) {
      caster.say(`<yellow>${target.name} is native to this plane; your abjuration finds no planar tether to sever.</yellow>`);
      return false;
    }

    // 2. Dynamic Research/Material Check
    const requiredItemId = target.getMeta('dislikedItem');
    if (!requiredItemId) {
      caster.say(`<red>You lack the specific occult focus required to banish a creature of this nature.</red>`);
      return false;
    }

    // Check caster inventory for the specific "hated" item
    const hasItem = caster.inventory.findItem(requiredItemId);
    if (!hasItem) {
      caster.say(`<red>The spell flickers and dies. You do not have the ${requiredItemId.replace(/_/g, ' ')} needed to repel ${target.name}.</red>`);
      return false;
    }

    // 3. Resolve Resistance and Saving Throw
    // Note: 3.5e rules grant a +2 bonus to the DC for each extra "hated" item presented.
    const dc = state.SpellcastingManager.calculateSpellDC(caster, this.level);
    const savePassed = state.SpellcastingManager._savingThrow(state, target, 'will', dc);

    if (savePassed) {
      caster.say(`<cyan>${target.name} screeches in pain as you brandish the ${hasItem.name}, but they anchor themselves to this reality with sheer spite.</cyan>`);
      target.say(`<red>The sight of the ${hasItem.name} sears your eyes, but you refuse to be cast out!</red>`);
      return;
    }

    // 4. Success: Planar Ejection
    caster.say(`<bold><magenta>You brandish the ${hasItem.name} and utter a word of absolute exclusion!</magenta></bold>`);
    target.say(`<bold><red>The ${hasItem.name} creates a vacuum in the local weave—you are sucked backward into the howling void of your home plane!</red></bold>`);
    caster.room.broadcastExcept([caster, target], `<magenta>${caster.name} thrusts forward a ${hasItem.name}, and the space around ${target.name} fractures. With a thunderous crack, the creature is pulled into a collapsing rift.</magenta>`);

    // Consume the item
    state.ItemManager.remove(hasItem);
    
    // Execute Planar Transport or Despawn
    if (target.isNpc) {
      target.despawn();
    } else {
      // If a player is banished, move them to a 'Home Plane' room ID defined in metadata
      const homeRoom = target.getMeta('homePlaneRoomId') || 'limbo_start';
      const room = state.RoomManager.getRoom(homeRoom);
      target.moveTo(room);
    }
  }
};
