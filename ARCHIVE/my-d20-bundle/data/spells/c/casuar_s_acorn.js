/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Casuar’s Acorn
 * Source: WotC | Priest's Spell Compendium Vol 1, p.11
 * 
 * Logic:
 * - Growth: Instantaneously transforms a fresh acorn into a full-grown oak.
 * - Utility: Provides immediate cover, a bridge, or a vertical path.
 * - Restriction: Growth is stunted if the ceiling height is insufficient.
 * - Persistence: Once grown, the tree is a natural, non-magical entity.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'casuar_s_acorn',
  name: 'Casuar’s Acorn',
  level: 2,
  school: 'transmutation',
  subschool: 'creation',
  descriptors: ['nature', 'plant'],
  source: "Priest's Spell Compendium Vol 1, p.11",

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 2
   * - Plant Domain: 2
   * - Hakim (Al-Qadim): 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'fresh_acorn', 
      quantity: 1, 
      consumed: true,
      notes: 'A fresh, viable acorn.' 
    },
    {
      id: 'drop_of_water',
      quantity: 1,
      consumed: true,
      notes: 'A single drop of water to catalyze the growth.'
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'ground point',
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const room = caster.room;

    // Check for Environment (Zakharan/Desert logic)
    const isDesert = room.getMeta('terrain') === 'desert';
    
    // Narrative: Casting
    B.sayAt(caster, "<green>You press the fresh acorn into the earth and let a single drop of water fall upon it, whispering Casuar's name.</green>");
    B.sayAtExcept(room, `<green>${caster.name} kneels and touches the ground; a sudden, deep tremor vibrates through the floor.</green>`, [caster]);

    // Check for "stunted" growth (Indoor/Low ceiling check)
    const hasCeiling = room.getMeta('hasCeiling');
    const height = room.getMeta('ceilingHeight') || 100; // default 100ft for outdoors

    if (hasCeiling && height < 30) {
      B.sayAt(room, "<yellow>The tree erupts with violent force, but its crown smashes against the ceiling, twisting its trunk into a gnarled, stunted shape.</yellow>");
      // Implementation: Add a 'stunted_oak' feature to the room
    } else {
      B.sayAt(room, "<bold><green>In a blurring explosion of wood and leaves, a majestic oak tree towers upward, its roots anchoring deep into the foundation in a single heartbeat.</green></bold>");
      // Implementation: Add 'majestic_oak' feature to the room
    }

    if (isDesert) {
      B.sayAt(room, "<yellow>The desert heat begins to wilt the leaves immediately; without a steady water source, this tree may not last the week.</yellow>");
    }

    // Technical MUD logic: Create a room feature/extra description
    // This allows players to 'climb tree' or 'hide behind tree'
    room.addTag('has_oak_tree');
    room.setMeta('oak_tree_creator', caster.name);
  }
};
