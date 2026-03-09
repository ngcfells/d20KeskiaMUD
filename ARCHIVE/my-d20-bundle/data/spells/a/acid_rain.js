/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Rain
 * Source: WotC | Heroes of Battle p.124 / 2E Conversion
 * 
 * Logic:
 * - Area Damage: 7d6 acid damage initially (3.5e standard).
 * - Lingering: Deals 1d6 acid damage/round to those remaining.
 * - Hazard: Turns the ground into a slick, muddy slurry (halves movement).
 * - Item Stress: Non-magical equipment must save or take pitting damage.
 */

const { ACID } = require('../../lib/combat/damage-types');
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'acid_rain',
  name: 'Acid Rain',
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'Heroes of Battle / 2E Conversion',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Druid: 4
   * - Water Domain: 5
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'rain_water_sulfur', 
      quantity: 1, 
      consumed: true, 
      notes: 'A vial of stagnant rain water mixed with powdered sulfur.' 
    }
  ],

  range: 'long', // 400 ft. + 40 ft./level
  target: 'area',
  area: '20-ft. radius, 40-ft. high cylinder',
  duration: '1 round/level',
  savingThrow: 'reflex half (initial)',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    caster.say("<bold><green>You call upon the heavens to weep liquid death, conjuring a localized storm of caustic green rain.</green></bold>");
    caster.room.emitExcept(caster, `<bold><green>${caster.name} gestures skyward as the air curdles into a thick, emerald downpour that hisses against the ground.</green></bold>`);

    // Initial Blast Damage
    const initialDamage = state.Dice.roll('7d6');
    for (const unit of caster.room.characters) {
        if (unit === caster) continue;
        const saved = state.SpellcastingManager._savingThrow(state, unit, 'reflex', ctx.dc);
        const finalDamage = saved ? Math.floor(initialDamage / 2) : initialDamage;

        state.Damage.apply({ amount: finalDamage, type: ACID, attacker: caster, target: unit, source: this.name });
        unit.say("<red>The torrential acid rain drenches you, burning your flesh and smoking against your gear!</red>");
    }

    // Create the Persistent Room Hazard
    state.AreaEffectManager?.create({
      id: 'acid_rain_storm',
      caster,
      room: caster.room,
      duration: cl * 6000,
      
      onEffectStart: (state, room) => {
        room.emit("<yellow>The ground rapidly turns into a treacherous, hissing slurry of mud and acid.</yellow>");
        // Movement penalty: Set a flag or modify speed attribute for the room
      },

      tick: (state, room) => {
        for (const entity of room.characters) {
          if (entity === caster) continue;
          
          // Ongoing minor damage
          const lingeringDamage = state.Dice.roll('1d6');
          state.Damage.apply({ amount: lingeringDamage, type: ACID, attacker: caster, target: entity, source: "Acid Rain" });
          
          // Equipment Stress (2E Logic): 10% chance to pit non-magical armor
          if (Math.random() Your ${armor.name} pits and weakens under the constant acidic downpour!</red>`);
                  armor.applyDamage?.(1, ACID);
              }
          }
        }
      },

      onEffectEnd: (state, room) => {
        room.emit("<cyan>The green clouds dissipate, leaving behind a scarred, smoking landscape.</cyan>");
      }
    });
  }
};
