/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Anarchic Storm
 * Source: WotC | Spell Compendium p.11
 * 
 * Logic:
 * - Area: 20-ft radius, 20-ft high cylinder (Current MUD Room).
 * - Penalties: -4 to Listen, Spot, Search, and Ranged Attacks.
 * - Alignment Damage: 2d6 damage per round to Lawful creatures.
 * - Special: Acts as Anarchic Water vs. susceptible creatures (Undead/Outsiders).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'anarchic_storm',
  name: 'Anarchic Storm',
  level: 3,
  school: 'evocation',
  descriptors: ['chaotic', 'water'],
  source: 'WotC | Spell Compendium p.11',

  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'flask_anarchic_water',
      quantity: 1,
      consumed: true,
      notes: 'A flask of anarchic water worth 25 gp.'
    }
  ],

  range: 'long',
  target: 'area',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    
    // Create the persistent Room Hazard
    state.AreaEffectManager?.create({
      id: 'anarchic_storm_hazard',
      caster,
      room: caster.room,
      duration: cl * 6000, // 6s per level

      onEffectStart: (state, room) => {
        Broadcast.sayAt(room, "<bold><magenta>A chaotic downpour of rain begins to fall, the droplets flickering with shifting, multi-colored light!</magenta></bold>");
      },

      tick: (state, room) => {
        room.characters.forEach(unit => {
          // 1. ENVIRONMENTAL PENALTIES (-4 circumstance)
          const stormDebuff = state.EffectFactory.create('anarchic_storm_debuff', {
            duration: 7000,
            modifiers: {
              spot: (curr) => curr - 4,
              listen: (curr) => curr - 4,
              search: (curr) => curr - 4,
              rangedAttack: (curr) => curr - 4
            }
          });
          unit.addEffect(stormDebuff);

          // 2. ALIGNMENT DAMAGE (Lawful only)
          // In d20, alignment > 0 is usually Lawful.
          if (unit.getAttribute('alignment_law') > 0) {
            const damage = state.Dice.roll('2d6');
            state.Damage.apply({
              amount: damage,
              type: 'chaotic',
              attacker: caster,
              target: unit,
              source: "Anarchic Storm"
            });
            Broadcast.sayAt(unit, "<red>The chaotic rain sears your skin like liquid fire!</red>");
          }

          // 3. ANARCHIC WATER SENSITIVITY
          // Certain undead/outsiders take extra damage from blessed/anarchic water
          if (unit.hasTag('vulnerable_anarchic_water')) {
            const extraDmg = state.Dice.roll('2d4');
            state.Damage.apply({ amount: extraDmg, type: 'holy', attacker: caster, target: unit, source: "Anarchic Water" });
          }
        });

        if (Math.random() > 0.7) {
          Broadcast.sayAt(room, "<magenta>The rain falls in impossible patterns, confusing the senses and drenching everything in chaos.</magenta>");
        }
      }
    });

    Broadcast.sayAt(caster, "<cyan>You call down the discordant rains of the Abyss.</cyan>");
  },

  onEnd(state, room, effect) {
    Broadcast.sayAt(room, "<grey>The multicolored rain ceases, leaving the air strangely quiet.</grey>");
  }
