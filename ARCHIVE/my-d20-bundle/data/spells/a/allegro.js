/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Allegro
 * Source: WotC | Spell Compendium p.9
 * 
 * You create a driving, upbeat rhythm that pulses through your allies. 
 * This grants a significant burst of speed, allowing a party to 
 * maneuver across the battlefield with startling quickness.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'allegro',
  name: 'Allegro',
  level: 3,
  school: 'transmutation',
  subschool: null,
  descriptors: ['sonic'], 
  source: 'WotC | Spell Compendium p.9',

  /**
   * SPELL LISTS:
   * - Bard: 3
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'tail_feather', 
      quantity: 1, 
      consumed: true, 
      notes: 'A tail feather from a bird of prey.' 
    }
  ],

  range: '20 ft.',
  target: 'all allies in room',
  area: '20-ft. radius burst',
  duration: '1 min./level', 
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, targets, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000;

    // Filter allies in the current room
    const allies = caster.room.characters.filter(char => 
      char === caster || (char.isAllyOf && char.isAllyOf(caster))
    );

    caster.say("<bold><cyan>You chant a brisk, uplifting melody and crush the feather, sending a pulse of speed through your allies!</bold></cyan>");
    caster.room.broadcastExcept(caster, `<bold><cyan>${caster.name} begins a rapid, driving chant that makes the very air hum with urgency!</cyan></bold>`);

    allies.forEach(target => {
      // d20 Logic: Bonus is +30ft Enhancement, but cannot exceed base speed
      const baseSpeed = target.getAttribute('speed') || 30;
      const appliedBonus = Math.min(30, baseSpeed);

      const allegroEffect = state.EffectFactory.create('allegro_effect', {
        duration: duration,
        state: { 
          bonus: appliedBonus,
          casterId: caster.id 
        }
      });

      if (target.addEffect(allegroEffect)) {
        target.say("<cyan>Your heartbeat quickens and your feet feel weightless—you are ready to move!</cyan>");
        if (target !== caster) {
          caster.room.broadcastExcept(target, `<cyan>${target.name}'s movements become a rapid blur as the music takes hold.</cyan>`, caster);
        }
      }
    });
  }
};
