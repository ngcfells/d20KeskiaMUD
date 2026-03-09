/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Cloud
 * Source: Tome of Alchemy | AD&D 2E (Otiluke's) | 3.5 Conversion
 * 
 * Logic:
 * - Concealment: 20% miss chance for those inside or attacking into it.
 * - Hazard: 1d6 acid damage/round to creatures.
 * - Corrosion: Items in the cloud must save or take durability damage.
 */

const { ACID } = require('../../lib/combat/damage-types');
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'otiluke_s_acid_cloud',
  name: 'Otiluke\'s Acid Cloud',
  level: 2,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'Tome of Alchemy / 2E Conversion',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Druid: 2
   * - Arcane Artificer: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'aqua_regia', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small vial of diluted aqua regia (royal water).' 
    }
  ],

  range: 'medium',
  target: 'area',
  area: '20-ft. radius spread',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    caster.say("<green>You shatter a vial of royal water, and a billowing mass of yellowish-green vapor erupts, filling the area.</green>");
    caster.room.emitExcept(caster, `<green>${caster.name} conjures a thick, acrid cloud of yellow mist that begins to hiss as it touches the floor.</green>`);

    // Create the Room Hazard
    state.AreaEffectManager?.create({
      id: 'acid_cloud_hazard',
      caster,
      room: caster.room,
      duration: cl * 6000,
      
      onEffectStart: (state, room) => {
        room.emit("<yellow>The air becomes thick and caustic; vision is obscured by the swirling yellow fumes.</yellow>");
      },

      tick: (state, room) => {
        // 1. Damage Creatures
        for (const entity of room.characters) {
          const damage = state.Dice.roll('1d6');
          state.Damage.apply({ amount: damage, type: ACID, attacker: caster, target: entity, source: "Acid Cloud" });
          
          // Apply 'Acidic' liquid trace for flavor
          const sting = state.EffectFactory.create('acidic', { duration: 2000, state: { damagePerTick: '0' } });
          entity.addEffect(sting);
          
          entity.say("<red>The acidic mist stings your eyes and eats at your skin!</red>");
        }

        // 2. Damage Objects/Equipment
        for (const item of room.items) {
          if (item.applyDamage) {
            item.applyDamage(1, ACID); // Constant slow pitting
          }
        }

        if (Math.random() > 0.7) {
          room.emit("<green>The yellow fumes swirl lazily, hissing as they pit the very walls.</green>");
        }
      }
    });
  }
};
