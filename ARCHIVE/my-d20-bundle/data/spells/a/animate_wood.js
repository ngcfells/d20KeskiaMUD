/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All spells in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'animate_wood',
  name: 'Animate Wood',
  level: 1,                       // Druid 1
  school: 'transmutation',
  subschool: null,
  descriptors: [],

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
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one small wooden object',
  area: null,
  duration: '1 round/level',      // (D)
  savingThrow: 'none',
  spellResistance: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    /**
     * Logic (Spell Compendium pg. 13):
     * 1. Target a nonmagical, small wooden object (chair, chest, door).
     * 2. The object animates as a Small Animated Object (construct).
     * 3. It obeys the caster's verbal commands as a free action.
     * 4. If the object is held by another creature, the spell fails.
     */
    const woodenObject = state.getEnvironmentObject(target.id);
    
    if (!woodenObject || !woodenObject.hasMaterial('wood') || woodenObject.isMagical) {
      return state.notify(caster, "Target must be a nonmagical wooden object.");
    }

    if (woodenObject.isHeld()) {
      return state.notify(caster, "You cannot animate an object currently held by another.");
    }

    // Spawn the Animated Object (Small)
    const animatedObj = state.spawnEntity('construct_animated_object_small', woodenObject.position, {
      owner: caster.id,
      summons: true,
      hardness: 5 // Wood standard hardness
    });

    // Hide original prop while it is "alive"
    woodenObject.setHidden(true);

    const effect = {
      id: 'animate_wood_active',
      source: 'animate_wood',
      animatedId: animatedObj.id,
      originalId: woodenObject.id
    };

    caster.addEffect(effect);
    
    state.visuals.spawnEffect('wood_creak_animate', woodenObject.position);
  },

  onTick(state, caster, effect) {
    const animatedObj = state.getEntity(effect.animatedId);
    if (!animatedObj || animatedObj.isDead()) {
      caster.removeEffect(effect.id);
    }
  },

  onEnd(state, caster, effect) {
    const animatedObj = state.getEntity(effect.animatedId);
    const originalObj = state.getEnvironmentObject(effect.originalId);

    if (animatedObj) {
      const lastPos = animatedObj.position;
      animatedObj.despawn();
      
      if (originalObj) {
        originalObj.setHidden(false);
        originalObj.placeAt(lastPos);
      }
    }
  }
};
