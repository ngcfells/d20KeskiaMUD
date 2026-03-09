'use strict';

/**
 * Taint Mutations for Tsukai-Tsumi
 * Path: data/rules/taint_mutations.js
 * Sources: Oriental Adventures, BoVD, L5R d20
 */
module.exports = {
  // Minor Mutations (Taint Rank 1-2)
  minor: [
    { id: 'albinism', name: 'Albinism', effect: 'Skin and hair turn deathly white. -2 penalty to Social rolls if visible.' },
    { id: 'extra_digit', name: 'Extra Digit', effect: 'An extra finger or toe grows. Regenerates in 48h if removed.' },
    { id: 'foul_odor', name: 'Foul Odor', effect: 'Unbearable stench of decay. -2 penalty to Charisma-based checks.' },
    { id: 'vile_teeth', name: 'Vile Teeth', effect: 'Teeth become jagged, yellow, or animal-like. Grants a 1d4 bite attack.' },
    { id: 'greasy_skin', name: 'Greasy Skin', effect: 'Skin is permanently oily/slick. +2 bonus to escape grapples, -2 to climb.' }
  ],

  // Major Mutations (Taint Rank 3-4)
  major: [
    { id: 'chitinous_armor', name: 'Chitinous Armor', effect: 'Hard insect-like shell. Grants +2 Natural Armor but -1 Dexterity.' },
    { id: 'demonic_eyes', name: 'Demonic Eyes', effect: 'Eyes glow blue/red in shadow. Grants Darkvision 60ft or +30ft if existing.' },
    { id: 'extra_eye', name: 'Extra Eye', effect: 'An eye sprouts elsewhere. +2 bonus on Perception and Initiative rolls.' },
    { id: 'tough_hide', name: 'Tough Hide', effect: 'Leathery, unnatural skin. Grants Damage Reduction 2/Jade.' },
    { id: 'jigoku_blood', name: 'Jigoku Blood', effect: 'Blood becomes black ichor. It is acidic; deals 1d4 damage to attackers (5ft).' }
  ],

  // Deadly/Abyssal Mutations (Taint Rank 5+)
  deadly: [
    { id: 'tentacles', name: 'Tentacles', effect: 'Sprouts 1-2 tentacles. Grants a secondary slam attack (1d6) and +4 to Grapple.' },
    { id: 'wings_leathery', name: 'Leathery Wings', effect: 'Bat-like wings sprout. Grants a Fly speed equal to base Land speed.' },
    { id: 'undead_visage', name: 'Undead Visage', effect: 'Face appears skeletal/rotting. Constant "Fear 1" aura (10ft) against non-tainted.' },
    { id: 'beast_of_fu_leng', name: 'Beast of Fu Leng', effect: 'Humanoid form distorts into a monstrous quadruped. +4 Strength, -4 Charisma.' },
    { id: 'amorphous_form', name: 'Amorphous Form', effect: 'Internal organs shift. 25% chance to ignore Critical Hits and Sneak Attacks.' }
  ]
};
