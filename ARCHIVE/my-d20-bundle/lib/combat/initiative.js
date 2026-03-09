'use strict';

const D20Utils = require('../d20/d20Utils');

module.exports = {
  getRoll(character) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const dexMod = D20Utils.getModifier(character.getAttribute('dexterity') || 10);
    
    // Add bonus if they have Improved Initiative (4) or high-tech combat sensors
    const featBonus = character.hasFeat('improved_initiative') ? 4 : 0;
    const techBonus = character.getAttribute('quickdraw') || 0; 
    
    return d20 + dexMod + featBonus + techBonus;
  }
};
