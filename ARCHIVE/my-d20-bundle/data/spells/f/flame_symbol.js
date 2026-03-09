'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Imbues corporeal undead with a burning sigil.
 * Grants [Fire] subtype (Immunity to Fire, Vulnerability to Cold).
 * Adds 1d6 fire damage to natural attacks and reactive touches.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'flame_symbol',
  name: 'Flame Symbol',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['fire'],
  source: 'Dread Codex | OGL',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium',
  target: '1 HD of animated corporeal undead/level',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false, // Applied effect is permanent (instantaneous duration)

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const targets = Array.isArray(ctx.targets) ? ctx.targets : [target];
    let currentHDCount = 0;
    const maxHD = caster.level;

    targets.forEach(undead => {
      // Validation: Corporeal Undead only
      if (undead.getMeta('race_type') !== 'undead' || undead.hasBehavior('incorporeal')) return;
      
      const undeadHD = undead.getMeta('hitDice') || 1;
      if (currentHDCount + undeadHD > maxHD) return;

      // Anti-Stacking: Only one "Symbol" spell at a time
      if (undead.effects.has('symbol_spell_active')) {
        return; 
      }

      currentHDCount += undeadHD;

      const effect = state.EffectFactory.create('flame_symbol_active', undead);
      undead.addEffect(effect);

      caster.say(`<red>A burning sigil ignites above the head of ${undead.name}. Its sockets erupt in orange flame.</red>`);
    });
  }
};
