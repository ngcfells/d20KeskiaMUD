/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acidic Spray
 * Source: Pathfinder 1E / 3.5e Advanced | Level 5
 * 
 * Logic:
 * - Area: 60-ft. cone.
 * - Initial: 1d6 per level (Max 15d6) Acid damage.
 * - Lingering: Targets take half the initial damage again on the next round.
 */

const { ACID } = require('../../lib/combat/damage-types');
const { Broadcast: B } = require('ranvier');

module.exports = {
  id: 'acidic_spray',
  name: 'Acidic Spray',
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'Pathfinder 1E / 3.5e Advanced',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Magus: 5
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'digestive_acid_vial', 
      quantity: 1, 
      consumed: true 
    }
  ],

  range: '60 ft.', 
  target: '60-ft. cone',
  area: 'cone',
  duration: 'instantaneous',
  savingThrow: 'reflex half',
  spellResistance: false, // Conjuration (Creation)

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const damageDice = Math.min(cl, 15);
    const damageRoll = state.Dice.roll(`${damageDice}d6`);

    B.sayAt(caster, "<bold><green>You spray a high-pressure fan of churning acid from your outstretched fingers!</green></bold>");
    B.sayAtExcept(caster.room, `<bold><green>${caster.name} unleashes a wide spray of corrosive green fluid that coats everything in its path!</green></bold>`, [caster]);

    const targets = [...caster.room.characters];
    for (const unit of targets) {
      if (unit === caster) continue;

      // In a real cone check, we would verify facing/position, 
      // but for standard MUD area logic, we process the room.
      const savePassed = state.SpellcastingManager._savingThrow(state, unit, 'reflex', ctx.dc);
      let finalDamage = savePassed ? Math.floor(damageRoll / 2) : damageRoll;

      state.Damage.apply({
        amount: finalDamage,
        type: ACID,
        attacker: caster,
        target: unit,
        source: this.name
      });

      // Apply the 'Lingering Spray' effect for the second-round damage
      const lingeringEffect = state.EffectFactory.create('acidic_spray_lingering', {
        duration: 7000, // Roughly one round
        state: { 
          pendingDamage: Math.floor(finalDamage / 2),
          attacker: caster
        }
      });
      unit.addEffect(lingeringEffect);

      unit.say("<red>The thick, viscous acid clings to you, melting into your skin!</red>");
    }
  }
};
