'use strict';

const { Broadcast } = require('ranvier');

/**
 * SKIN / BUTCHER — Resource Extraction
 * Usage:
 *   skin <corpse>
 *   butcher <corpse>
 *
 * Produces:
 *   - hides
 *   - meat
 *   - bones
 *   - sinew
 *   - glands (rare)
 *   - special creature drops
 */

module.exports = {
  aliases: ['skin', 'butcher'],
  usage: 'skin <corpse>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Skin what?");
    }

    const targetName = args.toLowerCase();
    const corpse = player.room.items.find(i =>
      i.type === 'corpse' && i.name.toLowerCase().includes(targetName)
    );

    if (!corpse) {
      return Broadcast.sayAt(player, "You don't see that corpse here.");
    }

    // Determine creature type
    const creatureType = corpse.getMeta('creatureType') || 'animal';

    // Determine DC based on creature toughness
    const difficulty = corpse.getMeta('skinningDifficulty') || 'moderate';
    const specialtyPath = ['wilderness', 'skinning'];

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Skinning ${corpse.name}...`);

    if (!result.success) {
      Broadcast.sayAt(player, "You fail to skin it properly.");
      return;
    }

    // Generate loot table
    const loot = [];

    loot.push(state.ItemFactory.create('mat_hide_generic'));
    loot.push(state.ItemFactory.create('mat_meat_generic'));
    loot.push(state.ItemFactory.create('mat_bone_generic'));

    // Rare drops
    if (Math.random() < 0.15) {
      loot.push(state.ItemFactory.create('mat_gland_generic'));
    }

    loot.forEach(item => player.addItem(item));

    Broadcast.sayAt(player, "You successfully skin and butcher the corpse.");

    // Remove corpse
    corpse.room.removeItem(corpse);
  }
};
