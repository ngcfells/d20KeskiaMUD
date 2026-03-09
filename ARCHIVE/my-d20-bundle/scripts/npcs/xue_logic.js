'use strict';

/**
 * AI for Xue, Liang Chou's Ink-Drake Familiar.
 * Specialization: Automated Archive Retrieval.
 */
module.exports = {
  listeners: {
    spawn: state => function () {
      this.say("The ink flows where the Master commands.");
    },

    /**
     * Combat Logic: Provides Liang Chou with tactical scrolls.
     */
    updateTick: state => function () {
      const master = state.MobManager.getMob('liang_chou'); 
      if (!master || !master.isInCombat()) return;

      // Maintain Proximity: Xue is an extension of Liang's aura.
      if (this.room !== master.room) {
        this.moveTo(master.room);
      }

      // SHARED ARCHIVE RETRIEVAL (Logic for Level 30 Familiar)
      // Every 2 ticks, Xue scans for missing tactical advantages.
      const combatTick = this.getMeta('combatTick') || 0;
      this.setMeta('combatTick', combatTick + 1);

      if (combatTick % 2 === 0) {
        const library = master.getMeta('dimensional_library') || [];
        
        // Priority 1: Counter-spelling (Dispel Magic)
        if (!master.hasItem('dispel_magic_scroll') && library.includes('dispel_magic_scroll')) {
          this.emit('manifestItem', master, 'dispel_magic_scroll');
        } 
        // Priority 2: Archival Defense (Ink Shield Focus)
        else if (!master.hasItem('arcanist_inkwell') && library.includes('arcanist_inkwell')) {
          this.emit('manifestItem', master, 'arcanist_inkwell');
        }
      }
    },

    /**
     * Phasing an item from the Dimensional Library into the physical world.
     */
    manifestItem: state => function (master, itemId) {
      this.room.broadcastExcept([this, master], `<cyan>Xue's ink-stained scales shimmer. He reaches into a microscopic rift, pulling a physical object into this reality.</cyan>`);
      
      const newItem = state.ItemFactory.create(state.ItemManager.get(itemId));
      if (newItem) {
        master.addItem(newItem);
        master.say(`<cyan>Xue delivers the ${newItem.name} to your hand.</cyan>`);
      }
    }
  }
};
