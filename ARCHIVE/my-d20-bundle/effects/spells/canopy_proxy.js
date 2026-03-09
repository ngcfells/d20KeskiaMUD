'use strict';

const { Broadcast } = require('ranvier');

/**
 * Effect: Canopy Proxy
 * Source: WotC | Spell Compendium / Web Enhancement
 * Logic: 
 * - Grants 'forest' and 'outdoors' benefits via tags and metadata.
 * - Validation: Must possess the specific linked Acorn item.
 */
module.exports = {
  config: {
    name: 'Acorn Proxy',
    description: 'You are magically connected to a distant oak tree.',
    type: 'spell.transmutation',
    family: 'nature',
    tier: 2,
    unique: true,
    persists: true,
  },

  state: {
    acornUuid: null,
    sourceRoomId: null,
    sourceRoomName: ""
  },

  listeners: {
    effectActivated: function () {
      const target = this.target;
      target.addTag('under_canopy');
      target.setMeta('pseudoTerrain', 'forest');
      
      target.say("<bold><green>The scent of crushed leaves and damp earth fills your senses as the distant oak anchors your soul.</green></bold>");
    },

    effectDeactivated: function () {
      const target = this.target;
      target.removeTag('under_canopy');
      target.removeMeta('pseudoTerrain');
      
      target.say("<yellow>The phantom rustle of leaves fades; you are back in your physical surroundings entirely.</yellow>");
    },

    /**
     * INVENTORY CHECK (Heartbeat):
     * Ensures the specific physical link (the acorn) is still in the caster's possession.
     */
    updateTick: function () {
      const caster = this.target;
      
      // Verify the specific acorn UUID is still in inventory
      const hasAcorn = caster.inventory.items.has(this.state.acornUuid);

      if (!hasAcorn) {
        Broadcast.sayAt(caster, "<bold><red>You have lost your connection to the Great Oak by parting with the linked acorn!</red></bold>");
        this.remove();
      }
    },

    /**
     * SPELL RESOLVER HOOK:
     * Intercepts terrain checks for nature-based spells (e.g. Tree Stride, Transport via Plants).
     */
    onCheckTerrainRequirement: function (state) {
      return (req) => {
        // This character is effectively always in a forest/outdoors for spell logic
        if (req === 'forest' || req === 'outdoors' || req === 'oak_canopy') {
          return true;
        }
      };
    }
  }
};
