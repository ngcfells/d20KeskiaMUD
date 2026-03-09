'use strict';

/**
 * Arcane Artificer Infusions (5E to 3.5 Conversion)
 * These are long-term item augmentations, not short-term spells.
 */
module.exports = {
  level_2: [
    'enhanced_defense_plus_1',   // Armor/Shield: +1 Enhancement bonus to AC
    'enhanced_weapon_plus_1',    // Weapon: +1 Enhancement bonus to Attack/Damage
    'repeating_shot',            // Ranged: No reload, generates +1 magic ammo
    'returning_weapon',          // Thrown: Returns to hand immediately after attack
    'bag_of_holding_replicated', // Mundane Bag: Becomes a Bag of Holding
    'goggles_of_night_replicated',// Mundane Goggles: Grants Darkvision 60ft
    'cap_of_water_breathing_replicated'
  ],

  level_6: [
    'boots_of_the_winding_path', // Bonus Action: Teleport to a spot occupied this turn
    'radiant_weapon_plus_1',     // Weapon: +1, sheds light, can Blind on hit (Reaction)
    'repulsion_shield_plus_1',   // Shield: +1, can push attackers back 15ft (Reaction)
    'resistant_armor',           // Armor: Grant Resistance to one energy type (Fire, Cold, etc)
    'cloak_of_elvenkind_replicated',
    'gloves_of_thievery_replicated',
    'pipes_of_haunting_replicated'
  ],

  level_10: [
    'enhanced_defense_plus_2',   // Armor/Shield: +2 Enhancement bonus to AC
    'enhanced_weapon_plus_2',    // Weapon: +2 Enhancement bonus to Attack/Damage
    'helm_of_awareness',         // Helm: Advantage on Initiative, cannot be surprised
    'cloak_of_the_manta_ray_replicated',
    'bracers_of_archery_replicated',
    'winged_boots_replicated'    // Replicated Winged Boots
  ],

  level_14: [
    'arcane_propulsion_armor',   // Armor: +5ft speed, 1d8 force gauntlet attacks (thrown)
  ]
};
