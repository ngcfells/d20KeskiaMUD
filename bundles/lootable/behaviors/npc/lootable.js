'use strict';

const lootResolver = require('../../lib/resolvers/lootResolver');
const TQ = require('../../lib/TraitQuery');

module.exports = srcPath => {
  return {
    listeners: {
      death: state => function (killer) {

        // -----------------------------
        // 1. Determine corpse type based on physiology traits
        // -----------------------------
        let corpseType = 'corpse';

        if (TQ.has(this, 'undead.')) corpseType = 'dust';
        else if (TQ.has(this, 'construct.')) corpseType = 'scrap';
        else if (TQ.has(this, 'ooze.')) corpseType = 'slime';
        else if (TQ.has(this, 'elemental.')) corpseType = 'essence';
        else if (TQ.has(this, 'plant.')) corpseType = 'fibers';
        else if (TQ.has(this, 'dragon.')) corpseType = 'dragon_remains';
        else if (TQ.has(this, 'fiend.')) corpseType = 'ichor';
        else if (TQ.has(this, 'celestial.')) corpseType = 'radiant_remains';

        // -----------------------------
        // 2. Create the corpse item
        // -----------------------------
        const corpse = state.ItemFactory.create(state, `lootable:${corpseType}`);

        // Store the NPC UUID for reference
        corpse.setMeta('sourceNpc', this.uuid);

        // -----------------------------
        // 3. Add intuitive targeting keywords
        // -----------------------------
        const npcName = this.name.toLowerCase();

        corpse.setMeta('corpseName', this.name);

        // Keywords for intuitive targeting
        corpse.keywords.push(npcName);
        corpse.keywords.push(`${npcName}'s`);
        corpse.keywords.push(`${npcName}'s corpse`);
        corpse.keywords.push('corpse');

        // -----------------------------
        // 4. Place corpse in the room
        // -----------------------------
        this.room.addItem(corpse);

        // -----------------------------
        // 5. Determine loot table (trait-aware)
        // -----------------------------
        const lootInfo = lootResolver.getLootTable(this);

        // Store loot table inside corpse for later extraction
        corpse.setMeta('lootTable', lootInfo);

        // -----------------------------
        // 6. Mark corpse as decayable
        // -----------------------------
        corpse.setBehavior('decay', { duration: 600 });

        // -----------------------------
        // 7. Mark corpse as lootable (so commands can target it)
        // -----------------------------
        corpse.setBehavior('lootable', { corpse: true });
      }
    }
  };
};
