'use strict';

const D20Utils = require('../d20/d20Utils');

module.exports = {
  /**
   * Enhanced Maneuver Resolution (CMB vs CMD)
   * @param {string} type 'trip', 'disarm', 'grapple', 'bull_rush'
   */
  resolveOpposed(attacker, target, type) {
    const roll = Math.floor(Math.random() * 20) + 1;
    
    // CMB: BAB + Str Mod + Size Mod
    const bab = attacker.getMeta('baseAttackBonus') || 0;
    const strMod = D20Utils.getModifier(attacker.getAttribute('strength') || 10);
    const sizeMod = this._getSizeMod(attacker);
    
    const atkTotal = roll + bab + strMod + sizeMod;

    // CMD: 10 + BAB + Str Mod + Dex Mod + Size Mod
    const targetBab = target.getMeta('baseAttackBonus') || 0;
    const targetStrMod = D20Utils.getModifier(target.getAttribute('strength') || 10);
    const targetDexMod = D20Utils.getModifier(target.getAttribute('dexterity') || 10);
    const targetSizeMod = this._getSizeMod(target);
    
    const defTotal = 10 + targetBab + targetStrMod + targetDexMod + targetSizeMod;

    const success = atkTotal >= defTotal;

    if (success) {
      attacker.say(`<green>You successfully ${type} ${target.name}!</green>`);
    }

    return {
      success,
      atkTotal,
      defTotal, // This acts as the "DC" the attacker had to beat
      roll
    };
  },

  _getSizeMod(character) {
    const race = character.getMeta('race');
    // Standard d20 Size Modifiers
    if (['halfling', 'gnome'].includes(race)) return -1; // -1 for Small (CMB/CMD uses different scaling than AC)
    return 0; 
  }
};
