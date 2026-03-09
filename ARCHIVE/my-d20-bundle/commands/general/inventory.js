/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/inventory.js
 * PURPOSE: Integrated view of stasis stash, physical gear, and learned resonances.
 */
'use strict';

const { Broadcast } = require('ranvier');
const ItemUtil = require('../../lib/ItemUtil');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');

module.exports = {
  usage: 'inventory',
  command: (state) => (args, player) => {
    const hasStash = player.inventory && player.inventory.size > 0;
    const carriedWeight = DimensionalInventory.getCarriedWeight(player);
    const strength = player.getAttribute('strength') || 10;
    const maxLoad = strength * 15;

    Broadcast.sayAt(player, `<b><cyan>-- Inventory & Load --</cyan></b>`);
    Broadcast.sayAt(player, `Total Carried Weight: ${carriedWeight.toFixed(1)} / ${maxLoad} lbs.`);

    // 1. Display Dimensional Stash (Ranvier Inventory)
    Broadcast.at(player, `<b>Dimensional Stash</b> <gray>(Temporal Stasis & Weightless)</gray>`);
    if (!hasStash) {
      Broadcast.sayAt(player, " [Empty]");
    } else {
      Broadcast.at(player, ` (${player.inventory.size}/20 slots)`);
      Broadcast.sayAt(player, ':');
      for (const [, item] of player.inventory) {
        Broadcast.sayAt(player, `  - ${ItemUtil.display(item)}`);
        
        // If the item is a container (bag inside the stash), list its contents
        if (item.inventory && item.inventory.size > 0) {
          for (const [, subItem] of item.inventory) {
            Broadcast.sayAt(player, `    └ ${ItemUtil.display(subItem)}`);
          }
        }
      }
    }

    // 2. Display Equipped Containers (Physical Bags/Belts)
    let hasPhysicalBags = false;
    for (const [slot, item] of player.equipment) {
      // Single slot check for containers
      if (item && item.inventory && item.inventory.size > 0) {
        if (!hasPhysicalBags) {
          Broadcast.sayAt(player, `\n<b><yellow>External Containers (Subject to Physics & Decay):</yellow></b>`);
          hasPhysicalBags = true;
        }
        Broadcast.sayAt(player, `  [${slot.toUpperCase()}] ${ItemUtil.display(item)}:`);
        for (const [, subItem] of item.inventory) {
          const weight = subItem.metadata.weight || 0;
          Broadcast.sayAt(player, `    └ ${ItemUtil.display(subItem)} <white>(${weight} lbs)</white>`);
        }
      } 
      // Multi-slot check (e.g. waist.2 or arms.2)
      else if (Array.isArray(item)) {
        item.forEach((subItem, index) => {
          if (subItem && subItem.inventory && subItem.inventory.size > 0) {
            if (!hasPhysicalBags) {
              Broadcast.sayAt(player, `\n<b><yellow>External Containers (Subject to Physics & Decay):</yellow></b>`);
              hasPhysicalBags = true;
            }
            Broadcast.sayAt(player, `  [${slot.toUpperCase()}.${index + 1}] ${ItemUtil.display(subItem)}:`);
            for (const [, nestedItem] of subItem.inventory) {
              const w = nestedItem.metadata.weight || 0;
              Broadcast.sayAt(player, `    └ ${ItemUtil.display(nestedItem)} <white>(${w} lbs)</white>`);
            }
          }
        });
      }
    }

    // 3. Known Resonances Section (Integrated from Identify Command)
    const discovered = player.getMeta('discovery.resonances') || [];
    if (discovered.length > 0) {
      Broadcast.sayAt(player, `\n<b><magenta>Known Harmonies:</magenta></b>`);
      discovered.forEach(name => {
        Broadcast.sayAt(player, `  - <cyan>${name}</cyan> <gray>(Identified)</gray>`);
      });
    }

    // Encumbrance Warning
    if (carriedWeight > (strength * 10)) {
      Broadcast.sayAt(player, `\n<red>Warning: You are heavily encumbered!</red>`);
    }
  }
};
