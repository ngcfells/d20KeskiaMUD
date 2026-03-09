'use strict';

const Initiative = require('./initiative');
const CombatStates = require('./combat-states');

/**
 * Combat Round Controller
 * ---------------------------------------------------------
 * Responsibilities:
 *  - Build initiative order
 *  - Handle surprise round
 *  - Manage turn flow
 *  - Manage round flow
 *  - Integrate effects (start/end of turn, start/end of round)
 *  - Manage flat-footed state removal
 *  - Provide hooks for feats, items, class abilities
 */

class CombatRound {
  constructor(combatants) {
    this.combatants = combatants; // Array of Character objects
    this.round = 0;
    this.turnIndex = 0;
    this.order = [];
    this.surpriseRound = false;
  }

  // ─────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────

  /**
   * Build initiative order for all combatants.
   * Handles surprise round detection.
   */
  initialize() {
    const rolls = [];

    for (const c of this.combatants) {
      const init = Initiative.rollInitiative(c);

      rolls.push({
        character: c,
        total: init.total,
        breakdown: init.modifiers
      });

      // Mark flat-footed at combat start
      c.combatStates = new CombatStates(c);
      c.combatStates.add('flat_footed');
    }

    // Sort descending
    rolls.sort((a, b) => b.total - a.total);

    this.order = rolls.map(r => r.character);

    // Surprise round detection
    this.surpriseRound = this.detectSurpriseRound();
  }

  /**
   * Surprise round logic:
   * - If some combatants are unaware, they do not act in round 0.
   * - Aware combatants act in round 0 with a single action.
   */
  detectSurpriseRound() {
    let anyUnaware = false;
    let anyAware = false;

    for (const c of this.combatants) {
      if (c.hasTrait('combat_unaware')) {
        anyUnaware = true;
      } else {
        anyAware = true;
      }
    }

    return anyAware && anyUnaware;
  }

  // ─────────────────────────────────────────────
  // ROUND FLOW
  // ─────────────────────────────────────────────

  /**
   * Start a new round.
   */
  startRound() {
    this.round++;

    // Round start event
    for (const c of this.combatants) {
      c.emit?.('roundStart', { round: this.round });
    }
  }

  /**
   * End the current round.
   */
  endRound() {
    // Round end event
    for (const c of this.combatants) {
      c.emit?.('roundEnd', { round: this.round });
    }
  }

  // ─────────────────────────────────────────────
  // TURN FLOW
  // ─────────────────────────────────────────────

  /**
   * Get the character whose turn it is.
   */
  getCurrent() {
    return this.order[this.turnIndex];
  }

  /**
   * Start a character's turn.
   */
  startTurn(character) {
    // Remove flat-footed at start of first turn
    if (character.combatStates.has('flat_footed')) {
      character.combatStates.remove('flat_footed');
    }

    // Turn start event
    character.emit?.('turnStart', {
      round: this.round,
      character
    });

    // Effects tick
    character.tickEffects?.('turnStart');
  }

  /**
   * End a character's turn.
   */
  endTurn(character) {
    // Turn end event
    character.emit?.('turnEnd', {
      round: this.round,
      character
    });

    // Effects tick
    character.tickEffects?.('turnEnd');
  }

  /**
   * Advance to the next turn.
   */
  nextTurn() {
    const current = this.getCurrent();
    this.endTurn(current);

    this.turnIndex++;

    // End of round
    if (this.turnIndex >= this.order.length) {
      this.endRound();
      this.turnIndex = 0;
      this.startRound();
    }

    const next = this.getCurrent();
    this.startTurn(next);

    return next;
  }

  // ─────────────────────────────────────────────
  // COMBAT LOOP ENTRY POINT
  // ─────────────────────────────────────────────

  /**
   * Begin combat.
   */
  begin() {
    this.initialize();

    // Surprise round (round 0)
    if (this.surpriseRound) {
      this.round = 0;

      for (const c of this.order) {
        if (!c.hasTrait('combat_unaware')) {
          this.startTurn(c);
          this.endTurn(c);
        }
      }
    }

    // Start round 1
    this.round = 1;
    this.startRound();

    // Start first turn
    const first = this.getCurrent();
    this.startTurn(first);

    return first;
  }
}

module.exports = CombatRound;
