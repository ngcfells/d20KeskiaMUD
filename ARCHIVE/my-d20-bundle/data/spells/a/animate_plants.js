/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/animate_plants.js
 * PURPOSE: Canonical spell definition for the d20 spellcasting engine.
 * 
 * Logic (3.5E): 
 * 1. If targeting a specific Large+ plant (tree): Animates as a protector.
 * 2. If targeting an area: All plants entangle foes.
 */

'use strict';

module.exports = {
  id: 'animate_plants',
  name: 'Animate Plants',
  level: 7,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'D&D 3.5E SRD | https://www.d20srd.org',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one Large plant or all plants in area',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getAttribute('level');
    const room = caster.room;

    // Mode 1: Targeted Animation (Large Tree/Plant)
    // Check if player targeted a specific 'plant' type item/feature
    if (target && target.getMeta('isPlant') && target.getMeta('size') >= 'large') {
      state.Broadcast.sayAt(caster, `You pour vital energy into ${target.display}, and its roots tear free from the earth!`);
      state.Broadcast.sayAtExcept(room, `${caster.name} chants, and a massive tree groans as it twists into a humanoid shape!`, caster);

      const animatedPlant = state.MobFactory.create(room.area, 'd20_bundle:animated_plant_large');
      animatedPlant.addBehavior('summoned', { owner: caster, duration: casterLevel });
      animatedPlant.moveTo(room);

      // Hide the original foliage
      target.addBehavior('hidden');
      ctx.effect.state.summonedEntity = animatedPlant;
      ctx.effect.state.originalItem = target;
      return;
    }

    // Mode 2: Area Entanglement (The "Entangle" effect on steroids)
    state.Broadcast.sayAt(caster, "The flora of the area lashes out with newfound mobility!");
    state.Broadcast.sayAtExcept(room, `The grass and brush suddenly whip and coil like living snakes!`, caster);

    // Apply a room-wide effect that hampers movement and attacks
    const entangleEffect = state.EffectFactory.create('entangled_plants', {
      duration: `${casterLevel} rounds`,
      magnitude: Math.floor(casterLevel / 2)
    });
    
    // In a MUD, we apply this to all non-owner entities in the room
    room.players.forEach(p => { if (p !== caster) p.addEffect(entangleEffect); });
    room.npcs.forEach(n => { if (n.getMeta('owner') !== caster.id) n.addEffect(entangleEffect); });

    ctx.effect.state.isAreaEffect = true;
  },

  onTick(state, caster, effect) {
    if (effect.state.isAreaEffect) {
      if (Math.random() > 0.7) {
        state.Broadcast.sayAt(caster.room, "Vines and thorny branches continue to snap and coil around everyone nearby.");
      }
    } else if (effect.state.summonedEntity) {
      // Summoned plant flavor
      if (Math.random() > 0.8) {
        state.Broadcast.sayAt(caster.room, `The ${effect.state.summonedEntity.name} stomps heavily, leaves shivering with every move.`);
      }
    }
  },

  onEnd(state, caster, effect) {
    if (effect.state.summonedEntity) {
      state.Broadcast.sayAt(caster.room, "The animated plant settles back into the earth, roots plunging deep as it becomes stationary once more.");
      state.MobManager.removeMob(effect.state.summonedEntity);
      if (effect.state.originalItem) effect.state.originalItem.removeBehavior('hidden');
    } else {
      state.Broadcast.sayAt(caster.room, "The surrounding vegetation suddenly goes limp and still.");
    }
  }
};
