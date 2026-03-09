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
  id: 'animate_snow',
  name: 'Animate Snow',
  level: 6,                       // Druid 6
  school: 'transmutation',
  subschool: null,
  descriptors: ['cold'],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'sculpting_tool',
      quantity: 1,
      consumed: false,
      notes: 'A small carving knife or sculpting tool.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'snow to be animated',
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
     * 1. Target must be a sufficient volume of snow.
     * 2. Animates the snow into a "Snow Creature" (template).
     * 3. Usually takes the form of a creature the caster is familiar with.
     * 4. The Snow Creature has the Cold subtype and deals extra cold damage.
     * 5. It obeys the caster's mental commands.
     */
    const snowVolume = state.getEnvironmentObject(target.id);
    
    if (!snowVolume || !snowVolume.hasTag('snow')) {
      return state.notify(caster, "You need a significant amount of snow to animate.");
    }

    // Determine the base form (typically matches a Summon Nature's Ally VI option)
    const baseFormId = ctx.getChoice('creature_form', ['dire_bear', 'huge_elemental', 'polar_bear']);
    
    const snowCreature = state.spawnEntity(`template_snow_${baseFormId}`, snowVolume.position, {
      owner: caster.id,
      summons: true,
      subtypes: ['cold'],
      onHit: (dmg) => dmg.addType('cold', '1d6') // Snow template bonus
    });

    const effect = {
      id: 'animate_snow_active',
      source: 'animate_snow',
      creatureId: snowCreature.id
    };

    caster.addEffect(effect);
    
    state.visuals.spawnEffect('snow_swirl_coalesce', snowVolume.position);
  },

  onTick(state, caster, effect) {
    const creature = state.getEntity(effect.creatureId);
    if (!creature || creature.isDead()) {
      caster.removeEffect(effect.id);
    }
  },

  onEnd(state, caster, effect) {
    const creature = state.getEntity(effect.creatureId);
    if (creature) {
      state.visuals.spawnEffect('snow_collapse', creature.position);
      creature.despawn();
    }
  }
};
