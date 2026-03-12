'use strict';

const attributes = require('../lib/attributes');

module.exports = src => {
  const { AttributeFactory, Character } = src;

  // Register attributes
  attributes.forEach(attr => AttributeFactory.add(attr.name, attr));

  /**
   * Hook: recompute derived attributes when needed.
   * You can later refine when this runs (on level up, rest, etc.).
   */
  Character.prototype.recalculateDerived = function () {
    const char = this;

    // --- HEALTH ---
    {
      const base = char.getBaseAttribute('health') || 0;
      const con = char.getAttribute('constitution') || 10;
      const conMod = Math.floor((con - 10) / 2);
      const hitDie = char.getMeta('hitDie') || 8;
      const level = char.getMeta('level') || 1;
      const value =
        base +
        hitDie +
        conMod +
        ((level - 1) * (hitDie / 2 + 1 + conMod));
      char.setAttributeBase('health', value);
    }

    // --- SAVES ---
    {
      const con = char.getAttribute('constitution') || 10;
      const dex = char.getAttribute('dexterity') || 10;
      const wis = char.getAttribute('wisdom') || 10;
      const conMod = Math.floor((con - 10) / 2);
      const dexMod = Math.floor((dex - 10) / 2);
      const wisMod = Math.floor((wis - 10) / 2);

      char.setAttributeBase(
        'fortitude',
        (char.getBaseAttribute('fortitude') || 0) + conMod
      );
      char.setAttributeBase(
        'reflex',
        (char.getBaseAttribute('reflex') || 0) + dexMod
      );
      char.setAttributeBase(
        'will',
        (char.getBaseAttribute('will') || 0) + wisMod
      );
    }

    // --- SPEED ---
    {
      const sizes = {
        fine: 5,
        dim: 10,
        tiny: 15,
        small: 20,
        med: 30,
        lg: 40,
        hu: 50,
        gar: 60,
        col: 80,
      };
      const sizeKey = char.getMeta('size') || 'med';
      const base = char.getBaseAttribute('speed') || 0;
      const value = base || sizes[sizeKey] || 30;
      char.setAttributeBase('speed', value);
    }

    // --- CYBER TOLERANCE ---
    {
      const isUndead = char.getMeta('type') === 'undead';
      const primaryStat = isUndead ? 'charisma' : 'constitution';
      const statScore = char.getAttribute(primaryStat) || 10;
      const statMod = Math.floor((statScore - 10) / 2);
      const value = Math.max(0, 1 + statMod);
      char.setAttributeBase('cyberTolerance', value);
    }

    // --- COHESION ---
    {
      const chaScore = char.getAttribute('charisma') || 10;
      const wisScore = char.getAttribute('wisdom') || 10;
      const chaMod = Math.floor((chaScore - 10) / 2);
      const wisMod = Math.floor((wisScore - 10) / 2);
      const baseCohesion = 10 + Math.floor((chaMod + wisMod) / 2);

      const cyberStrain = char.getMeta('cyberStrain') || 0;
      const corruption = char.getAttribute('corruption') || 0;

      const value = Math.max(
        0,
        baseCohesion - cyberStrain - Math.floor(corruption / 2)
      );
      char.setAttributeBase('cohesion', value);
    }

    // --- RESOLVE ---
    {
      const level = char.getMeta('level') || 1;
      const mainStat = char.getMeta('primaryAttribute') || 'wisdom';
      const statScore = char.getAttribute(mainStat) || 10;
      const statMod = Math.floor((statScore - 10) / 2);
      const value = Math.floor(level / 2) + statMod;
      char.setAttributeBase('resolve', value);
    }

    // --- MASSIVE DAMAGE THRESHOLD ---
    {
      const con = char.getAttribute('constitution') || 10;
      char.setAttributeBase('massiveDamageThreshold', con);
    }

    // --- CARRY CAPACITY ---
    {
      const str = char.getAttribute('strength') || 10;
      const sizeMult = {
        fine: 0.125,
        dim: 0.25,
        tiny: 0.5,
        small: 0.75,
        med: 1,
        lg: 2,
        hu: 4,
        gar: 8,
        col: 16,
      };
      const size = char.getMeta('size') || 'med';
      const value = str * 10 * (sizeMult[size] || 1);
      char.setAttributeBase('carryCapacity', value);
    }

    // --- WEALTH ---
    {
      const base = char.getBaseAttribute('wealth') || 8;
      const rep = char.getAttribute('reputation') || 0;
      const repBonus = Math.floor(rep / 5);
      const debt = char.getMeta('debt') || 0;
      const value = base + repBonus - debt;
      char.setAttributeBase('wealth', value);
    }

    // --- LIQUIDITY ---
    {
      const cash = char.getMeta('cashValue') || 0;
      char.setAttributeBase('liquidity', cash);
    }
  };
};
