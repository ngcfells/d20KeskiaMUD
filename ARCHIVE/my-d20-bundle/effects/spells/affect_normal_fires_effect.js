// path: ./bundles/my-d20-bundle/effects/spells/affect_normal_fires_effect.js
'use strict';

module.exports = {
  config: {
    name: "Manipulated Flames",
    description: "Fires in the area are being magically brightened or dimmed.",
    type: "environmental",
    family: "utility",
    tier: 1
  },

  state: {
    mode: 'bright', // 'bright', 'dim', or 'extinguish'
    casterId: null
  },

  listeners: {
    effectActivated() {
      this.updateRoomLighting();
    },

    /**
     * Custom command listener: Allows caster to toggle mode
     * Usage: "flare" or "dampen" (implemented via caster's input)
     */
    updateMode(newMode) {
      if (newMode === 'extinguish') {
        this.target.room.broadcast("<grey>With a sharp snap of fingers, every nonmagical flame in the room vanishes into smoke.</grey>");
        this.target.room.setMeta('lightLevel', 0);
        this.remove();
        return;
      }
      
      this.state.mode = newMode;
      this.updateRoomLighting();
    },

    updateRoomLighting() {
      const room = this.target; // In an environmental effect, target is the room
      if (this.state.mode === 'bright') {
        room.setMeta('lightLevel', 2); // Daylight equivalent
        room.broadcast("<orange>The fires roar upward, casting brilliant, sun-like light into every corner.</orange>");
      } else {
        room.setMeta('lightLevel', 0.5); // Dim light/Coals
        room.broadcast("<red>The flames sink into low, pulsing coals, casting long shadows across the room.</red>");
      }
    },

    effectDeactivated() {
      const room = this.target;
      room.setMeta('lightLevel', null); // Restore natural lighting
      room.broadcast("<yellow>The flames settle back into their natural rhythm.</yellow>");
    }
  }
};
