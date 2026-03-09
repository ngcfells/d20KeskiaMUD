/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Quiet Dead
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 2, p.61
 * 
 * Logic:
 * - Temporary (Area): 10-ft radius/level. Prevents any animation within the field.
 * - Permanent (Target): 1 corpse per 6 levels. Prevents the corpse from ever rising.
 * - Constraint: No effect on creatures already undead.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'quiet_dead',
  name: 'Quiet Dead',
  level: 3,
  school: 'necromancy', // Note: Cleric 'Necromantic' spells often map here
  subschool: null,
  descriptors: ['holy', 'warding'],
  source: '& Magazine Issue 2, p.61',

  /**
   * SPELL LISTS:
   * - Cleric: 3
   * - Paladin: 3
   * - Repose Domain: 3
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '6 segments', // ~1 round
  components: ['V', 'S', 'M', 'DF'],
  
  materialComponents: [
    { 
      id: 'blessed_salt', 
      quantity: 1, 
      consumed: true,
      notes: 'Blessed salt to sanctify the area or corpse.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'area or specific corpses',
  area: '10-ft radius / level (Temporary) OR 1 corpse / 6 levels (Permanent)',
  duration: '1 round / level (Area) OR Permanent (Target)',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Determine Mode: If target is a corpse, use Permanent. If ground/empty, use Area.
    const targetItem = caster.room.items.find(i => i.hasTag('corpse') || i.id.includes('corpse'));

    if (targetItem && !targetItem.hasTag('is_undead')) {
      // PERMANENT MODE: 1 corpse per 6 levels
      const maxCorpses = Math.max(1, Math.floor(cl / 6));
      const corpses = caster.room.items.filter(i => i.hasTag('corpse')).slice(0, maxCorpses);

      corpses.forEach(corpse => {
        corpse.addTag('quiet_dead_sealed');
        corpse.setMeta('isAnimateProof', true);
        B.sayAt(caster, `<cyan>You lay your hands upon ${corpse.name}, sealing its spirit in eternal rest. It shall never rise again.</cyan>`);
      });

      B.sayAtExcept(caster.room, `<cyan>${caster.name} sanctifies the fallen, anchoring their remains with holy wardings.</cyan>`, [caster]);
    } else {
      // TEMPORARY AREA MODE
      const radius = 10 * cl;
      const durationMs = cl * 6000;

      B.sayAt(caster, `<bold><cyan>You strike the ground with your divine focus, calling forth a hallowed field that quiets the restless dead for ${cl} rounds.</cyan></bold>`);
      
      const quietField = state.EffectFactory.create('quiet_dead_aura', {
        duration: durationMs,
        state: { radius }
      });

      caster.room.addEffect(quietField);
    }
  }
};
