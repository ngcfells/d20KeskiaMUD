/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animate Objects
 * Source: D&D 3.5E SRD | https://www.d20srd.org
 * 
 * Logic: Includes 3.5E Material Hardness and Size Scaling.
 * This spell imbues inanimate objects with mobility and a semblance of life. 
 * Each such animated object then immediately attacks whomever or whatever 
 * you initially designate.
 */

'use strict';

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'animate_objects',
  name: 'Animate Objects',
  level: 6,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'D&D 3.5E SRD | https://www.d20srd.org',

    /**
   * SPELL LISTS:
   * - Bard: 6
   * - Cleric: 6
   * - Chaos Domain: 6
   */

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'medium',                // 100 ft. + 10 ft./level
  target: 'one or more nonmagical objects',
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    // 1. Validation: Ensure target is an item and non-magical
    if (!target || !target.isItem) {
      return state.Broadcast.sayAt(caster, "You must target an inanimate object.");
    }

    if (target.getMeta('magical') || target.hasBehavior('artifact')) {
      return state.Broadcast.sayAt(caster, "Magical energy thwarts your attempt to reshape this item.");
    }

    // 2. Determine Material Hardness (3.5E Rules)
    const material = target.getMeta('material') || 'wood';
    let hardness = 0;
    switch (material.toLowerCase()) {
      case 'paper': case 'cloth': hardness = 0; break;
      case 'glass': hardness = 1; break;
      case 'wood': hardness = 5; break;
      case 'stone': hardness = 8; break;
      case 'iron': case 'steel': hardness = 10; break;
      case 'adamantine': hardness = 20; break;
      default: hardness = 5;
    }

    // 3. Calculate Size Category based on Weight
    const weight = target.getAttribute('weight') || 5;
    let sizeCategory = 'small';
    if (weight > 200) sizeCategory = 'large';
    else if (weight > 50) sizeCategory = 'medium';

    // 4. Room Emotes
    state.Broadcast.sayAt(caster, `You chant an incantation of shifting form, and ${target.display} begins to lurch!`);
    state.Broadcast.sayAtExcept(caster.room, `${caster.name} gestures at ${target.display}, which suddenly sprouts jagged limbs and stands upright!`, caster);

    // 5. Spawn Animated NPC
    const animatedObj = state.MobFactory.create(
      state.AreaManager.getAreaByEntityId(caster.entityReference), 
      `d20_bundle:animated_object_${sizeCategory}`
    );

    // Apply scaling/identity to the NPC
    animatedObj.name = `Animated ${target.name}`;
    animatedObj.addBehavior('summoned', { owner: caster, duration: caster.getAttribute('level') });
    
    // Apply Hardness via temporary DR behavior
    if (hardness > 0) {
      animatedObj.addBehavior('damage_reduction', { amount: hardness, type: 'hardness' });
    }

    animatedObj.moveTo(caster.room);

    // 6. Handle original item visibility
    target.setMeta('isAnimated', true);
    target.addBehavior('hidden'); 
    
    // Store data for the effect duration
    ctx.effect.state.animatedEntity = animatedObj;
    ctx.effect.state.originalItem = target;
  },

  onTick(state, caster, effect) {
    const obj = effect.state.animatedEntity;
    if (obj && Math.random() > 0.8) {
      state.Broadcast.sayAt(obj.room, `The ${obj.name} vibrates with unnatural, jerky movements.`);
    }
  },

  onEnd(state, caster, effect) {
    const { animatedEntity, originalItem } = effect.state;
    
    if (animatedEntity) {
      state.Broadcast.sayAt(animatedEntity.room, `The magic binding the ${originalItem.name} unravels. It clatters to the floor, inanimate once more.`);
      state.MobManager.removeMob(animatedEntity);
    }

    if (originalItem) {
      originalItem.removeBehavior('hidden');
      originalItem.setMeta('isAnimated', false);
    }
  }
};
Use code with caution.
