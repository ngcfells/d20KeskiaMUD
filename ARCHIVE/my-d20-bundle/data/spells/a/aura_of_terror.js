'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You project an aura of palpable fear. Enemies within 30 feet who 
 * witness your actions must succeed on a Will save or become shaken.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'aura_of_terror',
  name: 'Aura of Terror',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: ['fear', 'mind-affecting'],
  source: 'Standard',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '30-ft.-radius emanation centered on caster',
  duration: '1 min/level',
  savingThrow: 'will',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    caster.say("<red>A shroud of absolute, bone-chilling dread erupts from your soul, visible as a faint, oily distortion in the air.</red>");

    // Check for existing Frightful Presence to apply Spell Compendium p. 18 bonuses
    const hasNaturalPresence = caster.hasBehavior('frightful_presence') || caster.getMeta('frightful_presence');
    
    const effect = state.EffectFactory.create('aura_of_terror_active', caster, {
      duration: (1 * 60000) * caster.level,
      state: {
        radius: hasNaturalPresence ? 40 : 30,
        dcBonus: hasNaturalPresence ? 2 : 0,
        baseDC: ctx.saveDC
      }
    });

    caster.addEffect(effect);
  }
};
