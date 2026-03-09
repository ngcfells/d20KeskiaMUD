'use strict';

const ArmorGroups = require('../../data/rules/armor_groups');
const TerrainTypes = require('../../data/rules/terrain_types');
const DimensionalInventory = require('../../d20-core/d20/dimensional-inventory');
const D20Utils = require('../D20Utils');

/**
 * Combat Movement Resolver
 * -----------------------
 * Handles speed calculation, encumbrance, and barrier collision logic.
 */
module.exports = {

  /**
   * Main movement entry point.
   * Checks for magical barriers before allowing the transition.
   */
  async move(character, exit) {
    const nextRoom = exit.targetRoom;

    // Emit preMove event for barrier/effect logic
    const moveRequest = {
      nextRoom,
      allowed: true,
      collapseBarrier: false
    };

    character.emit('preMove', moveRequest);

    if (!moveRequest.allowed) {
      if (moveRequest.collapseBarrier) {
        character.say("<red>Your protective barrier collapses under magical strain!</red>");
      } else {
        character.say("<yellow>An unseen force prevents you from moving that way.</yellow>");
      }
      return false;
    }

    // Standard Ranvier room transition
    character.moveTo(nextRoom, () => {
      character.emit('move');
    });

    return true;
  },

  /**
   * Calculates the current movement speed in feet per round.
   */
  getEffectiveSpeed(character, roomTerrain = 'NONE') {
    let speed = character.getAttribute('speed') || 30;

    const strength = character.getAttribute('strength') || 10;
    const weight = DimensionalInventory.getCarriedWeight(character);
    const training = D20Utils.getArmorTraining(character);

    const terrain = TerrainTypes[roomTerrain] || TerrainTypes.NONE;

    // ─────────────────────────────────────────────
    // 1. Encumbrance
    // ─────────────────────────────────────────────
    const maxLoad = strength * 15;
    const heavyLoad = strength * 10;

    if (weight > maxLoad) {
      return 5; // Barely able to move
    }

    const isHeavilyEncumbered = weight > heavyLoad;
    if (isHeavilyEncumbered) {
      speed = (speed >= 30) ? 20 : 15;
    }

    // ─────────────────────────────────────────────
    // 2. Armor penalties
    // ─────────────────────────────────────────────
    let heaviest = 'light';

    for (const [slot, item] of character.equipment) {
      const group = ArmorGroups.getArmorGroup(item.id);
      if (group === 'heavy') heaviest = 'heavy';
      else if (group === 'medium' && heaviest !== 'heavy') heaviest = 'medium';
    }

    if (heaviest === 'medium' && !training.mediumSpeed) {
      speed = Math.min(speed, speed >= 30 ? 20 : 15);
    }

    if (heaviest === 'heavy' && !training.heavySpeed) {
      speed = Math.min(speed, speed >= 30 ? 20 : 15);
    }

    // ─────────────────────────────────────────────
    // 3. Terrain & physics
    // ─────────────────────────────────────────────
    if (terrain.cost !== 1) {
      const ignoreTerrain = character.getEffectValue('ignoreTerrain');

      const canUseAdvancedMobility =
        ignoreTerrain &&
        !isHeavilyEncumbered &&
        heaviest === 'light';

      const isPurelyDifficult =
        terrain.isDifficult &&
        !terrain.isGravity &&
        !terrain.isWater;

      if (canUseAdvancedMobility && isPurelyDifficult) {
        return speed; // bypass difficult terrain
      }

      speed = Math.floor(speed / terrain.cost);
    }

    return Math.max(speed, 5);
  }
};
