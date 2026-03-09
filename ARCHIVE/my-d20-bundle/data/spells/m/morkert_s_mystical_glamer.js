/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Morkert’s Mystical Glamer
 * Author: Lee B. Connor
 * Source: & Magazine Issue 1, p.42
 * 
 * Logic:
 * - Delivery: Caster blows herbs into the faces of targets.
 * - Effect: Statues, pictures, and miniatures appear to come alive and attack.
 * - Damage: The victim takes damage as if the attacks were real.
 * - Duration: 1 Turn (10 minutes in d20).
 */

const { Broadcast: B } = require('ranvier');
const { MIND } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'morkert_s_mystical_glamer',
  name: 'Morkert’s Mystical Glamer',
  level: 1,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: [MIND, 'fear-inducing'],
  source: '& Magazine Issue 1, p.42',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 1
   * - Illusionist: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'hallucinogenic_herbs', 
      quantity: 1, 
      consumed: true,
      notes: 'Pinch of dried herbs to be blown into the targets face.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '30 ft.', // 3" in 2E
  target: '1 creature / level',
  duration: '1 turn', // 10 minutes
  savingThrow: 'will negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<magenta>You blow a handful of fine, bitter herbs toward your foes. The dust swirls into their eyes, weaving a tapestry of terror from the decorations of the room.</magenta>`);
    B.sayAtExcept(caster.room, `<magenta>${caster.name} blows a puff of green dust toward their enemies.</magenta>`, [caster]);

    // This spell targets multiple creatures based on level
    const targets = caster.room.characters.filter(c => c !== caster).slice(0, cl);

    targets.forEach(unit => {
      const savePassed = state.SpellcastingManager._savingThrow(state, unit, 'will', ctx.dc);
      
      if (!savePassed) {
        B.sayAt(unit, "<bold><red>The statues in the room begin to grind their stone joints, stepping off their pedestals! A painting on the wall sneers, an archer within drawing a string toward your throat!</red></bold>");
        
        const glamerEffect = state.EffectFactory.create('morkert_glamer_active', {
          duration: 600000, // 10 minutes
          state: { casterUuid: caster.uuid }
        });
        unit.addEffect(glamerEffect);
      }
    });
  }
};
