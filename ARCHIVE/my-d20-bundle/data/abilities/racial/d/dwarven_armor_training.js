'use strict';

module.exports = {
  id: 'dwarven_armor_training',
  name: 'Dwarven Armor Training',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'armor', 'combat'],

  description: 'Mountain dwarves are trained from youth in the use and maintenance of heavy armor, granting proficiency and reducing encumbrance penalties.',

  armor: {
    grantHeavyArmorProficiency: true,
    reduceArmorPenalty: 1
  }
};
