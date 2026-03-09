/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/equipment/SlotManager.js
 */
'use strict';

const Anatomy = require('../anatomy/AnatomyRegistry');
const DimensionalInventory = require('../d20/dimensional-inventory');
const Movement = require('../d20/movement');

class SlotManager {
  /**
   * Creates the initial Map based on creature anatomy.
   */
  static createEquipmentMap(creatureType) {
    const anatomy = Anatomy[creatureType] || Anatomy.humanoid;
    const equipmentMap = new Map();
    
    anatomy.forEach(slotType => {
      const [name, count] = slotType.split('.');
      if (name === 'ioun' || name === 'slotless') {
        equipmentMap.set(name, []); // Unlimited array for orbiting/passive items
      } else if (count) {
        // Create an array for multiple limbs/fingers (e.g., finger.2)
        equipmentMap.set(name, new Array(parseInt(count, 10)).fill(null));
      } else {
        equipmentMap.set(name, null); // Single fixed slot
      }
    });
    return equipmentMap;
  }

  /**
   * Equips an item to a character's anatomy and updates physics.
   * @param {Character} character
   * @param {Item} item
   * @param {string} slotName
   * @param {number} index - For multi-count slots (like finger.2)
   */
  static equipItem(character, item, slotName, index = 0) {
    const slots = character.equipment;
    
    if (!slots.has(slotName)) {
      throw new Error(`Invalid slot: ${slotName}`);
    }

    // 1. Assign to Anatomy
    const slotValue = slots.get(slotName);
    
    if (slotName === 'ioun') {
      slotValue.push(item);
      character.say(`The ${item.name} begins to orbit your head, defying gravity.`);
    } else if (slotName === 'slotless') {
      slotValue.push(item);
    } else if (Array.isArray(slotValue)) {
      // Multi-slot anatomy with specific index (finger.2, wrists.4)
      slotValue[index] = item;
    } else {
      slots.set(slotName, item);
    }

    // 2. Physics Update
    // getCarriedWeight in DimensionalInventory is pre-coded to skip 'ioun' slot weight.
    const newWeight = DimensionalInventory.getCarriedWeight(character);
    const speed = Movement.getEffectiveSpeed(character);

    // 3. Feedback for Containers
    if (item.inventory && item.inventory.size > 0) {
      character.say(`You shoulder the ${item.name}. Its contents feel heavy.`);
    }
  }

  /**
   * Removes an item and returns it to the Dimensional Stash (Stasis).
   * @param {Character} character
   * @param {string} slotName
   * @param {number|Item} identifier - index for arrays, or the Item itself for Ioun/Slotless
   */
  static unequipItem(character, slotName, identifier = 0) {
    const slots = character.equipment;
    let item = null;

    if (!slots.has(slotName)) return;

    const slotValue = slots.get(slotName);

    // Handle Array-based slots (Ioun, Slotless, or Multi-limbed)
    if (Array.isArray(slotValue)) {
      if (slotName === 'ioun' || slotName === 'slotless') {
        // Identifier is the item itself
        item = identifier;
        slots.set(slotName, slotValue.filter(i => i !== item));
        if (slotName === 'ioun') character.say(`You snatch the ${item.name} from its orbit.`);
      } else {
        // Identifier is the index
        item = slotValue[identifier];
        slotValue[identifier] = null;
      }
    } else {
      item = slotValue;
      slots.set(slotName, null);
    }

    // 3. Return to Dimensional Stash (Stasis/Weightless)
    if (item) {
      if (!DimensionalInventory.isFull(character)) {
        character.addItem(item);
        character.say(`You secure the ${item.name} in your stasis stash.`);
      } else {
        character.room.addItem(item);
        character.say(`Your stash is full! The ${item.name} falls to the ground.`);
      }
      
      // Recalculate speed after weight loss
      Movement.getEffectiveSpeed(character);
    }
  }
}

module.exports = SlotManager;
