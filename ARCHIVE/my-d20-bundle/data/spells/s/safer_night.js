/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Safer Night
 * Author: Rachael Strange
 * Source: & Magazine Issue 1, p.42
 * 
 * Description:
 * Creates a protective perimeter that repels vermin and masks odors.
 * Effectively halves encounter chances and increases detection distance
 * during rest, provided the group remains within the radius.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'safer_night',
  name: 'Safer Night',
  level: 1,
  school: 'abjuration',
  subschool: null,
  descriptors: ['warding', 'utility'],
  source: '& Magazine Issue 1, p.42',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 1
   * - Druid: 2
   * - Cleric: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 round',
  components: ['V', 'S', 'M', 'DF'],
  
  /**
   * Material Requirements:
   * M-U: Citronella oil + Cayenne + Lantern
   * Druid: Mistletoe
   * Cleric: Holy Symbol (DF)
   */
  materialComponents: [
    { 
      id: 'citronella_cayenne_mix', 
      quantity: 1, 
      consumed: true,
      notes: 'A dram of citronella oil mixed with a teaspoon of cayenne.' 
    }
  ],
  
  focus: {
    id: 'oil_lantern',
    name: 'Oil Lantern',
    consumed: false,
    notes: 'The lantern must remain lit for the duration.'
  },

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '10 ft./level radius',
  target: 'area centered on lantern',
  area: 'emanation',
  duration: '12 hours',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const radius = 10 * cl;

    // Check for required focus (Lantern)
    const lantern = caster.inventory.findItem('oil_lantern');
    if (!lantern) {
        return B.sayAt(caster, "<red>You must have a lit lantern to anchor this ward.</red>");
    }

    B.sayAt(caster, `<cyan>You pour the pungent oil into the lantern. As you chant, a subtle, scentless barrier expands ${radius} feet in every direction.</cyan>`);
    B.sayAtExcept(caster.room, `<cyan>${caster.name} prepares a lantern that begins to emit a faint, shimmering warmth, warding the campsite.</cyan>`, [caster]);

    const wardEffect = state.EffectFactory.create('safer_night_ward', {
      duration: 43200000, // 12 hours
      state: { 
        radius, 
        lanternUuid: lantern.uuid,
        casterUuid: caster.uuid
      }
    });

    caster.room.addEffect(wardEffect);
  }
};
