/**
 * Canonical Spell Definition: Animate Fire
 * -----------------------------------
 * Adapted for RanvierMUD d20 multiversal rules.
 */

module.exports = {
  id: 'animate_fire',
  name: 'Animate Fire',
  level: 1,
  school: 'transmutation',
  descriptors: ['fire'],
  source: 'Spell Compendium, pg. 12',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'brimstone_sulfur', quantity: 1, consumed: true }],

  range: 'close',
  target: 'one nonmagical fire source',
  duration: 'concentration, up to 1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getAttribute('level');
    
    // Target validation logic
    if (!target.hasBehavior('fire_source') || target.getMeta('magical')) {
      return state.Broadcast.sayAt(caster, "That is not a valid nonmagical fire source.");
    }

    // Room Emotes
    state.Broadcast.sayAt(caster, `You chant an incantation, and the flames before you begin to twist and grow!`);
    state.Broadcast.sayAtExcept(caster.room, `${caster.name} gestures at the fire, and it surges upward with a predatory crackle.`, caster);

    // Summoning logic
    const animatedFire = state.MobFactory.create(
      state.AreaManager.getAreaByEntityId(caster.entityReference), 
      'd20_bundle:small_fire_elemental'
    );
    
    animatedFire.addBehavior('summoned', { owner: caster, duration: casterLevel });
    animatedFire.moveTo(caster.room);
    
    state.Broadcast.sayAt(caster.room, `A Small Fire Elemental leaps from the hearth, its body a swirling pillar of living flame!`);
    
    ctx.effect.state.summonedEntity = animatedFire;
  },

  onTick(state, caster, effect) {
    // Ambient room emote while the spell is maintained
    if (Math.random() > 0.7) {
      state.Broadcast.sayAt(caster.room, `The animated fire crackles intensely, shedding sparks into the air.`);
    }
  },

  onEnd(state, caster, effect) {
    const fire = effect.state.summonedEntity;
    if (fire) {
      state.Broadcast.sayAt(fire.room, `The light fades as the animated flames collapse back into mundane ash.`);
      state.MobManager.removeMob(fire);
    }
  }
};
