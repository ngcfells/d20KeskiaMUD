'use strict';

/**
 * Shugenja Elemental Orders
 * Path: data/rules/shugenja_orders.js
 */
module.exports = {
  order_of_the_all_consuming_flame: {
    clan: 'phoenix',
    element: 'fire',
    specialty_spells: {
      1: 'burning_hands', 3: 'fireball', 5: 'wall_of_fire', 9: 'meteor_swarm'
    }
  },
  order_of_the_gentle_rain: {
    clan: 'crane',
    element: 'water',
    specialty_spells: {
      1: 'cure_light_wounds', 4: 'control_water', 6: 'heal', 8: 'horrid_wilting'
    }
  },
  order_of_the_immovable_mountain: {
    clan: 'crab',
    element: 'earth',
    specialty_spells: {
      2: 'barkskin', 4: 'stoneskin', 7: 'earthquake', 8: 'iron_body'
    }
  },
  order_of_the_wind_s_whisper: {
    clan: 'scorpion',
    element: 'air',
    specialty_spells: {
      1: 'silent_image', 2: 'invisibility', 3: 'displacement', 6: 'wind_walk'
    }
  }
};
