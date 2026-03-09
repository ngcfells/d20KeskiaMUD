// path: bundles/d20-combat/lib/equipment/SlotManager.js
'use strict';

const Anatomy = require('../anatomy/AnatomyRegistry');
const DimensionalInventory = require('../d20/dimensional-inventory');
const Movement = require('../d20/movement');

class SlotManager {

  /**
   * Creates the initial equipment map based on the race's anatomy list.
   * @param {Character} character
   */
  static createEquipmentMap(character) {
    const anatomyList = character.race?.anatomy;

    if (!Array.isArray(anatomyList)) {
      throw new Error(`Race ${character.race?.id} does not define an anatomy list.`);
    }

    const equipmentMap = new Map();

    anatomyList.forEach(slotType => {
      const [name, count] = slotType.split('.');

      // Unlimited slots
      if (Anatomy.unlimited.includes(name)) {
        equipmentMap.set(name, []);
        return;
      }

      // Multi-slot (race determines count)
      if (count) {
        equipmentMap.set(name, new Array(parseInt(count, 10)).fill(null));
        return;
      }

      // Single-slot
      equipmentMap.set(name, null);
    });

    return equipmentMap;
  }

  /**
   * Equip an item into a specific slot.
   */
  static equipItem(character, item, slotName, index = 0) {
    const slots = character.equipment;

    if (!slots.has(slotName)) {
      throw new Error(`Invalid slot: ${slotName}`);
    }

    const slotValue = slots.get(slotName);

    if (Array.isArray(slotValue)) {
      // Unlimited slots (ioun, slotless)
      if (slotName === 'ioun' || slotName === 'slotless') {
        slotValue.push(item);
        if (slotName === 'ioun') {
          character.say(`The ${item.name} begins to orbit your head.`);
        }
      } else {
        // Multi-slot (finger.2, wrists.4, etc.)
        slotValue[index] = item;
      }
    } else {
      // Single-slot
      slots.set(slotName, item);
    }

    // Update physics
    DimensionalInventory.getCarriedWeight(character);
    Movement.getEffectiveSpeed(character);

    // Container feedback
    if (item.inventory && item.inventory.size > 0) {
      character.say(`You shoulder the ${item.name}. Its contents feel heavy.`);
    }
  }

  /**
   * Unequip an item from a slot.
   */
  static unequipItem(character, slotName, identifier = 0) {
    const slots = character.equipment;

    if (!slots.has(slotName)) return;

    const slotValue = slots.get(slotName);
    let item = null;

    if (Array.isArray(slotValue)) {
      if (slotName === 'ioun' || slotName === 'slotless') {
        item = identifier;
        slots.set(slotName, slotValue.filter(i => i !== item));
        if (slotName === 'ioun') {
          character.say(`You snatch the ${item.name} from its orbit.`);
        }
      } else {
        item = slotValue[identifier];
        slotValue[identifier] = null;
      }
    } else {
      item = slotValue;
      slots.set(slotName, null);
    }

    if (item) {
      if (!DimensionalInventory.isFull(character)) {
        character.addItem(item);
        character.say(`You secure the ${item.name} in your stasis stash.`);
      } else {
        character.room.addItem(item);
        character.say(`Your stash is full! The ${item.name} falls to the ground.`);
      }

      Movement.getEffectiveSpeed(character);
    }
  }
}

module.exports = SlotManager;
