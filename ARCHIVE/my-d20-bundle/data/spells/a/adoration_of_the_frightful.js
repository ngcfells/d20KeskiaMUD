/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Adoration of the Frightful
 * Source: WotC | Spell Compendium p.7
 * 
 * Logic:
 * - Synergy: Targets creatures currently [Feared] by the caster.
 * - Effect: Suppresses fear; replaces it with a 'Charmed' state.
 * - Break Condition: If the caster attacks or the underlying fear ends.
 */

const { Broadcast: B } = require('ranvier');
const { MIND } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'adoration_of_the_frightful',
  name: 'Adoration of the Frightful',
  level: 3,
  school: 'enchantment',
  subschool: 'charm',
  descriptors: [MIND, 'mind-affecting', 'fear-synergy'],
  source: 'WotC | Spell Compendium p.7',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Bard: 3
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '60-ft radius emanation',
  duration: '1 round/level',
  savingThrow: 'will negates',
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
  onCast(state, caster) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const dc = state.SpellcastingManager.calculateSpellDC(caster, this.level);
    
    B.sayAt(caster, "<magenta>You project an aura of terrible beauty, seeking to twist the terror of your foes into obsessive devotion.</magenta>");
    B.sayAtExcept(caster.room, `<magenta>A strange, hypnotic pulse of energy ripples outward from ${caster.name}, smelling faintly of ozone and roses.</magenta>`, [caster]);

    const adorationAura = state.EffectFactory.create('adoration_aura_active', {
      duration: cl * 6000,
      state: { 
        dc: dc,
        charmedUuids: new Set() 
      }
    });

    caster.addEffect(adorationAura);
  }
};
