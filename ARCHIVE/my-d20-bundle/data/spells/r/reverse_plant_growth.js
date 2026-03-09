/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Reverse Plant Growth
 * Source: WotC | Chronomancer (2E) p.25
 * 
 * Logic:
 * - Effect: Reduces plant age by 1 month per CL.
 * - Limitation: Minimum age of 1 month; cannot revive dead plants.
 * - Rate: 1 month every 2 turns (2 minutes).
 */
module.exports = {
  id: 'reverse_plant_growth',
  name: 'Reverse Plant Growth',
  level: 2,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['plant', 'time'],
  source: 'Chronomancer (2E) p.25',

  castingTime: '1 turn',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'plant_sample', quantity: 1, consumed: true }],

  range: '10 ft./level',
  target: 'area',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<cyan>You weave the verbal pattern in reverse, drawing the vitality of the harvest back into the budding seeds.</cyan>`);

    if (caster.room.hasTag('withered_crops')) {
        return B.sayAt(caster, "<yellow>The plants are already dead; time can be reversed, but life cannot be forced back into dust.</yellow>");
    }

    B.sayAt(caster.room, "<cyan>The plants shrink and turn a brighter, younger green as months of growth are undone.</cyan>");
    
    // Logic: Reduce crop maturity
    const cropState = caster.room.getMeta('crop_maturity') || 0;
    caster.room.setMeta('crop_maturity', Math.max(1, cropState - cl));
  }
};
