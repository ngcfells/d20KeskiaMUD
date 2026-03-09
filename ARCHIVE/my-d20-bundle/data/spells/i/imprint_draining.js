'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Imprints a weapon with vampiric draining. The wielder gains 50% of damage
 * dealt to living targets as temporary hit points (lasting 1 hour).
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'imprint_draining',
  name: 'Imprint Draining',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [], // Uses Focus (The Weapon)

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one touched weapon',
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // Validation: Must be a weapon item
    if (target.type !== 'WEAPON') {
      return caster.say("<yellow>You can only imprint draining upon a weapon.</yellow>");
    }

    caster.say(`<magenta>You trace a blood-red sigil along the length of ${target.name}. It begins to pulse with a hungry, dark light.</magenta>`);

    const effect = state.EffectFactory.create('imprint_draining_active', target, {
      duration: (1 * 6000) * caster.level // 1 round per level
    });

    target.addEffect(effect);
  }
};
