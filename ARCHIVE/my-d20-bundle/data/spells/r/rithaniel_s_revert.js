/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Rithaniel's Revert
 * Source: Dungeons Wiki | Rithaniel | 2009
 * 
 * Forces a creature back to the exact coordinates of its origin. 
 * The target is stripped of all gear and modern enchantments, 
 * returning to their 'birth state' at their place of birth. 
 * Constructs are reduced to raw materials; Undead to corpses.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'rithaniel_s_revert',
  name: "Rithaniel's Revert",
  level: 9, // Wizard 9 / Cleric 8
  school: 'abjuration',
  subschool: null,
  descriptors: ['teleportation'], 
  source: 'Dungeons Wiki | Rithaniel | 2009',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 9
   * - Cleric: 8
   * - Time Domain: 8
   * - Fate Domain: 9
   */

  castingTime: 'standard',
  components: ['S', 'F'], // No Verbal component per source
  
  focusComponents: [
    {
      id: 'vial_clean_water',
      quantity: 1,
      notes: 'A small glass vial containing 15 droplets of perfectly clean water.'
    }
  ],

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one corporeal creature (max 2 HD/level)',
  area: null,
  duration: 'instantaneous', 
  savingThrow: 'will negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const targetHD = target.getMeta('hit_dice') || 1;

    // 1. HD Limit Check
    if (targetHD > cl * 2) {
      return caster.say(`<yellow>${target.name} is too anchored in the present for your magic to unravel.</yellow>`);
    }

    // 2. Save Check
    if (ctx.savePassed) {
      return caster.say(`<yellow>${target.name} resists the pull of the past.</yellow>`);
    }

    // 3. Origin Identification
    const birthRoomId = target.getMeta('birth_room_id') || target.getMeta('spawn_room_id');
    if (!birthRoomId) {
       return caster.say("The creature has no discernable origin in this reality.");
    }

    const birthRoom = state.RoomManager.getRoom(birthRoomId);

    // 4. Transformation Logic
    caster.say(`<cyan>You swirl the vial of water. Reality ripples around ${target.name} like a stone dropped in a pond.</cyan>`);
    target.say("<bold><blue>The world blurs into a kaleidoscope of reversed memories. You are falling backward through your own timeline!</blue></bold>");
    target.room.broadcastExcept(target, `<blue>A vacuum of blue light erupts where ${target.name} stood, leaving nothing but a pile of their belongings.</blue>`, caster);

    // A. Strip Equipment (unless born with it)
    for (const [slot, item] of target.equipment) {
      item.unEquip();
      item.moveTo(target.room); // Gear stays where they were reverted from
    }

    // B. Strip Spells
    target.effects.forEach(effect => {
      if (!effect.getMeta('is_innate')) {
        effect.remove();
      }
    });

    // C. Special State Changes
    if (target.hasTag('construct')) {
      target.addTag('unconstructed_state');
      target.say("<grey>Your consciousness fades into the cold logic of unworked stone and iron.</grey>");
    } else if (target.hasTag('undead')) {
      target.addTag('is_dead_corpse');
    }

    // D. The Reversion (Teleport)
    target.moveTo(birthRoom);
    state.Broadcast.sayAt(birthRoom, `<blue>With a soft pop of displaced air, ${target.name} appears, returning to their point of origin.</blue>`);
  }
};
