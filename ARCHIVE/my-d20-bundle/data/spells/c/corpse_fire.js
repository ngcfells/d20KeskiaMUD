/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Corpse Fire
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 2, p.61
 * 
 * Logic:
 * - Selective: Fire only harms dead bodies or Undead creatures.
 * - Armor Bypass: Hits Undead regardless of weapon-type immunity or incorporeality.
 * - Safety: Living creatures (even if magically suspended) take 0 damage.
 * - Area: 1 flame source per 2 levels.
 */

const { FIRE } = require('../../lib/combat/damage-types');
const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'corpse_fire',
  name: 'Corpse Fire',
  level: 2,
  school: 'transmutation',
  subschool: 'alteration',
  descriptors: [FIRE, 'necromancy'],
  source: '& Magazine Issue 2, p.61',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 2
   * - Cleric: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '2 segments', // ~1 round
  components: ['V', 'S', 'M', 'DF'],
  
  materialComponents: [
    { 
      id: 'bone_ash_pinch', 
      quantity: 1, 
      consumed: true,
      notes: 'A bit of bone and ash (M-U only).' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '30 ft.', // 3"
  target: '1 flame per 2 levels',
  duration: '1d6 rounds + 1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const durationRounds = state.Dice.roll('1d6') + cl;
    const maxTargets = Math.max(1, Math.floor(cl / 2));

    // Find fire-source items in the room (torches, lanterns, campfires)
    const fireSources = caster.room.items.filter(i => i.hasTag('fire_source') || i.id === 'torch').slice(0, maxTargets);

    if (fireSources.length === 0) {
      return B.sayAt(caster, "<yellow>There are no flames here to alter with the pallor of the grave.</yellow>");
    }

    B.sayAt(caster, `<magenta>You cast bone ash into the flames, chanting a dirge-like rhythm. The fire turns a pale, ghostly blue-green.</magenta>`);
    B.sayAtExcept(caster.room, `<magenta>${caster.name} alters the flames; they now burn with a cold, sickly emerald light.</magenta>`, [caster]);

    fireSources.forEach(item => {
      const corpseFireEffect = state.EffectFactory.create('corpse_fire_active', {
        duration: durationRounds * 6000,
      });
      item.addEffect(corpseFireEffect);
      // Visual feedback for the item
      item.name = `<cyan>Ghostly ${item.name}</cyan>`;
    });
  }
};
