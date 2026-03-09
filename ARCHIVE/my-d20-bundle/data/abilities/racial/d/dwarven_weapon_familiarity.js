'use strict';

module.exports = {
  id: 'dwarven_weapon_familiarity',
  name: 'Dwarven Weapon Familiarity',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'weapons'],

  description: 'Dwarves treat all weapons with the “dwarven” descriptor as martial weapons and gain proficiency with them.',

  weaponRules: {
    treatDwarvenWeaponsAsMartial: true,
    grantProficiency: true
  }
};
