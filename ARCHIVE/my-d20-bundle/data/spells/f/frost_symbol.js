'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Imbues corporeal undead with an icy sigil.
 * Grants [Cold] subtype (Immunity to Cold, Vulnerability to Fire).
 * Adds 1d6 cold damage to natural attacks and reactive touches.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'frost_symbol',
  name: 'Frost Symbol',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['cold'],
  source: 'Dread Codex | OGL',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'ice_crystal', quantity: 1, consumed: true, notes: 'A crystal of pure ice or blue quartz.' }
  ],

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
  ongoingEffect: false, 

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
      if (undead.hasTag('symbol_spell_active')) {
        return; 
      }

      currentHDCount += undeadHD;

      const effect = state.EffectFactory.create('frost_symbol_active', undead);
      undead.addEffect(effect);

      caster.say(`<cyan>An icy sigil coalesces above the head of ${undead.name}. Its sockets glow with a piercing blue energy.</cyan>`);
    });
  }
};
