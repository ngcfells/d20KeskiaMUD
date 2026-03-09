/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acorn of Far Travel
 * Source: WotC | Spell Compendium p.7 / Web Enhancement
 * 
 * Description: 
 * This spell anchors the spirit of a specific living oak tree into an acorn. 
 * As long as the caster holds the acorn, they are considered to be standing 
 * under the canopy of that specific tree, regardless of their actual location.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'acorn_of_far_travel',
  name: 'Acorn of Far Travel',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: ['nature'],
  source: 'WotC | Spell Compendium p.7',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 2
   * - Nature Domain: 2
   * - Spirit Shaman: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'living_oak_acorn', 
      quantity: 1, 
      consumed: false, // Must be held to function
      notes: 'Must be plucked from a living oak tree during the casting.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living acorn',
  duration: '1 day/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const room = caster.room;

    // 1. TERRAIN & OAK VALIDATION
    // Logic: Checks for natural forest OR a tree created by 'Casuar's Acorn'
    const hasOakSource = room.getMeta('terrain') === 'forest' || room.hasTag('has_oak_tree');
    
    if (!hasOakSource) {
      return B.sayAt(caster, "<red>You must be standing beneath the boughs of a living oak tree to anchor this spell.</red>");
    }

    // 2. ITEM VALIDATION
    const acorn = caster.inventory.findItem('living_oak_acorn');
    if (!acorn) {
      return B.sayAt(caster, "<red>You must hold a fresh, living acorn plucked from this very tree.</red>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const durationMs = cl * 86400000; // 24 hours per level

    // 3. PERSPECTIVE EMOTES
    B.sayAt(caster, `<bold><green>You press the acorn to the trunk of the oak. A rush of ancient, leafy vitality surges into the seed, turning it a deep, resonant emerald.</green></bold>`);
    B.sayAtExcept(room, `<green>${caster.name} whispers to the Great Oak, and the acorn in their hand begins to pulse with the rhythmic heartbeat of the forest.</green>`, [caster]);

    // 4. APPLY PROXY EFFECT
    const canopyEffect = state.EffectFactory.create('canopy_proxy', {
      duration: durationMs,
      state: {
        acornUuid: acorn.uuid,
        sourceRoomName: room.name,
        sourceRoomId: room.id
      }
    });

    // Modify the item metadata
    acorn.setMeta('isPlanarAnchor', true);
    acorn.setMeta('anchorRoomId', room.id);
    acorn.name = `<green>Acorn of ${room.name}</green>`;

    caster.addEffect(canopyEffect);
  },

  onEnd(state, caster, effect) {
    const acorn = caster.inventory.findItem('living_oak_acorn');
    if (acorn) {
      acorn.removeMeta('isPlanarAnchor');
      acorn.name = "Living Oak Acorn";
    }
    B.sayAt(caster, "<yellow>The emerald pulse within your acorn fades. Your connection to the distant oak has severed.</yellow>");
  }
};
