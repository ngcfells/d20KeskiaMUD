/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Adrenaline Surge
 * Source: WotC | Masters of the Wild p.82
 * 
 * Logic:
 * - Aura: 25ft + 5ft/2 levels emanation centered on caster.
 * - Target: Only the caster's summoned creatures.
 * - Effect: +4 Enhancement bonus to Strength.
 * - Constraint: Bonus is lost if the creature leaves the radius.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'adrenaline_surge_motw',
  name: 'Adrenaline Surge',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: ['nature', 'summoning'],
  source: 'WotC | Masters of the Wild p.82',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Sorcerer/Wizard: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [], // Uses Divine Focus (DF)

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'self',
  area: 'spherical emanation (radius = range)',
  duration: '1 round/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    // Range Calculation: 25 + 5 per 2 levels
    const radius = 25 + (Math.floor(cl / 2) * 5);
    
    B.sayAt(caster, `<green>You present your divine focus and shout a command of primal vigor, a ripple of red energy surging outward to your servants.</green>`);
    B.sayAtExcept(caster.room, `<green>${caster.name} releases a pulse of feral energy that causes their summoned allies to swell with muscle.</green>`, [caster]);

    const surgeAura = state.EffectFactory.create('adrenaline_surge_aura', {
      duration: cl * 6000,
      state: { radius: radius }
    });

    caster.addEffect(surgeAura);
  }
};
