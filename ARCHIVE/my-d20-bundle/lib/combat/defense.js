// path: bundles/my-d20-bundle/lib/combat/defense.js
'use strict';

const D20Utils = require('../d20/d20Utils');

/**
 * Combat Defense Resolver (Enhanced for Antimagic)
 * -----------------------------------------------
 * Handles AC calculation including Item Armor, Natural Armor, 
 * and Dexterity caps. Now supports magical suppression.
 */
module.exports = {
  /**
   * Calculates total Armor Class (AC).
   * @param {Character} character
   * @param {Object} options - { isTouch: boolean }
   */
  getAC(character, options = {}) {
    let baseAc = 10;
    let armorBonus = 0;
    let shieldBonus = 0;
    
    // Check for magical suppression (Antimagic Field or Ray)
    const isSuppressed = character.getMeta('isAntimagicSuppressed') || false;
    
    // Touch AC ignores Armor and Shield bonuses
    const ignorePhysical = options.isTouch || false;

    if (!ignorePhysical) {
      for (const [slot, item] of character.equipment) {
        // Base non-magical armor/shield
        let itemArmor = item.getMeta('armorBonus') || 0;
        let itemShield = item.getMeta('shieldBonus') || 0;

        // If suppressed, remove enhancement bonuses (e.g., +5 chainmail becomes base chainmail)
        if (isSuppressed) {
          const enhancement = item.getMeta('enhancementBonus') || 0;
          if (slot === 'armor') itemArmor = Math.max(0, itemArmor - enhancement);
          if (slot === 'shield') itemShield = Math.max(0, itemShield - enhancement);
        }

        armorBonus += itemArmor;
        shieldBonus += itemShield;
      }
    }

    // Natural Armor Calculation
    let naturalArmor = character.getAttribute('naturalArmor') || 0;
    // Suppress magical natural armor (like Amulet of Natural Armor)
    if (isSuppressed) {
      const magicNatArmor = character.getMeta('magicalNaturalArmorBonus') || 0;
      naturalArmor = Math.max(0, naturalArmor - magicNatArmor);
    }

    const dexMod = D20Utils.getModifier(character.getAttribute('dexterity') || 10);
    
    let maxDex = 99; 
    const training = D20Utils.getArmorTraining(character);

    for (const [slot, item] of character.equipment) {
      let itemMDB = item.getMeta('maxDexBonus');
      if (itemMDB !== undefined) {
        itemMDB += training.bonus; 
        if (itemMDB < maxDex) {
          maxDex = itemMDB;
        }
      }
    }

    const effectiveDex = Math.min(dexMod, maxDex);
    
    // Deflection and Other Magic Bonuses (Suppressed if in Antimagic)
    let deflectionBonus = character.getMeta('deflectionBonus') || 0;
    let dodgeBonus = character.getMeta('dodgeBonus') || 0; // Dodge is usually extraordinary, not suppressed
    
    if (isSuppressed) {
      deflectionBonus = 0; // Ring of Protection fails
    }

    return baseAc + armorBonus + shieldBonus + naturalArmor + effectiveDex + deflectionBonus + dodgeBonus;
  },

  /**
   * Calculates Armor Check Penalty (ACP).
   * Note: ACP is a physical property and is NOT removed by Antimagic.
   */
  getACP(character) {
    let totalPenalty = 0;
    const training = D20Utils.getArmorTraining(character);

    for (const [slot, item] of character.equipment) {
      totalPenalty += (item.getMeta('armorCheckPenalty') || 0);
    }

    return Math.min(0, totalPenalty + training.bonus);
  }
};
