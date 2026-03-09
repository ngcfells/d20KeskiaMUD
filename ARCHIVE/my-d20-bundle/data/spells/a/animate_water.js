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
  id: 'animate_water',
  name: 'Animate Water',
  level: 1,                       // Druid 1, Ranger 1
  school: 'transmutation',
  subschool: null,
  descriptors: ['water'],

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
  target: 'a volume of water, up to a 20-ft. cube',
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
     * 1. Target a body of nonmagical water.
     * 2. The water animates into a Small Water Elemental.
     * 3. The elemental obeys the caster's commands.
     * 4. When the spell ends, it reverts to normal water.
     */
    const waterSource = state.getEnvironmentObject(target.id);
    
    if (!waterSource || !waterSource.hasTag('water') || waterSource.isMagical) {
      return state.notify(caster, "Target must be a source of nonmagical water.");
    }

    // Spawn the Small Water Elemental
    const elemental = state.spawnEntity('monster_water_elemental_small', waterSource.position, {
      owner: caster.id,
      summons: true
    });

    // Suppress the original water source while the elemental exists
    waterSource.setHidden(true);

    const effect = {
      id: 'animate_water_active',
      source: 'animate_water',
      elementalId: elemental.id,
      originalSourceId: waterSource.id
    };

    caster.addEffect(effect);
    
    state.visuals.spawnEffect('water_surge_coalesce', waterSource.position);
  },

  onTick(state, caster, effect) {
    const elemental = state.getEntity(effect.elementalId);
    if (!elemental || elemental.isDead()) {
      caster.removeEffect(effect.id);
    }
  },

  onEnd(state, caster, effect) {
    const elemental = state.getEntity(effect.elementalId);
    const waterSource = state.getEnvironmentObject(effect.originalSourceId);

    if (elemental) {
      const lastPos = elemental.position;
      elemental.despawn();
      
      if (waterSource) {
        waterSource.setHidden(false);
        waterSource.placeAt(lastPos);
      }
    }
  }
};
