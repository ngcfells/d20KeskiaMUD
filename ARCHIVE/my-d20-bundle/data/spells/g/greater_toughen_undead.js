'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Grants +5 Turn Resistance to an undead creature. 
 * Stacks with existing resistance but cannot coexist with other Toughen spells.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'greater_toughen_undead',
  name: 'Greater Toughen Undead',
  level: 7,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'caster_blood_drops', quantity: 5, consumed: true, notes: 'Five drops of your blood.' }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one undead creature',
  area: null,
  duration: '1 hour/level',
  savingThrow: 'none',
  spellResistance: true, // (harmless)

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
    // 1. Validation: Undead Check
    if (target.getMeta('race_type') !== 'undead') {
      return caster.say("<yellow>This spell only functions upon the undead.</yellow>");
    }

    // 2. Family Exclusion Check (Lesser Toughen, Toughen, etc)
    const toughenSpells = ['lesser_toughen_undead_active', 'toughen_undead_active'];
    if (toughenSpells.some(id => target.effects.has(id))) {
      return caster.say("<yellow>A lesser ward of toughening already protects this creature.</yellow>");
    }

    caster.say(`<magenta>You smear five drops of your blood across the brow of ${target.name}. A dark, resilient aura binds to their spirit.</magenta>`);

    const effect = state.EffectFactory.create('greater_toughen_undead_active', target, {
      duration: (1 * 3600000) * caster.level // 1 hour per level
    });

    target.addEffect(effect);
  }
};
