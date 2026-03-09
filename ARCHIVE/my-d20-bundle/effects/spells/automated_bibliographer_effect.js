// path: ./bundles/my-d20-bundle/effects/spells/automated_bibliographer_effect.js
'use strict';

module.exports = {
  config: {
    name: "Automated Bibliographer",
    description: "Spectral librarians are cataloging the room's documents.",
    type: "environmental",
    family: "utility",
    tier: 2
  },

  state: {
    casterId: null,
    catalog: []
  },

  listeners: {
    /**
     * The core logic: Scan the room for knowledge-based items.
     */
    performCatalog() {
      const room = this.target;
      const caster = room.findPlayerById(this.state.casterId);
      if (!caster) return;

      const documents = room.items.filter(item =>
        item.hasTag('book') || item.hasTag('scroll') || item.hasTag('document')
      );

      if (documents.length === 0) {
        caster.say("<grey>The bibliographers pause, bowing low; they find no scholarly works here.</grey>");
        return;
      }

      caster.say("<cyan>-- The Bibliographer's Ledger --</cyan>");
      documents.forEach(doc => {
        const title = doc.getMeta('title') || doc.name;
        const author = doc.getMeta('author') || "Unknown";
        const isMagical = doc.hasTag('magic_item') ? "[Arcane]" : "[Mundane]";

        caster.say(`<white>- ${title}</white> <grey>by ${author} ${isMagical}</grey>`);
      });
      caster.say("<cyan>-------------------------------</cyan>");
    },

    /**
     * If a new item is dropped in the room while the spell is active.
     */
    itemDrop(item) {
      if (item.hasTag('book') || item.hasTag('scroll')) {
        this.emit('performCatalog');
      }
    },

    effectDeactivated() {
      this.target.broadcast("<yellow>The spectral librarians fade into ink-scented mist, their task complete.</yellow>");
    }
  }
};
