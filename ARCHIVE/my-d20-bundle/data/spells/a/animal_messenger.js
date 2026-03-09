/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animal Messenger
 * Source: WotC | Player's Handbook p.198
 * 
 * Logic:
 * - Requirement: Tiny or smaller Animal (e.g., bird, squirrel, mouse).
 * - Target: A specific creature/player and a general location.
 * - Movement: The animal moves at its normal speed toward the destination.
 * - Delivery: Upon arrival, it waits for the recipient and "delivers" the message.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'animal_messenger',
  name: 'Animal Messenger',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  source: 'WotC | Player\'s Handbook p.198',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'morsel_of_food', quantity: 1, consumed: true }],
  range: 'close',
  target: 'one Tiny animal',
  duration: '1 day/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // 1. D20 SIZE & TYPE VALIDATION
    const isAnimal = target.getProperty('creatureType') === 'animal';
    const isTiny = ['tiny', 'diminutive', 'fine'].includes(target.getProperty('size'));

    if (!isAnimal || !isTiny) {
      return Broadcast.sayAt(caster, "<yellow>This spell only functions on Tiny or smaller animals.</yellow>");
    }

    // 2. MESSAGE & DESTINATION INPUT
    // Usage: cast 'animal messenger' <bird> <recipient_name> <message>
    const args = ctx.args ? ctx.args.split(' ') : [];
    const recipientName = args[0];
    const message = args.slice(1).join(' ');

    if (!recipientName || !message) {
      return Broadcast.sayAt(caster, "<cyan>Usage: cast 'animal messenger' <animal> <recipient> <message></cyan>");
    }

    const cl = caster.getSpellCasterLevel();
    
    // 3. APPLY TRAVEL BEHAVIOR
    // We attach an effect that overrides the NPC's AI to move toward the target player.
    const messengerEffect = state.EffectFactory.create('animal_messenger_active', {
      duration: cl * 86400000, // 24 hours per level
      state: { 
        sender: caster.name,
        recipient: recipientName,
        msgBody: message,
        originalRoom: caster.room.id
      }
    });

    /**
     * MUD NAVIGATION LOGIC
     * Every tick, the animal attempts to move one room closer to the recipient.
     */
    messengerEffect.addTrigger('onTick', (state, mob) => {
      const recipient = state.PlayerManager.getPlayer(messengerEffect.state.recipient);
      
      // If we are in the same room as the recipient
      if (recipient && mob.room === recipient.room) {
        Broadcast.sayAt(recipient, `<bold><green>A ${mob.name} arrives, looks at you intently, and chirps a message from ${messengerEffect.state.sender}:</green></bold>`);
        Broadcast.sayAt(recipient, `<italic>"${messengerEffect.state.msgBody}"</italic>`);
        
        // Task complete: Animal returns to its original home or stays put
        messengerEffect.remove();
        return;
      }

      // Basic pathfinding toward the recipient's current area
      if (recipient) {
        const nextStep = state.RoomManager.getPath(mob.room, recipient.room);
        if (nextStep) mob.move(nextStep);
      }
    });

    target.addEffect(messengerEffect);

    // 4. ROOM EMOTES
    Broadcast.sayAt(caster, `<green>You whisper your message to ${target.name} and offer it the morsel of food.</green>`);
    Broadcast.sayAtExcept(caster.room, `<green>${caster.name} whispers to ${target.name}, which nods its head and prepares to depart.</green>`, [caster, target]);
    
    // The animal leaves immediately
    Broadcast.sayAt(caster.room, `<bold><cyan>${target.name} takes flight, heading off in search of ${recipientName}.</cyan></bold>`);
  }
};
