'use strict';

/**
 * Effect: Battle Hymn (Rhythmic Resolve)
 * Allows the target to reroll one Will save per round.
 * Reset logic occurs on the effect's heartbeat (6s).
 */
module.exports = {
  config: {
    name: "Battle Hymn",
    description: "A stirring, rhythmic chant bolsters your mental fortitude.",
    type: "buff",
    family: "morale",
    tier: 1,
    maxTier: 1,
  },
  state: {
    hasRerolledThisRound: false
  },
  listeners: {
    effectActivated() {
      this.target.say("<cyan>The steady, pulsing beat of the hymn anchors your mind, making it harder for others to sway you.</cyan>");
    },
    effectDeactivated() {
      this.target.say("<yellow>The rhythmic chant fades, and you feel the mental anchor drift away.</yellow>");
    },
    /**
     * Intercepts the saving throw event.
     * Logic: If a Will save fails and the reroll hasn't been used, trigger a second attempt.
     */
    onSaveRoll(saveData) {
      if (saveData.type !== 'will' || this.state.hasRerolledThisRound) return;
      
      if (saveData.result < saveData.dc) {
        this.state.hasRerolledThisRound = true;
        this.target.say("<bold><white>The hymn's cadence surges in your mind! You find the focus to resist!</white></bold>");
        
        // Execute the reroll
        const newRoll = Math.floor(Math.random() * 20) + 1;
        const total = newRoll + (this.target.getAttribute('will') || 0);
        
        // Update the event data so the engine uses the better result
        if (total > saveData.result) {
          saveData.result = total;
          saveData.rerolled = true;
        }
      }
    },
    /**
     * Resets the reroll availability every combat round (6 seconds).
     */
    onTick() {
      if (this.state.hasRerolledThisRound) {
        this.state.hasRerolledThisRound = false;
        this.target.say("<blue>The hymn's rhythm resets, ready to catch your focus once more.</blue>");
      }
    }
  }
};
