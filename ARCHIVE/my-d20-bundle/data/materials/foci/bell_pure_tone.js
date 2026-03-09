'use strict';

/**
 * Material Component: Bell of Pure Tone
 * Source: Used specifically for Banishment (Vrock)
 * Logic: Emits a frequency that shatters the discordant essence of screeching demons.
 */
module.exports = {
  id: 'bell_pure_tone',
  name: 'Bell of Pure Tone',
  baseType: 'focus',
  typicalValues: [150], // Gold pieces
  metadata: {
    description: 'A small, handle-less bell cast from a single piece of flawless, transparent glass. When struck, it emits a note so clear it seems to vibrate in the listener\'s very soul.',
    rarity: 'rare',
    weight: 0.5,
    tags: ['focus', 'abjuration_focus', 'anti_vrock', 'sonic'],
    researchLore: 'The chaotic screech of a Vrock is its primary anchor to the Material Plane; a note of perfect, singular clarity can sever that bond instantly.'
  }
};
