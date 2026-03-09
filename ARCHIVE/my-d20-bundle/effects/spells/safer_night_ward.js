'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Safer Night Ward",
    description: "Vermin are repelled and odors are masked within this area.",
    type: "field",
    family: "protection",
    tier: 1,
    duration: 43200000
  },

  state: { radius: 10, lanternUuid: null, casterUuid: null },

  listeners: {
    /**
     * Mechanical Hook: Blocks entry of creatures A ${entity.name} scurries toward the camp but recoils at the edge of the ward.</yellow>`);
        return false; // Cancel entry
      }
    },

    /**
     * Tactical Bonus: Reduced encounter chance and masked scent
     */
    onGenerateEncounter(encounterCtx) {
      // Logic: Halve the chance of a random encounter
      encounterCtx.chance *= 0.5;
      // Logic: Increase detection distance for the group
      encounterCtx.detectionDistance *= 1.5;
    },

    /**
     * Scent Penalty: Guards cannot use smell to detect foes
     */
    onDetectionCheck(observer) {
      if (observer.hasTag('uses_scent_detection')) {
        B.sayAt(observer, "<yellow>The ward masks all odors, rendering your sense of smell useless for detection.</yellow>");
        return -10; // Significant penalty to detection
      }
    },

    /**
     * Anchor Check: Extinguishing the lantern ends the spell
     */
    updateTick() {
      const room = this.target;
      const state = this.gameState;
      const caster = state.PlayerManager.getPlayerByUuid(this.state.casterUuid);
      
      // In a MUD, we check if the lantern is still lit or present in the room/inventory
      const lantern = state.ItemManager.getItemByUuid(this.state.lanternUuid);
      if (!lantern || !lantern.getMeta('isLit')) {
        B.sayAt(room, "<yellow>The lantern's light flickers out, and the protective ward dissipates.</yellow>");
        this.remove();
      }
    }
  }
};
