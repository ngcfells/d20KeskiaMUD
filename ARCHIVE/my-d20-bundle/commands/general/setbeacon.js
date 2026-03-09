'use strict';

const { Broadcast: B } = require('ranvier');

/**
 * Command: setbeacon
 * Author: Andrew Hamilton (Logic from Homing Beacon)
 * Purpose: Sets the "home" anchor point for the Homing Beacon spell.
 */
module.exports = {
  usage: 'setbeacon',
  aliases: ['markhome', 'anchorrune'],
  command: state => (player, args) => {
    const room = player.room;

    // 1. VALIDATION: Check for mobile structures (Ships, Wagons, etc.)
    // In d20 MUD terms, we check for a 'mobile' or 'vehicle' tag on the room.
    if (room.hasTag('vehicle') || room.hasTag('mobile_structure')) {
      return B.sayAt(player, "<red>The arcane energies refuse to take root here; you cannot place a permanent anchor on a moving vessel.</red>");
    }

    // 2. VALIDATION: Check for ground/structure
    // If the room is 'Air' or 'Falling', it cannot be a beacon.
    if (room.getMeta('terrain') === 'air' || room.hasTag('ethereal')) {
      return B.sayAt(player, "<yellow>A homing beacon must be anchored to solid ground or a permanent structure.</yellow>");
    }

    // 3. SET METADATA
    // Store coordinates and names for the Homing Beacon spell to reference.
    const anchorData = {
      id: room.id,
      name: room.title,
      area: room.area.name,
      coordinates: room.coordinates || { x: 0, y: 0, z: 0 }
    };

    player.setMeta('home_rune_location', anchorData);

    // 4. FEEDBACK
    B.sayAt(player, `<bold><cyan>You kneel and trace a glowing blue rune into the ground.</cyan></bold>`);
    B.sayAt(player, `<cyan>The location of '${room.title}' is now etched into your internal compass.</cyan>`);
    
    // Room Emote
    B.sayAtExcept(room, `<cyan>${player.name} kneels and traces a glowing mark upon the ground, which flashes once before fading into the surface.</cyan>`, [player]);
  }
};
