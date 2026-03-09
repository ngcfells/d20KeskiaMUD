'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Animates severed body parts into flying undead minions.
 * HD Limit: 1 HD per caster level.
 * Parts retain non-supernatural special attacks (e.g., Poison, Bite).
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'flying_abominations',
  name: 'Flying Abominations',
  level: 7,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Dread Codex | OGL',

  /**
   * SPELL LISTS:
   * - Cleric: 5
   * - Evil Domain: 5
   * - Sorcerer/Wizard: 7
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  
  materialComponents: [
    { id: 'vial_unholy_water', quantity: 1, consumed: true, notes: 'Sprinkled over the fragments.' }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: '10 ft.',
  target: 'one or more body parts within range',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Validation: Find suitable body parts in the room
    const roomItems = caster.room.items;
    const suitableParts = Array.from(roomItems).filter(item => 
      item.getMeta('isBodyPart') && 
      (Date.now() - item.getMeta('deathTimestamp') < 604800000) // < 1 week old
    );

    if (suitableParts.length === 0) {
      return caster.say("<yellow>There are no fresh body parts here to animate.</yellow>");
    }

    let remainingHD = caster.level;
    caster.say("<red>You sprinkle unholy water over the grisly remains, chanting the words of the abomination.</red>");

    suitableParts.forEach(part => {
      if (remainingHD <= 0) return;

      // Determine HD based on original size (Metadata stored on item)
      const partHD = part.getMeta('abominationHD') || 1;
      if (partHD > remainingHD) return;

      remainingHD -= partHD;

      // Logic: Transform Item into NPC
      const abomination = state.MobFactory.create(caster.area, 'flying_abomination_template');
      abomination.name = `Flying ${part.name}`;
      abomination.setAttributeBase('health', partHD * 8);
      abomination.setMeta('hitDice', partHD);
      abomination.setMeta('owner', caster.id);
      
      // Inherit Fly Speed and Special Attacks (Poison/Bite)
      abomination.addBehavior('flyer');
      if (part.getMeta('hasPoison')) abomination.addBehavior('venomous');

      state.MobManager.addMob(abomination);
      abomination.moveTo(caster.room);
      
      // Cleanup the original item
      state.ItemManager.remove(part);

      caster.say(`<magenta>The ${part.name} twitches, levitates, and begins to circle you with a wet, flapping sound.</magenta>`);
    });
  }
};
