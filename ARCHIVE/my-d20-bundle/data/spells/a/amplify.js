/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Amplify
 * Source: WotC | Spell Compendium p.10
 * 
 * Logic:
 * - Area: 20-ft radius emanation (Current MUD Room).
 * - Listen DC: Decreased by 20.
 * - Stealth: Effectively negates Move Silently/Hide for those in the area.
 * - Eavesdropping: Conversation in the room can be heard from several rooms away.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'amplify',
  name: 'Amplify',
  level: 1,
  school: 'transmutation',
  descriptors: ['sonic'],
  source: 'WotC | Spell Compendium p.10',

  castingTime: 'standard',
  components: ['S'], // Somatic only (a gesture of cupping the ear)
  range: 'long',
  target: 'area',
  duration: '1 min/level',
  savingThrow: 'will negates (object)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    
    // Create an Area Effect for the room
    const areaEffect = state.AreaEffectFactory.create('amplify_field', {
      duration: cl * 60000,
      room: caster.room,
      state: { dcModifier: -20 }
    });

    /**
     * MUD ENGINE HOOKS
     */

    // 1. STEALTH SABOTAGE
    // Anyone trying to Move Silently in this room takes a -20 penalty.
    areaEffect.addTrigger('onCalculateSkill', (checkData) => {
      if (checkData.skill === 'move_silently' || checkData.skill === 'stealth') {
        checkData.penalty += 20;
        Broadcast.sayAt(checkData.character, "<red>Every movement you make echoes like a thunderclap in this amplified space!</red>");
      }
    });

    // 2. EAVESDROPPING (Multi-Room Broadcast)
    // When someone speaks, the text is sent to adjacent rooms automatically.
    areaEffect.addTrigger('onSpeech', (speaker, message) => {
      const adjacentRooms = speaker.room.getExits();
      adjacentRooms.forEach(ex => {
        const targetRoom = state.RoomManager.getRoom(ex.targetRoom);
        Broadcast.sayAt(targetRoom, `<cyan>From the ${ex.direction}, you clearly hear ${speaker.name} say: "${message}"</cyan>`);
      });
    });

    caster.room.addEffect(areaEffect);

    // ROOM EMOTES
    Broadcast.sayAt(caster, "<bold><cyan>You cup your hand to your ear and twist the air. Sounds in the area begin to ring with startling clarity!</cyan></bold>");
    Broadcast.sayAtExcept(caster.room, `<cyan>The ambient noise in the room suddenly grows sharp and loud, as if every surface were a drum.</cyan>`, [caster]);
  },

  onTick(state, room, effect) {
    if (Math.random() > 0.85) {
      Broadcast.sayAt(room, "<white>The scratching of a quill and the rustle of cloth sound like grinding stones here.</white>");
    }
  },

  onEnd(state, room, effect) {
    Broadcast.sayAt(room, "<grey>The unnatural amplification fades. The world returns to its normal, muffled state.</grey>");
  }
};
