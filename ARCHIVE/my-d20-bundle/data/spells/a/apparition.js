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
  id: 'apparition',
  name: 'Apparition',
  level: 3,                       // Sorcerer/Wizard 3
  school: 'illusion',
  subschool: 'figment',           // Creates a visual change
  descriptors: ['fear', 'mind-affecting'],

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
  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: '1 round/level',      // (D)
  savingThrow: 'will',            // Will negates (harmless)
  spellResistance: true,          // Yes (harmless)

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
     * Logic (Spell Compendium pg. 15):
     * 1. Subject's face becomes skeletal and translucent.
     * 2. Subject gains a +4 morale bonus on Intimidate checks.
     * 3. Any creature that views the subject must make a Will save or 
     *    become Shaken for 1 round/level.
     */
    const effect = {
      id: 'apparition_active',
      source: 'apparition',
      intimidateBonus: 4,
      bonusType: 'morale'
    };

    target.addEffect(effect);

    // Hook: Apply the Intimidate bonus
    target.addModifier({
      stat: 'intimidate',
      value: effect.intimidateBonus,
      type: effect.bonusType,
      sourceId: effect.id
    });

    // Engine Hook: Passive "Fear Gaze" for anyone viewing the target
    state.addHook('onViewEntity', (viewer, viewed) => {
      if (viewed.id === target.id && !viewer.hasStatus('shaken')) {
        const save = viewer.rollSave('will', ctx.saveDC);
        if (!save.success) {
          viewer.addStatus('shaken', { 
            duration: `${caster.getEffectiveCasterLevel()} rounds`,
            descriptors: ['fear']
          });
        }
      }
    });
  },

  onTick(state, caster, effect) {
    // Subject remains terrifying for the duration
  },

  onEnd(state, caster, effect) {
    state.removeHook('onViewEntity');
  }
};
