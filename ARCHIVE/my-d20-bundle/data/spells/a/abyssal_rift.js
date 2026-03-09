/**
 * Implementation: Abyssal Rift (Planar Fissure)
 * Source: WotC | Spell Compendium p.7
 */
'use strict';

const { Broadcast } = require('ranvier');
const DamageTypes = require('../../../lib/combat/damage-types');
const D20Utils = require('../../../lib/d20/d20Utils');

/**
 * Implementation: Abyssal Rift
 * Source: WotC | Spell Compendium p.7
 */
module.exports = {
  id: 'abyssal_rift',
  name: 'Abyssal Rift',
  level: 9,
  school: 'conjuration',
  subschool: 'calling',
  descriptors: ['evil', 'chaotic'],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'medium',
  target: 'area', // 75-ft. line (MUD: 3 rooms deep)
  duration: 'instantaneous',
  savingThrow: 'reflex partial',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const castingAbility = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(castingAbility) || 10);
    const dc = 10 + this.level + abilityMod;
    
    // 1. DIRECTIONAL LINE LOGIC (MUD Traverse)
    const direction = ctx.args || 'here';
    const affectedRooms = [caster.room];
    
    if (direction !== 'here') {
      let currentDepth = caster.room;
      for (let i = 0; i < 2; i++) { // Traverse up to 2 rooms away (Total 3)
        const exit = currentDepth.getExits().find(e => e.direction === direction);
        if (exit) {
          const nextRoom = state.RoomManager.getRoom(exit.roomId);
          if (nextRoom) {
            affectedRooms.push(nextRoom);
            currentDepth = nextRoom;
          }
        }
      }
    }

    Broadcast.sayAt(caster, `<bold><red>You strike the ground, tearing a jagged fissure toward the ${direction}!</red></bold>`);

    // 2. ROOM-BY-ROOM RESOLUTION
    affectedRooms.forEach(room => {
      Broadcast.sayAtExcept(room, `<bold><magenta>The ground groans and splits open, revealing a terrifying rift of fire and shadow!</magenta></bold>`, [caster]);

      // Iterate through characters in the room (excluding the caster)
      // Copy array to prevent issues if characters move/teleport during iteration
      const targets = [...room.characters];
      
      for (const unit of targets) {
        if (unit === caster) continue;

        // A. Spell Resistance Check (SR)
        const sr = unit.getAttribute('spellResistance') || 0;
        if (sr > 0) {
          const cl = caster.getAttribute('intelligence'); // Placeholder for CL roll
          const srRoll = Math.floor(Math.random() * 20) + 1 + cl;
          if (srRoll < sr) {
            Broadcast.sayAt(unit, "<cyan>Your magical defenses flicker but hold against the rift's pull.</cyan>");
            continue;
          }
        }

        // B. Initial Fire Damage (2d6)
        const fireDmg = state.Dice.roll('2d6');
        unit.receiveDamage({
          metadata: {
            amount: fireDmg,
            type: DamageTypes.FIRE,
            source: this.name,
            attacker: caster
          }
        }, caster);
        Broadcast.sayAt(unit, `<red>Gouts of Abyssal flame sear you for ${fireDmg} damage!</red>`);

        // C. First Reflex Save: Falling into the Rift
        const firstSave = state.SpellResolver.resolveSave(unit, 'ref', dc);
        if (!firstSave.success) {
          const fallDmg = state.Dice.roll('5d6');
          unit.receiveDamage({
            metadata: {
              amount: fallDmg,
              type: DamageTypes.KINETIC,
              damageSubType: DamageTypes.SUBTYPES.BLUDGEONING,
              source: "Abyssal Rift Fall",
              attacker: caster
            }
          }, caster);
          
          Broadcast.sayAt(unit, "<bold><red>The ground vanishes! You fall fifty feet into the jagged depths!</red></bold>");
          Broadcast.sayAtExcept(unit.room, `<red>${unit.name} screams as they fall into the Abyssal fissure!</red>`, [unit, caster]);
          
          // Apply Prone status
          const proneEffect = state.EffectFactory.create('prone', { duration: 12000 });
          unit.addEffect(proneEffect);

          // D. Second Reflex Save: Plane Shifted to the Abyss
          const secondSave = state.SpellResolver.resolveSave(unit, 'ref', dc);
          if (!secondSave.success) {
            Broadcast.sayAt(unit, "<bold><magenta>A vortex of chaotic energy swallows you whole!</magenta></bold>");
            Broadcast.sayAtExcept(unit.room, `<magenta>A planar vortex erupts at the bottom of the rift, consuming ${unit.name}!</magenta>`, [unit, caster]);
            
            // Teleport to the "Abyss" zone
            const abyssRoom = state.RoomManager.getRoom('abyss:start'); // Target room ID
            if (abyssRoom) {
              unit.moveTo(abyssRoom);
              unit.say("<red>You have been pulled into the infinite, screaming layers of the Abyss!</red>");
              Broadcast.sayAtExcept(abyssRoom, `<magenta>A jagged rift opens in the sky, dropping ${unit.name} onto the scorched earth.</magenta>`, [unit]);
            }
          }
        }
      }
    });
  }
};
